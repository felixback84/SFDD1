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
            //something like: 'CarlosTal84-halo-8n4ohAo247H1W5SsxY9s'
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
                        // vars
                        const Location = 'us-central1';
                        const nameOfRegistryToDevice = 'Halo';
                        //const projectId = await client.getProjectId();
                        // create the device
                        const parent = client.registryPath(projectId, Location, nameOfRegistryToDevice); 
                        const device = {id: deviceId} // The device id, and in general the device information that you want to send
                        // run the main method
                        const [response] = await client.createDevice({parent, device});
                        // console to check
                        console.log(`Response for createDeviceToHalo: ${response.name} created.`);
                        // res
                        res.json(response.name);
                    }
                    
                    // execute function and check response
                    async function executeCreationOfHaloDevice(){
                        try{
                            const deviceHaloCreated = await createDeviceToHalo(projectId, deviceId);
                            const deviceHaloCreatedResponse = await deviceHaloCreated;
                            console.log(`Response for executeCreationOfHaloDevice: ${deviceHaloCreatedResponse}`);
                        }catch (error){
                            console.error(error);
                        }
                    }
                    // // run it
                    executeCreationOfHaloDevice();
                    break;
                case 'Hilda': 
                    //////////////////////////////////////////////////////////////////// CREATION OF HILDA DEVICE
                    async function createDeviceToHilda(projectId ,deviceId) {
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
                        const device = {id: deviceId} // The device id, and in general the device information that you want to send
                        // run the main method
                        const [response] = await client.createDevice({parent, device});
                        // console to check
                        console.log(`Response for createDeviceToHilda: ${response.name} created.`);
                        // res
                        //res.json(response.name);
                    }
                    
                    // execute function and check response
                    async function executeCreationOfHildaDevice(){
                        try{
                            const deviceHildaCreated = await createDeviceToHilda(projectId, deviceId);
                            const deviceHildaCreatedResponse = await deviceHildaCreated.response;
                            console.log(`Response for executeCreationOfHildaDevice: ${deviceHildaCreatedResponse}`);
                        }catch (error){
                            console.error(error);
                        }
                    }
                    // // run it
                    executeCreationOfHildaDevice();
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
            //something like: 'CarlosTal84-halo-8n4ohAo247H1W5SsxY9s'
            deviceId = `${userHandle}-${nameOfDevice}-${userDeviceId}`;
            // determine wich type of device is
            switch(nameOfDevice){
                case 'Halo':
                    ////////////////////////////////////////////////////// CREATION OF TOPICS FOR HALO DEVICE
                    // function to create the topics to halo devices
                    const createTopicsToHaloDevice = async function (projectId, topicName) {
                        // Imports the Google Cloud client library
                        const {PubSub} = require('@google-cloud/pubsub');
                        // Instantiates a client
                        const pubsub = new PubSub({projectId});
                        // Creates the new topic
                        const [topic] = await pubsub.createTopic(topicName);
                        console.log(`Response for createTopicsToHaloDevice: ${topic.name} created.`);
                        res.json(topic.name);
                    }
        
                    // execute function and check response
                    async function executeCreateTopicsToHaloDevice(deviceId){
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
                                const topicsHaloCreated = await createTopicsToHaloDevice(projectId, value);
                                const topicsHaloCreatedResponse = await topicsHaloCreated.topic;
                                console.log(`Response for executeCreateTopicsToHaloDevice: ${topicsHaloCreatedResponse}`);
                            }catch (error){
                                console.error(error);
                            }
                        }
                    }
                    // run it
                    executeCreateTopicsToHaloDevice(deviceId);
                    break;
                case 'Hilda':
                    ////////////////////////////////////////////////////// CREATION OF TOPICS FOR HILDA DEVICE
                    // function to create the topics
                    async function createTopicsToHildaDevice(projectId, topicName) {
                        // Imports the Google Cloud client library
                        const {PubSub} = require('@google-cloud/pubsub');
                        // Instantiates a client
                        const pubsub = new PubSub({projectId});
                        // Creates the new topic
                        const [topic] = await pubsub.createTopic(topicName);
                        console.log(`Response for createTopicsToHildaDevice: ${topic.name} created.`);
                        res.json(topic.name);
                    }

                    // execute function and check response
                    async function executeCreateTopicsToHildaDevice(deviceId){
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
                                const topicsHildaCreated = await createTopicsToHildaDevice(projectId, value);
                                const topicsHildaCreatedResponse = await topicsHildaCreated.topic;
                                console.log(`Response for executeCreateTopicsToHildaDevice: ${topicsHildaCreatedResponse}`);
                            }catch (error){
                                console.error(error);
                            }
                        }
                    }
                    // run it
                    executeCreateTopicsToHildaDevice(deviceId);
                    break;
                case 'default':
                null
            }
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
            //something like: 'CarlosTal84-halo-8n4ohAo247H1W5SsxY9s'
            deviceId = `${userHandle}-${nameOfDevice}-${userDeviceId}`;
            switch(nameOfDevice){
                case 'Halo':
                    // declaration of function to create subscriptions fof halo devices
                    async function createSubscriptionToTopicsToHalo(topicName, subscriptionName) {
                        // Imports the Google Cloud client library
                        const {PubSub} = require('@google-cloud/pubsub');
                        // Creates a client; cache this for further use
                        const pubSubClient = new PubSub();
                        // Creates a new subscription
                        const [subscription] = await pubSubClient.topic(topicName).createSubscription(subscriptionName);
                        console.log(`Response for createSubscriptionToTopicsToHalo: ${subscription.name}created.`);
                        //res.json(subscription.name);
                    }

                    // check the response
                    async function executeCreateSubscriptionToTopicsToHalo(deviceId){
                        // object with topics
                        const mqttTopics = {   
                            MQTT_TOPIC_TO_TELEMETRY: `events~${deviceId}`,
                            MQTT_TOPIC_TO_CONFIG: `config~${deviceId}`,
                            MQTT_TOPIC_TO_COMMANDS: `commands~${deviceId}~on-off`,
                            MQTT_TOPIC_TO_STATE: `state~${deviceId}`
                        }   
                        
                        // detect keys in object
                        const topicsNames = Object.values(mqttTopics);
                        // run loop
                        for (const topicName of topicsNames) {
                            //createSubscriptionToTopicsToHalo(topicName, topicName).catch(console.error);
                            try{
                                const subscriptionsHaloCreated = await createSubscriptionToTopicsToHalo(topicName, topicName);
                                const subscriptionsHaloCreatedResponse = await subscriptionsHaloCreated.subscription;
                                console.log(`Response for executeCreateSubscriptionToTopicsToHalo: ${subscriptionsHaloCreatedResponse}`);
                            }catch(error){
                                console.error(error);
                            }
                        }
                    }
                    // run it
                    executeCreateSubscriptionToTopicsToHalo(deviceId);
                    break;
                case 'Hilda':
                    // declaration of function to create subscriptions fof halo devices
                    async function createSubscriptionToTopicsToHilda(topicName, subscriptionName) {
                        // Imports the Google Cloud client library
                        const {PubSub} = require('@google-cloud/pubsub');
                        // Creates a client; cache this for further use
                        const pubSubClient = new PubSub();
                        // Creates a new subscription
                        const [subscription] = await pubSubClient.topic(topicName).createSubscription(subscriptionName);
                        console.log(`Subscription ${subscription.name} created.`);
                        //res.json(subscription.name);
                    }

                    // check the response
                    async function executeCreateSubscriptionToTopicsToHilda(deviceId){
                        // object with topics
                        const mqttTopics = {   
                            MQTT_TOPIC_TO_TELEMETRY: `events~${deviceId}`,
                            MQTT_TOPIC_TO_CONFIG: `config~${deviceId}`,
                            MQTT_TOPIC_TO_COMMANDS: `commands~${deviceId}~on-off`,
                            MQTT_TOPIC_TO_STATE: `state~${deviceId}`
                        }   
                        
                        // detect keys in object
                        const topicsNames = Object.values(mqttTopics);
                        // run loop
                        for (const topicName of topicsNames) {
                            //createSubscriptionToTopicsToHilda(topicName, topicName).catch(console.error);
                            try{
                                const subscriptionsHildaCreated = await createSubscriptionToTopicsToHilda(topicName, topicName);
                                const subscriptionsHildaCreatedResponse = await subscriptionsHildaCreated.subscription;
                                console.log(`Response for executeCreateSubscriptionToTopicsToHilda: ${subscriptionsHildaCreatedResponse}`);
                            }catch(error){
                                console.error(error);
                            }
                        }
                    }
                    // run it
                    executeCreateSubscriptionToTopicsToHilda(deviceId);
                    break;
                case 'default':
                    null 
            }        
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