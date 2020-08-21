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
                            id: deviceId,
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
                        //res
                        res.json(haloDeviceName);
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
                            id: deviceId,
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
                        //res
                        res.json(hildaDeviceName);
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

 