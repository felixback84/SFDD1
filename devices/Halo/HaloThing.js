// Include needed modules
const fs = require('fs');
const jwt = require('jsonwebtoken');
const mqtt = require('mqtt');

// device id
const haloThingId = 'CarlosTal84-Halo-8n4ohAo247H1W5SsxY9s';
// say hi to my little friend
console.log(`HALO_THING: ${haloThingId} ---> ACTIVATED`);

// ----------------------------------------------------------------------------- JWT CONFIGURATION FUNCTION
// Create a Cloud IoT Core JWT for the given project id, signed with the given
// private key.
const createJwt = (projectId, privateKeyFile, algorithm) => {

    // Create a JWT to authenticate this device. The device will be disconnected
    // after the token expires, and will have to reconnect with a new token. The
    // audience field should always be set to the GCP project id.
    const token = {
        iat: parseInt(Date.now() / 1000),
        exp: parseInt(Date.now() / 1000) + 20 * 60, // 20 minutes
        aud: projectId
    };
    const privateKey = fs.readFileSync(privateKeyFile);
    return jwt.sign(token, privateKey, {algorithm: algorithm});
};

// ----------------------------------------------------------------------------- PUBLISHING FUNCTION

// Function to publish messages asynchronously and periodically (every 5 seconds)
const publishAsync = (
    mqttTopic,
    client
    ) => {
    setTimeout(() => {
        // Function to generate random values to send to the cloud platform
        const payload = {
            deviceId: haloThingId,
            on: true
        }
        // Publish "payload" to the MQTT topic. qos=1 means at least once delivery.
        console.log('Publishing message:', JSON.stringify(payload));
        client.publish(mqttTopic, JSON.stringify(payload), {qos: 1});

        // Recursive function to simulate the periodically sent of values
        publishAsync(mqttTopic, client);
    }, 5000);
};

// --------------------------------------------------------------------------- SUBSCRIBING
// The MQTT topic that this device will publish data to. The MQTT topic name is
// required to be in the format below. The topic name must end in 'state' to
// publish state and 'events' to publish telemetry. Note that this is not the
// same as the device registry's Cloud Pub/Sub topic.

// Topics to all devices
// const MQTT_TOPIC_TO_TELEMETRY = `projects/${projectId}/topics/events~${deviceId}`;
// const MQTT_TOPIC_TO_CONFIG = `projects/${projectId}/topics/config~${deviceId}`;
// const MQTT_TOPIC_TO_COMMANDS = `projects/${projectId}/topics/commands~${deviceId}~on-off`;
// const MQTT_TOPIC_TO_STATE = `projects/${projectId}/topics/state~${deviceId}`;

// Topics to all devices
const MQTT_TOPIC_TO_TELEMETRY = `/devices/${deviceId}/events~${deviceId}`;
const MQTT_TOPIC_TO_CONFIG = `/devices/${deviceId}/config~${deviceId}`;
const MQTT_TOPIC_TO_COMMANDS = `/devices/${deviceId}/commands~${deviceId}~on-off`;
const MQTT_TOPIC_TO_STATE = `/devices/${deviceId}/state~${deviceId}`;

// Arguments of the google cloud platform
const projectId = `sfdd-d8a16`;
const deviceId = haloThingId;
const registryId = `Halo`; 
const region = `us-central1`;
const algorithm = `RS256`;
const privateKeyFile = `./rsa_private.pem`;
const mqttBridgeHostname = `mqtt.googleapis.com`;
const mqttBridgePort = 8883;
//const messageType = `events`;

// The mqttClientId is a unique string that identifies this device. For Google
// Cloud IoT Core, it must be in the format below.
const mqttClientId = `projects/${projectId}/locations/${region}/registries/${registryId}/devices/${deviceId}`;

// With Google Cloud IoT Core, the username field is ignored, however it must be
// non-empty. The password field is used to transmit a JWT to authorize the
// device. The "mqtts" protocol causes the library to connect using SSL, which
// is required for Cloud IoT Core.
const connectionArgs = {
    host: mqttBridgeHostname, 
    port: mqttBridgePort,
    clientId: mqttClientId,
    username: 'unused',
    password: createJwt(projectId, privateKeyFile, algorithm),
    protocol: 'mqtts',
    secureProtocol: 'TLSv1_2_method',
};

// Create a client, and connect to the Google MQTT bridge.
const client = mqtt.connect(connectionArgs);

// Subscribe to the /devices/{device-id}/config topic to receive config updates.
// Config updates are recommended to use QoS 1 (at least once delivery)
client.subscribe(MQTT_TOPIC_TO_CONFIG, {qos: 1});

// Subscribe to the /devices/{device-id}/commands/# topic to receive all
// commands or to the /devices/{device-id}/commands/<subfolder> to just receive
// messages published to a specific commands folder; we recommend you use
// QoS 0 (at most once delivery)
client.subscribe(MQTT_TOPIC_TO_COMMANDS, {qos: 0});

// The topic name must end in 'state' to publish state
client.subscribe(MQTT_TOPIC_TO_STATE, {qos: 0});

// The topic name must end in 'events' to publish state
client.subscribe(MQTT_TOPIC_TO_TELEMETRY, {qos: 0});

// Handle the connection event
client.on('connect', success => {
    console.log('connect');
    if (!success) {
        console.log('Client not connected...');
    } else {
        publishAsync(MQTT_TOPIC_TO_COMMANDS, client);
    }
});

// Handle the closing connection event
client.on('close', () => {
    console.log('close');
});

// Handle the error event
client.on('error', err => {
    console.log('error', err);
});

// Handle the message event 
client.on('message', (topic, message) => {
    let messageStr = 'Message received: ';
    if (topic === MQTT_TOPIC_TO_CONFIG) {
        messageStr = 'Config message received: ';
    } else if (topic.startsWith(MQTT_TOPIC_TO_COMMANDS)) {
        messageStr = 'Command message received: ';
    }
    messageStr += Buffer.from(message, 'base64').toString('ascii');
    console.log(messageStr);
});