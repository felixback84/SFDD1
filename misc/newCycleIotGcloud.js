// update registry of devices
exports.createDeviceRegistryInIotCore = (req, res) => {
    // firebase part
    const { db } = require('../utilities/admin');
    // var to firebase consult
    const userDeviceId = req.params.userDeviceId;
    // const userHandle = req.params.userHandle; ---> for use first, set user token send from client
    // ask for firebase document
    db
        .doc(`/userDevices/${userDeviceId}`)
        .get()
        .then((doc) => {
            let userDeviceData = doc.data();
            let userHandle = userDeviceData.userHandle;
            // declaration of function to update subscriptions with the new topics of the devices
            async function createDeviceRegistry(){
                const iot = require('@google-cloud/iot');
                // cloud region
                const Location = 'us-central1';
                // registry name
                const registryId = `${userHandle}~${userDeviceId}`; 
                // var project id
                const projectId = 'sfdd-d8a16';              
                // Lookup the pubsub topics
                const topicPaths = [
                    `projects/${projectId}/topics/events`,
                    `projects/${projectId}/topics/config`,
                    `projects/${projectId}/topics/commands`,
                    `projects/${projectId}/topics/state`
                ]
                // client
                const iotClient = new iot.v1.DeviceManagerClient({
                // optional auth parameters.
                });
                // path for registry
                const newParent = iotClient.locationPath(projectId, Location);
                // params device registry
                const deviceRegistry = {
                    eventNotificationConfigs: [
                        {   subfolderMatches: "config-mqtt",
                            pubsubTopicName: topicPaths[1],
                        },
                        {
                            subfolderMatches: "commands-mqtt",
                            pubsubTopicName: topicPaths[2],
                        },
                        {   
                            subfolderMatches: "telemetry-mqtt",
                            pubsubTopicName: topicPaths[0],
                        },
                    ],
                    stateNotificationConfig: {
                        pubsubTopicName: topicPaths[3]
                    },
                    id: registryId
                };

                // req registry
                const request = {
                    parent: newParent,
                    deviceRegistry: deviceRegistry
                };

                try {
                        const responses = await iotClient.createDeviceRegistry(request);
                        const response = responses[0];
                        const registryName = response.name;
                        //res
                        res.json(registryName);
                        console.log('Successfully created registry');
                        console.log(registryName);
                    } catch (err) {
                        console.error('Could not create registry', err);
                    }
            }
            // run it
            createDeviceRegistry();
        })    
}

// create decive & topics in iot core and pub/sub
exports.createDeviceInIotCore = (req, res) => {
    // firebase part
    const { db } = require('../utilities/admin');
    // var to firebase consult
    const userDeviceId = req.params.userDeviceId;
    // var for hold id of device
    let deviceId = "";
    // ask for firebase document
    db
        .doc(`/userDevices/${userDeviceId}`)
        .get()
        .then((doc) => {
            let userDeviceData = doc.data();
            let nameOfDevice = userDeviceData.device.nameOfDevice;
            // user
            let userHandle = userDeviceData.userHandle;
            // var with vars to pass through function
            deviceId = `${nameOfDevice}~${userDeviceId}`;
            // function to create device in iot
            async function createDeviceInIot(deviceId) {
                // client library
                const iot = require('@google-cloud/iot');
                // instantiate client
                const client = new iot.v1.DeviceManagerClient();
                // gcloud vars
                const Location = 'us-central1';
                // var project id
                const projectId = 'sfdd-d8a16';
                // var for name of registry
                const nameOfRegistryToDevice = `${userHandle}~${userDeviceId}`;
                // create the device in the path
                const regPath = client.registryPath(projectId, Location, nameOfRegistryToDevice); 
                // The device id, and in general the device information that you want to send
                const deviceSet = {
                    id: deviceId
                } 
                // all the info for the creation of the device
                const request = {
                    parent: regPath,
                    device: deviceSet
                };
                // run the main method
                const [device] = await client.createDevice(request);
                // console to check
                console.log(`Response for createDeviceToHalo: ${device.name} created.`);
                // var to hold device name
                const deviceName = device.name;
                //res
                res.json(deviceName);
                // show all
                console.log(deviceName);
            }
            createDeviceInIot(deviceId);
        }).catch((err) => console.error(err));
}

// create topics in pub/sub
exports.createTopicsInPubSub = (req, res) => {
    // var project id
    const projectId = 'sfdd-d8a16';
    // function to create the topics to device
    const createTopicsToHaloDevice = async function (projectId) {
        // Imports the Google Cloud client library
        const {PubSub} = require('@google-cloud/pubsub');
        // Instantiates a client
        const pubsub = new PubSub({projectId});
        const mqttTopics = {   
            MQTT_TOPIC_TO_TELEMETRY: `events`,
            MQTT_TOPIC_TO_CONFIG: `config`,
            MQTT_TOPIC_TO_COMMANDS: `commands`,
            MQTT_TOPIC_TO_STATE: `state`
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
        //res
        res.json(topics);
        // show all
        console.log(topics);
    }
    createTopicsToHaloDevice(projectId).catch(console.error);
} 

// create subscriptions in pub/sub
exports.createSubscriptionsInPubSub = (req,res) => {
    // declaration of function to create subscriptions
    async function createSubscriptionToTopicsToHalo() {
        // Imports the Google Cloud client library
        const {PubSub} = require('@google-cloud/pubsub');
        // var to save all topics subscriptions
        const subscriptions = [];
        // Creates a client; cache this for further use
        const pubSubClient = new PubSub();
        // object with topics
        const mqttTopicsSubscriptions = {   
            MQTT_TOPIC_TO_TELEMETRY: `events`,
            MQTT_TOPIC_TO_CONFIG: `config`,
            MQTT_TOPIC_TO_COMMANDS: `commands`,
            MQTT_TOPIC_TO_STATE: `state`
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
        //res
        res.json(subscriptions);
        // show all
        console.log(subscriptions);
    } 
    // run it 
    createSubscriptionToTopicsToHalo().catch(console.error); 
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