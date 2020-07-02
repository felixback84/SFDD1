const iot = require('@google-cloud/iot');
//const fs = require('fs');
const { db } = require('./admin');
const {PubSub} = require('@google-cloud/pubsub');

async function createTopicsToDevice(deviceId) {
    const mqttTopics = {   
        MQTT_TOPIC_TO_TELEMETRY: `/devices/${deviceId}/events`,
        MQTT_TOPIC_TO_CONFIG: `/devices/${deviceId}/config`,
        MQTT_TOPIC_TO_COMMANDS: `/devices/${deviceId}/commands/#`,
        MQTT_TOPIC_TO_STATE: `/devices/${deviceId}/state`
    }        

    // Creates a client; cache this for further use
    const pubSubClient = new PubSub();

    for (const topic in mqttTopics) {
        await pubSubClient.createTopic(topic);
        console.log(`Topic ${topic} created.`);
    }

    // Creates a client; cache this for further use
    // const pubSubClient = new PubSub();
    // await pubSubClient.createTopic(mqttTopics);
    // console.log(`Topic ${mqttTopics} created.`);
    //createTopic();
} 

exports.createDeviceInIotCore = async (userDeviceId) => {

    let userHandle, nameOfDevice, RSA_CERTICATE_PRIVATE_KEY;
    // ask for some data to userDevices collection
    db
        .doc(`/userDevices/${userDeviceId}`)
        .get()
        .then((doc) => {
            let userDeviceData = doc.data();
            userHandle = userDeviceData.userHandle;
            nameOfDevice = userDeviceData.device.nameOfDevice;
            //RSA_CERTICATE_PRIVATE_KEY = userDeviceData.device.RSA_CERTICATE_PRIVATE_KEY;
        })

        console.log(userHandle,nameOfDevice,RSA_CERTICATE_PRIVATE_KEY);

    switch(nameOfDevice){

        case 'Halo':
            async function haloDeviceInit(){
                // global vars for iot core
                const cloudRegion = 'us-central1';
                //const deviceId = deviceId;
                const deviceId = `Halo - ${userHandle} - ${userDeviceId}`;
                const projectId = 'sfdd-d8a16';
                const registryId = 'Halo';
                const RSA_CERTICATE_PRIVATE_KEY = '';
                //const rsaCertificateFileUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}`;

                // instanciate the client
                const iotClient = new iot.v1.DeviceManagerClient({
                    // optional auth parameters.
                });
                
                // register iot core path
                const regPath = iotClient.registryPath(projectId, cloudRegion, registryId);

                // specific device
                const device = {
                    id: deviceId,
                    credentials: [
                        {
                            publicKey: {
                                format: 'RSA_X509_PEM',
                                // key: fs.readFileSync(rsaCertificateFileUrl).toString(), // path to the file in readFileSync()
                                key: RSA_CERTICATE_PRIVATE_KEY
                            },
                        },
                    ],
                };

                // device creation request
                const request = {
                    parent: regPath,
                    device
                };
                
                try {
                    const responses = await iotClient.createDevice(request);
                    const response = responses[0];
                    console.log('Created device', response);

                    //////////////////////////////////////////////////////////// create topics for Pub/sub
                    createTopicsToDevice(deviceId);
                    ////////////////////////////////////////////////////////////////
                    
                } catch (err) {
                    console.error('Could not create device and everything else', err);
                }
            } 

            case 'Hilda':
                async function hildaDeviceInit(){
                    // global vars for iot core
                    const cloudRegion = 'us-central1';
                    //const deviceId = deviceId;
                    const deviceId = `Hilda - ${userHandle} - ${userDeviceId}`;
                    const projectId = 'sfdd-d8a16';
                    const registryId = 'Hilda';
                    const RSA_CERTICATE_PRIVATE_KEY = '';
                    //const rsaCertificateFileUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}`;
        
                    // instanciate the client
                    const iotClient = new iot.v1.DeviceManagerClient({
                        // optional auth parameters.
                    });
                    
                    // register iot core path
                    const regPath = iotClient.registryPath(projectId, cloudRegion, registryId);
        
                    // specific device
                    const device = {
                        id: deviceId,
                        credentials: [
                            {
                                publicKey: {
                                    format: 'RSA_X509_PEM',
                                    // key: fs.readFileSync(rsaCertificateFileUrl).toString(), // path to the file in readFileSync()
                                    key: RSA_CERTICATE_PRIVATE_KEY
                                },
                            },
                        ],
                    };
                    
                    // device creation request
                    const request = {
                        parent: regPath,
                        device
                    };
                    
                    try {
                        const responses = await iotClient.createDevice(request);
                        const response = responses[0];
                        console.log('Created device', response);
        
                        //////////////////////////////////////////////////////////// create topics for Pub/sub
                        createTopicsToDevice(deviceId);
                        //////////////////////////////////////////////////////////
                        
                    } catch (err) {
                        console.error('Could not create device and everything else', err);
                    }    
                }
        default:
            return null;    
    }
}    
