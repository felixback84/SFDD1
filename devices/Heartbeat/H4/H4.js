// nodes
const fs = require('fs');
const jwt = require('jsonwebtoken'); 
const mqtt = require('mqtt'); 
const csvParser = require('csv-parser');

// device id
const heartbeatThingId = 'Glorita56-Heartbeat-dunSsOb7kCkypz6saf51';
// say hi to my little friend
console.log(`HEARTBEAT_THING: ${heartbeatThingId} ---> ACTIVATED`);

// ----------------------------------------------------------------------------- read coords from file part 
// filepath
const filepath = './coordsH4.csv'

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
    .on('end', () => {
        // ----------------------------------------------------------------------------- PUBLISHING FUNCTION
        // vars for message income from client UI
        let active = false;
        let colorValue = {r:0,g:0,b:0};
        // ----------------------------------------------------------------------------- PUBLISHING FUNCTION
        const publishAsync = (MQTT_TOPIC_TO_TELEMETRY, client) => {
            // for loop
            for (let x = 0, ln = obj.length; x < ln; x++) {
                setTimeout(function(y) { 
                    // print each obj   
                    console.log(obj[y]);
                    // vars to fill message
                    let latitude = obj[y].latitude;
                    let longitude = obj[y].longitude;
                    let point = obj[y].nameOfPoint;
                    // obj with data
                    let payload = {
                        thingId: heartbeatThingId,
                        createdAt: new Date().toISOString(),
                        coords:{
                            lat: latitude,
                            lon: longitude,
                            nameOfPoint: point
                        },
                        colorValue,
                        active
                    }
                    // Publish "payload" to the MQTT topic.
                    client.publish(MQTT_TOPIC_TO_TELEMETRY, JSON.stringify(payload), {qos: 1});
                    // print
                    console.log('Publishing message:', JSON.stringify(payload));
                }, x * 7500, x); // we're passing x
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

        // Handle the connection event
        client.on('connect', success => {
            console.log('connect');
            if (!success) {
                console.log('Client not connected...');
            } else {
                //publishAsync(MQTT_TOPIC_TO_TELEMETRY, client);
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
            // add and decode the message itself 
            let messageStr = Buffer.from(message, 'base64').toString('ascii');
            // print message in console
            console.log(`Message from client WebApp for ${heartbeatThingId} thing ====> ${messageStr}`);
            if(messageStr){
                // str to obj
                let messageToObj = JSON.parse(messageStr);
                // extract data from message incoming of client UI
                active = messageToObj.active;
                colorValue = messageToObj.colorValue;
                // publish messages
                // publishAsync(MQTT_TOPIC_TO_TELEMETRY, client);
            }
            // print
            console.log(messageStr);
        });

        // run it
        publishAsync(MQTT_TOPIC_TO_TELEMETRY, client);
    })




