// create decive & topics in iot core and pub/sub
exports.createInIotCore = (req, res) => {
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
            //something like: 'CarlosTal84-halo-8n4ohAo247H1W5SsxY9s'
            deviceId = `${userHandle}-${nameOfDevice}-${userDeviceId}`
            // determine wich type of device is
            switch(nameOfDevice){
                case 'Halo':
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
                    // function to create the topics
                    async function createTopicsToHaloDevice(projectId, topicName) {
                        // Imports the Google Cloud client library
                        const {PubSub} = require('@google-cloud/pubsub');
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
                            MQTT_TOPIC_TO_TELEMETRY: `events~${deviceId}`,
                            MQTT_TOPIC_TO_CONFIG: `config~${deviceId}`,
                            MQTT_TOPIC_TO_COMMANDS: `commands~${deviceId}~on-off`,
                            MQTT_TOPIC_TO_STATE: `state~${deviceId}`
                        }   

                        // detect keys in object
                        const values = Object.values(mqttTopics);

                        // run loop
                        for (const value of values) {
                            try{
                                createTopicsToHaloDevice(projectId, value);
                            }catch (error){
                                console.error(error);
                            }
                        }
                    }
                    // run it
                    executeCreateTopicsToHaloDevice();
                    break;
                case 'Hilda': 
                    //////////////////////////////////////////////////////////////////// CREATION OF HILDA DEVICE
                    async function createDeviceToHilda(projectId ,deviceId, hi) {
                        // client library
                        const iot = require('@google-cloud/iot');
                        // instantiate client
                        const client = new iot.v1.DeviceManagerClient();
                        // vars
                        const Location = 'us-central1';
                        const nameOfRegistryToDevice = 'Hilda';
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
                    async function executeCreationOfHildaDevice(){
                        try{
                            const deviceCreated = await createDeviceToHilda(projectId, deviceId, req.body.hi);
                        }catch (error){
                            console.error(error);
                        }
                    }
                    // // run it
                    executeCreationOfHildaDevice();

                    ////////////////////////////////////////////////////// TOPICS FOR HILDA DEVICE
                    // function to create the topics
                    async function createTopicsToHildaDevice(projectId, topicName) {
                        // Imports the Google Cloud client library
                        const {PubSub} = require('@google-cloud/pubsub');
                        // Instantiates a client
                        const pubsub = new PubSub({projectId});
                        // Creates the new topic
                        const [topic] = await pubsub.createTopic(topicName);
                        console.log(`Topic ${topic.name} created.`);
                    }

                    // execute function and check response
                    async function executeCreateTopicsToHildaDevice(){
                        
                        // object with topics
                        const mqttTopics = {   
                            MQTT_TOPIC_TO_TELEMETRY: `events~${deviceId}`,
                            MQTT_TOPIC_TO_CONFIG: `config~${deviceId}`,
                            MQTT_TOPIC_TO_COMMANDS: `commands~${deviceId}~on-off`,
                            MQTT_TOPIC_TO_STATE: `state~${deviceId}`
                        }   

                        // detect keys in object
                        const values = Object.values(mqttTopics);

                        // run loop
                        for (const value of values) {
                            try{
                                createTopicsToHildaDevice(projectId, value);
                            }catch (error){
                                console.error(error);
                            }
                        }
                    }
                    // run it
                    executeCreateTopicsToHildaDevice();
                    break;
                case 'default':
                    null
                }               
        }).catch((err) => console.error(err));
}

// delete decive & topics in iot core and pub/sub
exports.deleteInIotCore = (req, res) => {
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
            //something like: 'CarlosTal84-halo-8n4ohAo247H1W5SsxY9s'
            deviceId = `${userHandle}-${nameOfDevice}-${userDeviceId}`
            // determine wich type of device is
            switch(nameOfDevice){
                case 'Halo':
                    //////////////////////////////////////////////////////////////////// DELETION OF HALO DEVICE
                    async function deleteDeviceToHalo(projectId ,deviceId, hi) {
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
                        const [response] = await client.deleteDevice({parent, device});
                        // console to check
                        console.log(`${response.name} deleted.`);
                        // res
                        res.send(response.name);
                    }
                    // execute function and check response
                    async function executeDeletionOfHaloDevice(){
                        try{
                            const deviceDeleted = await deleteDeviceToHalo(projectId, deviceId, req.body.hi);
                        }catch (error){
                            console.error(error);
                        }
                    }
                    // // run it
                    executeDeletionOfHaloDevice();
            }
        })    
}

