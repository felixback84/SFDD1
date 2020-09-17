// Include needed modules
const fs = require('fs');
const jwt = require('jsonwebtoken');
const mqtt = require('mqtt');

// device id
const hildaThingId = 'CarlosTal84-Hilda-mggbCoK1pihIqDJzJf3T';
// say hi to my little friend
console.log(`HILDA_THING: ${hildaThingId} ---> ACTIVATED`);

// ----------------------------------------------------------------------------- JWT CONFIGURATION FUNCTION
const createJwt = (projectId, privateKeyFile, algorithm) => {
    const token = {
        iat: parseInt(Date.now() / 1000),
        exp: parseInt(Date.now() / 1000) + 20 * 60, // 20 minutes
        aud: projectId
    };
    const privateKey = fs.readFileSync(privateKeyFile);
    return jwt.sign(token, privateKey, {algorithm: algorithm});
};

// vars for message income from client UI
let active = {};
let motorSpeed = {};
let colorValue = {colorValue:{}};

// ----------------------------------------------------------------------------- PUBLISHING MESSAGES
// Function to publish messages on any change
const publishAsync = (mqttTopic, client) => {
    // Function to generate random values to send to the cloud platform
    const payload = {
        thingId: hildaThingId,
        createdAt: new Date().toISOString(),
        active: active,
        motorSpeed: motorSpeed,
        colorValue: colorValue
    }
    // Publish "payload" to the MQTT topic. qos=1 means at least once delivery.
    client.publish(mqttTopic, JSON.stringify(payload), {qos: 1});
    console.log('Publishing message:', JSON.stringify(payload));
    // recursive run
    // publishAsync(mqttTopic, client);
}

// --------------------------------------------------------------------------- SUBSCRIBING TO TOPICS
// Arguments of the google cloud platform
const projectId = `sfdd-d8a16`;
const deviceId = hildaThingId;
const registryId = `Hilda`; 
const region = `us-central1`;
const algorithm = `RS256`;
const privateKeyFile = `./rsa_private.pem`;
const mqttBridgeHostname = `mqtt.googleapis.com`;
const mqttBridgePort = 8883;

// Topics to devices
const MQTT_TOPIC_TO_TELEMETRY = `/devices/${deviceId}/events`;
const MQTT_TOPIC_TO_CONFIG = `/devices/${deviceId}/config`;
const MQTT_TOPIC_TO_COMMANDS = `/devices/${deviceId}/commands/#`;
const MQTT_TOPIC_TO_STATE = `/devices/${deviceId}/state`;

// device unique url identifier
const mqttClientId = `projects/${projectId}/locations/${region}/registries/${registryId}/devices/${deviceId}`;

// args to connection
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
// subs to topics
client.subscribe(MQTT_TOPIC_TO_CONFIG, {qos: 1});
client.subscribe(MQTT_TOPIC_TO_COMMANDS, {qos: 0});
client.subscribe(MQTT_TOPIC_TO_STATE, {qos: 0});
client.subscribe(MQTT_TOPIC_TO_TELEMETRY, {qos: 0});

// --------------------------------------------------------------------------- RECEIVING MESSAGES FROM CLIENT
// Handle the message incoming event from iot core to this device 
client.on('message', (topic, message) => {    
    // add and decode the message itself 
    let messageStr = Buffer.from(message, 'base64').toString('ascii');
    // print message in console
    console.log(`Message from client WebApp for ${hildaThingId} thing ====> ${messageStr}`);
    if(messageStr){
        // str to obj
        let messageToObj = JSON.parse(messageStr);
        // extract data from message incoming of client UI
        active = messageToObj.active;
        motorSpeed = messageToObj.motorSpeed;
        colorValue = messageToObj.colorValue;
        // publish messages
        publishAsync(MQTT_TOPIC_TO_TELEMETRY, client);
    }
});

// Handle the connection event with iot core
client.on('connect', success => {
    console.log('connect');
    if (!success) {
        console.log('Client not connected...');
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