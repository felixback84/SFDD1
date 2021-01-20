// create decive & topics in iot core and pub/sub
exports.createUserDeviceInIotCore = (req, res) => {
    // firebase part
    const { db } = require('../utilities/admin');
    // var to firebase consult
    const userDeviceId = req.params.userDeviceId
    // var for hold id of device
    let thingId = ""; 
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
            thingId = `${userHandle}-${nameOfDevice}-${userDeviceId}`
            // determine wich type of device is
            switch(nameOfDevice){
                case 'Heartbeat': 
                    //////////////////////////////////////////////////////////////////// CREATION OF HILDA DEVICE
                    async function createDeviceToHeartbeat(projectId,thingId) {
                        // client library
                        const iot = require('@google-cloud/iot');
                        // instantiate client
                        const client = new iot.v1.DeviceManagerClient();
                        // gcloud vars
                        const Location = 'us-central1';
                        const nameOfRegistryToDevice = 'Heartbeat';
                        // create the device in the path
                        const regPath = client.registryPath(projectId, Location, nameOfRegistryToDevice); 
                        // The device id, and in general the device information that you want to send
                        const heartbeatDevice = {
                            id: thingId,
                        } 
                        // all the info for the creation of the device
                        const heartbeatRequest = {
                            parent: regPath,
                            device: heartbeatDevice
                        
                        };
                        // run the main method
                        const [device] = await client.createDevice(heartbeatRequest);
                        // console to check
                        console.log(`Response for createDeviceToHeartbeat: ${device.name} created.`);
                        // var to hold device name
                        const heartbeatDeviceName = device.name;
                        //res
                        res.json(heartbeatDeviceName);
                        // show all
                        console.log(heartbeatDeviceName);
                    }
                    createDeviceToHeartbeat(projectId ,thingId).catch(console.error);
                    break;    
                case 'default':
                    null
                }               
        }).catch((err) => console.error(err));
}

// create static decive & topics in iot core and pub/sub
exports.createStaticDeviceInIotCore = (req, res) => {
    // firebase part
    const { db } = require('../utilities/admin');
    // var to firebase consult
    const staticDeviceId = req.params.staticDeviceId
    // var for hold id of device
    let thingId = ""; 
    // var project id
    const projectId = 'sfdd-d8a16';

    // ask for firebase document 
    db
        .doc(`/staticDevices/${staticDeviceId}`)
        .get()
        .then((doc) => {
            let staticDeviceData = doc.data();
            let userHandle = staticDeviceData.userHandle;
            let nameOfDevice = userDeviceData.static.nameOfDevice;
            // var with vars to pass through function
            thingId = `${userHandle}-${nameOfDevice}-${staticDeviceId}`
            // determine wich type of device is
            switch(nameOfDevice){
                case 'staticHeartbeat': 
                    //////////////////////////////////////////////////////////////////// CREATION OF HILDA DEVICE
                    async function createDeviceToHeartbeat(projectId ,thingId) {
                        // client library
                        const iot = require('@google-cloud/iot');
                        // instantiate client
                        const client = new iot.v1.DeviceManagerClient();
                        // gcloud vars
                        const Location = 'us-central1';
                        const nameOfRegistryToDevice = 'Heartbeat';
                        // create the device in the path
                        const regPath = client.registryPath(projectId, Location, nameOfRegistryToDevice); 
                        // The device id, and in general the device information that you want to send
                        const heartbeatDevice = {
                            id: thingId,
                        } 
                        // all the info for the creation of the device
                        const heartbeatRequest = {
                            parent: regPath,
                            device: heartbeatDevice
                        };
                        // run the main method
                        const [device] = await client.createDevice(heartbeatRequest);
                        // console to check
                        console.log(`Response for createDeviceToHeartbeat: Static ${device.name} created.`);
                        // var to hold device name
                        const heartbeatStaticDeviceName = device.name;
                        //res
                        res.json(heartbeatStaticDeviceName);
                        // show all
                        console.log(heartbeatStaticDeviceName);
                    }
                    createDeviceToHeartbeat(projectId ,thingId).catch(console.error);
                    break;    
                case 'default':
                    null
                }               
        }).catch((err) => console.error(err));

}