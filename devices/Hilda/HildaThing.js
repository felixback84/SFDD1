// Include needed modules
const fs = require('fs');
const jwt = require('jsonwebtoken');
const mqtt = require('mqtt');

// device id
const hildaThingId = 'CarlosTal84-Hilda-ZnprmseGEnSeewZiPjYF';
// say hi to my little friend
console.log(`HILDA_THING: ${hildaThingId} ---> ACTIVATED`);
 
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

// ----------------------------------------------------------------------------- GET VALUES FROM ISS FUNCTION
// global var for iss req
let altitude, velocity;
// ask to iss
setTimeout(async function iss(){
    const fetch = require('node-fetch');
    const urlApi = `https://api.wheretheiss.at/v1/satellites/25544`;
    const options = {
        method: 'GET'
    };
    //fetch
    const iotResponse = await fetch(urlApi, options);
    const iotJsonData = await iotResponse.json();
    // print response
    //console.log(`Response for iss: ${JSON.stringify(iotJsonData)}`);
    // lat & long from iss
    altitude = iotJsonData.altitude;
    velocity = iotJsonData.velocity;
    // recursive run
    iss();
}, 2000)

// ----------------------------------------------------------------------------- PUBLISHING FUNCTION
// Function to publish messages on any change
const publishAsync = (mqttTopic, client) => {
    setTimeout(()=>{
        // Function to generate random values to send to the cloud platform
        const payload = {
            thingId: hildaThingId,
            createdAt: new Date().toISOString(),
            alt: altitude,
            vel: velocity
        }
        // Publish "payload" to the MQTT topic. qos=1 means at least once delivery.
        client.publish(mqttTopic, JSON.stringify(payload), {qos: 1});
        console.log('Publishing message:', JSON.stringify(payload));
        // recursive run
        publishAsync(mqttTopic, client);
    }, 1000);
}

// --------------------------------------------------------------------------- SUBSCRIBING
// Arguments of the google cloud platform
const projectId = `sfdd-d8a16`;
const deviceId = hildaThingId;
const registryId = `Hilda`; 
const region = `us-central1`;
const algorithm = `RS256`;
const privateKeyFile = `./rsa_private.pem`;
const mqttBridgeHostname = `mqtt.googleapis.com`;
const mqttBridgePort = 8883;

// The MQTT topic that this device will publish data to. The MQTT topic name is
// required to be in the format below. The topic name must end in 'state' to
// publish state and 'events' to publish telemetry. Note that this is not the
// same as the device registry's Cloud Pub/Sub topic.
// Topics to all devices
//const OTHER = 
const MQTT_TOPIC_TO_TELEMETRY = `/devices/${deviceId}/events`;
const MQTT_TOPIC_TO_CONFIG = `/devices/${deviceId}/config`;
const MQTT_TOPIC_TO_COMMANDS = `/devices/${deviceId}/commands`;
const MQTT_TOPIC_TO_STATE = `/devices/${deviceId}/state`;

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
        publishAsync(MQTT_TOPIC_TO_TELEMETRY, client);
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
    } else if (topic.startsWith(MQTT_TOPIC_TO_EVENTS)) {
        messageStr = 'Events message received: ';
    } else if (topic.startsWith(MQTT_TOPIC_TO_STATE)) {
        messageStr = 'State message received: ';
    } else if (topic.startsWith(MQTT_TOPIC_TO_TELEMETRY)) {
        messageStr = 'Telemetry message received: ';
    }
    messageStr += Buffer.from(message, 'base64').toString('ascii');
    console.log(messageStr);
    
});