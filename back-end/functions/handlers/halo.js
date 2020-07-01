exports.createDeviceInIotCore = (req, res) => {

    // HALO DEVICE
    async function createDeviceToHalo(hi) {
        // client library
        const iot = require('@google-cloud/iot');
        // client vars
        const client = new iot.v1.DeviceManagerClient();
        const projectId = await client.getProjectId();
        const parent = client.registryPath(projectId, 'us-central1','Halo'); // Your Location and registry name
        const device = {id:'halo-device-1', hi:hi} // The device id, and in general the device information that you want to send
        const [response] = await client.createDevice({parent, device});
        // console to check
        console.log(`${response.name} created.`);
        // res
        res.send(response.name);
    }
    // execute function and check response
    async function executeCreationOfaHaloDevice(){
        try{
            const deviceCreated = await createDeviceToHalo(req.body.hi);
        }catch (error){
            console.error(error);
        }
    }
    // run it
    executeCreationOfaHaloDevice();
}

// TOPICS FOR HALO DEVICE
// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

async function quickstart(
    projectId = 'your-project-id', // Your Google Cloud Platform project ID
    topicName = 'my-topic' // Name for the new topic to create
) {
    // Instantiates a client
    const pubsub = new PubSub({projectId});

    // Creates the new topic
    const [topic] = await pubsub.createTopic(topicName);
    console.log(`Topic ${topic.name} created.`);
}