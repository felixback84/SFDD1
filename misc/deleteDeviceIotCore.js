// deletion of device and topics in iot core and pub/sub respectivily --------- to check
app.delete('/device/:userDeviceId/deleteInIotCore', deleteInIotCore);

// delete device & topics in iot core - pub/sub ------------------ to check
exports.deleteDeviceInIotCore = functions.firestore
    .document('activeUserDevices/{activeUserDevicesId}')
    .onDelete((snap) => {
        // grab userDeviceId from firebase doc
        const inActiveUserDevice = snap.data();
        const userDeviceId = inActiveUserDevice.userDeviceId
        console.log(userDeviceId);
        // declarate function to init iotCore & pub/sub
        async function killIotCoreAndPubSub(valueUserDeviceId){
            // api url
            const fetch = require('node-fetch');
            const urlApi = `https://us-central1-sfdd-d8a16.cloudfunctions.net/api/device/${valueUserDeviceId}/deleteInIotCore`;
            const options = {
                method: 'DELETE'
            };
            //fetch 
            const iotResponse = await fetch(urlApi, options);
            const iotJsonData = await iotResponse.json();
            console.log(iotJsonData);
        }
        // run it
        killIotCoreAndPubSub(userDeviceId);
        
    })

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
                }        
            })    
    }           