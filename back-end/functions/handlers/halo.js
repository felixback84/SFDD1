exports.createDeviceInIotCore = (req, res) => {
    // firebase part
    const { db } = require('../utilities/admin');
    // var to firebase consult
    const userDeviceId = req.params.userDeviceId
    // var for hold id of device
    let deviceId = "";
    // var project id
    const projectId = 'sfdd-d8a16';

    // ask for firebase document
    db
        .doc(`/userDevices/${userDeviceId}`)
        .get()
        .then((doc) => {
            let userDeviceData = doc.data();
            let userHandle = userDeviceData.userHandle;
            let nameOfDevice = userDeviceData.device.nameOfDevice;
            // var with vars to pass through function
            //deviceId = 'CarlosTal84-halo-8n4ohAo247H1W5SsxY9s'
            deviceId = `${userHandle}-${nameOfDevice}-${userDeviceId}`
            
            //////////////////////////////////////////////////////////////////// CREATION OF HALO DEVICE
            async function createDeviceToHalo(projectId ,deviceId, hi) {
                // client library
                const iot = require('@google-cloud/iot');
                // instantiate client
                const client = new iot.v1.DeviceManagerClient();
                // vars
                const Location = 'us-central1';
                const nameOfRegistryToDevice = 'Halo';
                //const projectId = await client.getProjectId();
                // create the device
                const parent = client.registryPath(projectId, Location, nameOfRegistryToDevice); 
                const device = {id: deviceId, hi:hi} // The device id, and in general the device information that you want to send
                // run the main method
                const [response] = await client.createDevice({parent, device});
                // console to check
                console.log(`${response.name} created.`);
                // res
                res.send(response.name);
            }
            
            // execute function and check response
            async function executeCreationOfHaloDevice(){
                try{
                    const deviceCreated = await createDeviceToHalo(projectId, deviceId, req.body.hi);
                }catch (error){
                    console.error(error);
                }
            }
            // // run it
            executeCreationOfHaloDevice();

            ////////////////////////////////////////////////////// TOPICS FOR HALO DEVICE
            // Imports the Google Cloud client library
            const {PubSub} = require('@google-cloud/pubsub');

            // function to create the topics
            async function createTopicsToHaloDevice(projectId, topicName) {
                // Instantiates a client
                const pubsub = new PubSub({projectId});
                // Creates the new topic
                const [topic] = await pubsub.createTopic(topicName);
                console.log(`Topic ${topic.name} created.`);
            }

            // execute function and check response
            async function executeCreateTopicsToHaloDevice(){
                
                // object with topics
                const mqttTopics = {   
                    MQTT_TOPIC_TO_TELEMETRY: `/devices/${deviceId}/events`,
                    MQTT_TOPIC_TO_CONFIG: `/devices/${deviceId}/config`,
                    MQTT_TOPIC_TO_COMMANDS: `/devices/${deviceId}/commands/#`,
                    MQTT_TOPIC_TO_STATE: `/devices/${deviceId}/state`
                }

                // detect keys in object
                const keys = Object.keys(mqttTopics);

                // run loop
                for (const key of keys) {
                    try{
                        createTopicsToHaloDevice(projectId, key);
                    }catch (error){
                        console.error(error);
                    }
                }
            }
            // run it
            executeCreateTopicsToHaloDevice();
        }).catch((err) => console.error(err));
}



