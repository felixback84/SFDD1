// nodes
const fs = require('fs');
const jwt = require('jsonwebtoken');  
const mqtt = require('mqtt'); 
const csvParser = require('csv-parser');
const { parse } = require('querystring');

// device id
const heartbeatThingId = 'CarlosTal84-Heartbeat-PT44TQIpPyLJXRBqXZAQ';
// say hi to my little friend
console.log(`HEARTBEAT_THING: ${heartbeatThingId} ---> ACTIVATED`);

// ----------------------------------------------------------------------------- read coords from file part 
// filepath
const filepath = './coordsH1.csv'

// global vars to pass data to publish func
let obj = [];

// stream init
fs
    .createReadStream(filepath)
    .on('error', () => {
        // handle error
    })
    .pipe(csvParser())
    .on('data', (single) => {
        let rows = [single]
        rows.forEach(row => {
            // use row data
            obj.push(row)
        })
    })
    .on('end', ()=>{
        // ----------------------------------------------------------------------------- PUBLISHING PART
        // vars for message income from client UI 
        // overall status
        let active = "true";
        let disabledTelemetry = false;
        let connectionStatus = true;
        let batteryLife = 100;
        // changes
        let colorValue = {r:0,g:0,b:0};
        let matchQuality = {r:0,g:0,b:0};
        let motorSpeed = undefined;
        // timeout
        let timeOut = undefined
        // publish data
        const publishAsync = (MQTT_TOPIC_TO_TELEMETRY, client)=>{
            // for loop 
            for (let x = 0, ln = obj.length; x < ln; x++) {
                // timeout pattern
                timeOut = x * 7000
                // check it
                if(disabledTelemetry === false){
                    // timeout method
                    setTimeout((y)=>{ 
                        // print each obj   
                        console.log(`coords obj: ${obj[y]}`);
                        // vars for coords to fill message
                        let latitude = obj[y].latitude; 
                        let longitude = obj[y].longitude;
                        let nameOfPoint = `${obj[y].nameOfPoint} - thing`;
                        // obj with data
                        let payload = {
                            thingId: heartbeatThingId,
                            nameOfDevice: 'Heartbeat',
                            connectionStatus,
                            batteryLife,
                            createdAt: new Date().toISOString(),
                            active,
                            coords:{
                                lat: parseFloat(latitude),
                                lon: parseFloat(longitude),
                                nameOfPoint 
                            },
                            disabledTelemetry
                        }
                        // run it & check it
                        if(disabledTelemetry === false){
                            // Publish "payload" to the MQTT topic.
                            client.publish(MQTT_TOPIC_TO_TELEMETRY, JSON.stringify(payload), {qos: 1});
                            // print
                            console.log('Publishing message:', JSON.stringify(payload));
                        }
                    }, timeOut, x); // we're passing x
                } else if(disabledTelemetry === true){
                    break
                }
            }    
        }

        // ----------------------------------------------------------------------------- JWT CONFIGURATION FUNCTION
        const createJwt = (projectId, privateKeyFile, algorithm) => {
            // Create a JWT to authenticate this device
            const token = {
                iat: parseInt(Date.now() / 1000),
                exp: parseInt(Date.now() / 1000) + 20 * 60, // 20 minutes
                aud: projectId
            };
            const privateKey = fs.readFileSync(privateKeyFile);
            return jwt.sign(token, privateKey, {algorithm: algorithm});
        };    

        // ------------------------------------------------------------------------------ SUBSCRIBING
        // Arguments of the google cloud platform
        const projectId = `sfdd-d8a16`;
        const deviceId = heartbeatThingId;
        const registryId = `Heartbeat`; 
        const region = `us-central1`;
        const algorithm = `RS256`;
        const privateKeyFile = `./rsa_private.pem`;
        const mqttBridgeHostname = `mqtt.googleapis.com`;
        const mqttBridgePort = 8883;

        // The MQTT topic that this device will publish data to
        const MQTT_TOPIC_TO_TELEMETRY = `/devices/${deviceId}/events`;
        const MQTT_TOPIC_TO_CONFIG = `/devices/${deviceId}/config`;
        const MQTT_TOPIC_TO_COMMANDS = `/devices/${deviceId}/commands/#`;
        const MQTT_TOPIC_TO_STATE = `/devices/${deviceId}/state`;

        // The mqttClientId 
        const mqttClientId = `projects/${projectId}/locations/${region}/registries/${registryId}/devices/${deviceId}`;

        // Args to talk with Google Cloud IoT Core
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
        client.subscribe(MQTT_TOPIC_TO_CONFIG, {qos: 1});
        // Subscribe to the /devices/{device-id}/commands/# topic to receive all commands
        client.subscribe(MQTT_TOPIC_TO_COMMANDS, {qos: 0});
        // The topic name must end in 'state' to publish state
        client.subscribe(MQTT_TOPIC_TO_STATE, {qos: 0});
        // The topic name must end in 'events' to publish state
        client.subscribe(MQTT_TOPIC_TO_TELEMETRY, {qos: 0});

        // Handle the connection event with iot core
        client.on('connect', success => {
            // print
            console.log('Client connect with IoT Core of GCP');
            if (!success) {
                console.log('Client not connected...');
            } 
        });

        // // Handle the closing connection event
        // client.on('close', () => {
        //     // print
        //     console.log('close client connection');
        // });

        // Handle the error event
        client.on('error', (err) => {
            // print
            console.log('error in connection', err);
        });
 
        // Handle the message event 
        client.on('message', (topic, message) => {
            // add and decode the message itself 
            let messageStr = Buffer.from(message, 'base64').toString('ascii');
            // check if exists a message
            if(messageStr){
                // str to obj
                let messageToObj = JSON.parse(messageStr);
                // extract data from message incoming of client UI
                if(messageToObj.active){
                    active = messageToObj.active;
                } else if(messageToObj.disabledTelemetry){
                    disabledTelemetry = messageToObj.disabledTelemetry
                } else if(messageToObj.colorValue && messageToObj.motorSpeed){
                    // just this values because come front the backend & dont need go back 
                    colorValue = messageToObj.colorValue
                    motorSpeed = messageToObj.motorSpeed
                    matchQuality = messageToObj.matchQuality
                }
                // publish messages when the command arrives
                // publishAsync(MQTT_TOPIC_TO_TELEMETRY, client);
            }
            // print message in console
            console.log(`Message from client WebApp for ${heartbeatThingId} thing ==> ${messageStr}`);
        });

        // run it & check it
        // do {
        //     publishAsync(MQTT_TOPIC_TO_TELEMETRY, client);
        // }
        // while (disabledTelemetry === false);

        // run it & check it
        // while(console.log(disabledTelemetry === false)){
        //     if(disabledTelemetry === false){
        //         publishAsync(MQTT_TOPIC_TO_TELEMETRY, client);
        //     }
        // }

        // run it & check it
        // if(disabledTelemetry === false){
        //     publishAsync(MQTT_TOPIC_TO_TELEMETRY, client);
        // } else if(disabledTelemetry === true){
        //     // Handle the closing connection event
        //     client.end();
        // } 

        publishAsync(MQTT_TOPIC_TO_TELEMETRY, client);
    })









