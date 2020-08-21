// create decive & topics in iot core and pub/sub
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
            deviceId = `${userHandle}-${nameOfDevice}-${userDeviceId}`
            // determine wich type of device is
            switch(nameOfDevice){
                case 'Halo':
                    //////////////////////////////////////////////////////////////////// CREATION OF HALO DEVICE
                    async function createDeviceToHalo(projectId ,deviceId) {
                        // client library
                        const iot = require('@google-cloud/iot');
                        // instantiate client
                        const client = new iot.v1.DeviceManagerClient();
                        // gcloud vars
                        const Location = 'us-central1';
                        const nameOfRegistryToDevice = 'Halo';
                        // create the device in the path
                        const regPath = client.registryPath(projectId, Location, nameOfRegistryToDevice); 
                        // The device id, and in general the device information that you want to send
                        const haloDevice = {
                            id: deviceId
                        } 
                        // all the info for the creation of the device
                        const haloRequest = {
                            parent: regPath,
                            device: haloDevice
                        };
                        // run the main method
                        const [device] = await client.createDevice(haloRequest);
                        // console to check
                        console.log(`Response for createDeviceToHalo: ${device.name} created.`);
                        // var to hold device name
                        const haloDeviceName = device.name;
                        // show all
                        console.log(haloDeviceName);
                    }
                    createDeviceToHalo(projectId ,deviceId).catch(console.error);
                    break;
                case 'Hilda': 
                    //////////////////////////////////////////////////////////////////// CREATION OF HILDA DEVICE
                    async function createDeviceToHilda(projectId ,deviceId) {
                        // client library
                        const iot = require('@google-cloud/iot');
                        // instantiate client
                        const client = new iot.v1.DeviceManagerClient();
                        // gcloud vars
                        const Location = 'us-central1';
                        const nameOfRegistryToDevice = 'Hilda';
                        // create the device in the path
                        const regPath = client.registryPath(projectId, Location, nameOfRegistryToDevice); 
                        // The device id, and in general the device information that you want to send
                        const hildaDevice = {
                            id: deviceId
                        } 
                        // all the info for the creation of the device
                        const hildaRequest = {
                            parent: regPath,
                            device: hildaDevice
                        };
                        // run the main method
                        const [device] = await client.createDevice(hildaRequest);
                        // console to check
                        console.log(`Response for createDeviceToHalo: ${device.name} created.`);
                        // var to hold device name
                        const hildaDeviceName = device.name;
                        // show all
                        console.log(hildaDeviceName);
                    }
                    createDeviceToHilda(projectId ,deviceId).catch(console.error);;
                    break;
                case 'default':
                    null
                }               
        }).catch((err) => console.error(err));
}

// create topics in pub/sub
exports.createTopicsInPubSub = (req,res) => {
    // firebase part
    const { db } = require('../utilities/admin');
    // var to firebase consult
    const userDeviceId = req.params.userDeviceId
    // var for hold id of device
    let deviceId = "";
    // var project id
    const projectId = 'sfdd-d8a16';
    db
        .doc(`/userDevices/${userDeviceId}`)
        .get()
        .then((doc) => {
            let userDeviceData = doc.data();
            let userHandle = userDeviceData.userHandle;
            let nameOfDevice = userDeviceData.device.nameOfDevice;
            // var with vars to pass through function
            deviceId = `${userHandle}-${nameOfDevice}-${userDeviceId}`;
            ////////////////////////////////////////////////////// CREATION OF TOPICS FOR DEVICE
            // function to create the topics to device
            const createTopicsToDevice = async function (projectId, deviceId) {
                // Imports the Google Cloud client library
                const {PubSub} = require('@google-cloud/pubsub');
                // Instantiates a client
                const pubsub = new PubSub({projectId});
                const mqttTopics = {   
                    MQTT_TOPIC_TO_TELEMETRY: `events~${deviceId}`,
                    MQTT_TOPIC_TO_CONFIG: `config~${deviceId}`,
                    MQTT_TOPIC_TO_COMMANDS: `commands~${deviceId}~on-off`,
                    MQTT_TOPIC_TO_STATE: `state~${deviceId}`
                }   
                // var to save all topics names
                const topics = [];
                // detect keys in object
                const values = Object.values(mqttTopics);
                // run loop
                for (const value of values) {
                    // Creates the new topic
                    const [topic] = await pubsub.createTopic(value);
                    console.log(`Response for createTopicsToDevice: ${topic.name} created.`);
                    topics.push(topic.name);
                }
                // show all
                console.log(topics);
            }
            // run it
            createTopicsToDevice(projectId, deviceId).catch(console.error);;  
        }).catch(console.error);
}    
    
// create subscriptions in pub/sub
exports.createSubscriptionsInPubSub = (req,res) => {
    // firebase part
    const { db } = require('../utilities/admin');
    // var to firebase consult
    const userDeviceId = req.params.userDeviceId
    // var for hold id of device
    let deviceId = "";
    // ask firebase
    db
        .doc(`/userDevices/${userDeviceId}`)
        .get()
        .then((doc) => {
            let userDeviceData = doc.data();
            let userHandle = userDeviceData.userHandle;
            let nameOfDevice = userDeviceData.device.nameOfDevice;
            // var with vars to pass through function
            deviceId = `${userHandle}-${nameOfDevice}-${userDeviceId}`;
            ////////////////////////////////////////////////////// CREATION OF SUBSCRIPTIONS FOR TOPICS
            // declaration of function to create subscriptions
            async function createSubscriptionToTopics(deviceId) {
                // Imports the Google Cloud client library
                const {PubSub} = require('@google-cloud/pubsub');
                // var to save all topics subscriptions
                const subscriptions = [];
                // Creates a client; cache this for further use
                const pubSubClient = new PubSub();
                // object with topics
                const mqttTopicsSubscriptions = {   
                    MQTT_TOPIC_TO_TELEMETRY: `events~${deviceId}`,
                    MQTT_TOPIC_TO_CONFIG: `config~${deviceId}`,
                    MQTT_TOPIC_TO_COMMANDS: `commands~${deviceId}~on-off`,
                    MQTT_TOPIC_TO_STATE: `state~${deviceId}`
                }  
                // detect keys in object
                const topicsNames = Object.values(mqttTopicsSubscriptions);
                // run loop
                for (const topicName of topicsNames) {
                    // Creates a new subscription
                    const [subscription] = await pubSubClient.topic(topicName).createSubscription(topicName);
                    console.log(`Response for createSubscriptionsInPubSub: ${subscription.name}created.`);
                    subscriptions.push(subscription.name);
                }
                // show all
                console.log(subscriptions);
            } 
            // run it 
            createSubscriptionToTopics(deviceId).catch(console.error);  
        }).catch(console.error); 
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
                    async function deleteDeviceToHalo(projectId ,deviceId) {
                        // client library
                        const iot = require('@google-cloud/iot');
                        // instantiate client
                        const client = new iot.v1.DeviceManagerClient();
                        // vars
                        const Location = 'us-central1';
                        const nameOfRegistryToDevice = 'Halo';
                        // delete the device
                        const parent = client.devicePath(projectId, Location, nameOfRegistryToDevice, deviceId); 
                        // run the main method
                        const [response] = await client.deleteDevice({name: parent});
                        // console to check
                        console.log(`${response.name} deleted.`);
                        // res
                        res.send(response.name);
                    }
                    // execute function and check response
                    async function executeDeletionOfHaloDevice(){
                        try{
                            const deviceDeleted = await deleteDeviceToHalo(projectId, deviceId);
                        }catch (error){
                            console.error(error);
                        }
                    }
                    // // run it
                    executeDeletionOfHaloDevice();

                    ////////////////////////////////////////////////////// DELETE TOPICS FOR HALO DEVICE
                    async function deleteTopicsToHaloDevice(topicName) {
                        // Imports the Google Cloud client library
                        const {PubSub} = require('@google-cloud/pubsub');
                        // Creates a client; cache this for further use
                        const pubSubClient = new PubSub();
                        // const topicName = 'my-topic';
                        // Deletes the topic
                        await pubSubClient.topic(topicName).delete();
                        console.log(`Topic ${topicName} deleted.`);   
                    }

                    // execute function and check response
                    async function executeDeleteTopicsToHaloDevice(deviceId){
                        // topics to erase
                        const mqttTopics = {   
                            MQTT_TOPIC_TO_TELEMETRY: `events~${deviceId}`,
                            MQTT_TOPIC_TO_CONFIG: `config~${deviceId}`,
                            MQTT_TOPIC_TO_COMMANDS: `commands~${deviceId}~on-off`,
                            MQTT_TOPIC_TO_STATE: `state~${deviceId}`
                        } 
                        // detect keys in object
                        const values = Object.values(mqttTopics);
                        // run loop
                        for (const value of values){
                            try{
                                deleteTopicsToHaloDevice(value);
                            }
                            catch{
                                console.error(error);
                            }
                        } 
                    }
                    // run it
                    executeDeleteTopicsToHaloDevice(deviceId);
                    break;
                case 'Hilda':
                    // aca va todo igual pero para hilda
                    //////////////////////////////////////////////////////////////////// DELETION OF HILDA DEVICE
                    async function deleteDeviceToHilda(projectId ,deviceId) {
                        // client library
                        const iot = require('@google-cloud/iot');
                        // instantiate client
                        const client = new iot.v1.DeviceManagerClient();
                        // vars
                        const Location = 'us-central1';
                        const nameOfRegistryToDevice = 'Hilda';
                        // delete the device
                        const parent = client.devicePath(projectId, Location, nameOfRegistryToDevice, deviceId); 
                        // run the main method
                        const [response] = await client.deleteDevice({name: parent});
                        // console to check
                        console.log(`${response.name} deleted.`);
                        // res
                        res.send(response.name);
                    }
                    // execute function and check response
                    async function executeDeletionOfHildaDevice(){
                        try{
                            const deviceDeleted = await deleteDeviceToHilda(projectId, deviceId);
                        }catch (error){
                            console.error(error);
                        }
                    }
                    // // run it
                    executeDeletionOfHildaDevice();

                    ////////////////////////////////////////////////////// DELETE TOPICS FOR HILDA DEVICE
                    async function deleteTopicsToHildaDevice(topicName) {
                        // Imports the Google Cloud client library
                        const {PubSub} = require('@google-cloud/pubsub');
                        // Creates a client; cache this for further use
                        const pubSubClient = new PubSub();
                        // const topicName = 'my-topic';
                        // Deletes the topic
                        await pubSubClient.topic(topicName).delete();
                        console.log(`Topic ${topicName} deleted.`); 
                    }
                    
                    // execute function and check response
                    async function executeDeleteTopicsToHildaDevice(deviceId){
                        // topics to erase
                        const mqttTopics = {   
                            MQTT_TOPIC_TO_TELEMETRY: `events~${deviceId}`,
                            MQTT_TOPIC_TO_CONFIG: `config~${deviceId}`,
                            MQTT_TOPIC_TO_COMMANDS: `commands~${deviceId}~on-off`,
                            MQTT_TOPIC_TO_STATE: `state~${deviceId}`
                        } 
                        // detect keys in object
                        const values = Object.values(mqttTopics);
                        // run loop
                        for (const value of values){
                            try{
                                deleteTopicsToHildaDevice(value);
                            }
                            catch{
                                console.error(error);
                            }
                        } 
                    }
                    // run it
                    executeDeleteTopicsToHildaDevice(deviceId);
                    break;
                case 'default':
                    null
            }
        })    
}