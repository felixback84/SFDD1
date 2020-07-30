// get on of halo device
exports.getOnOffFromHaloDevice = (req, res) => {
    // firebase part
    const { db } = require('../utilities/admin');
    // var to firebase consult
    const userDeviceId = req.params.userDeviceId
    // var for hold id of device
    let deviceId = "";
    // ask for firebase document
    db
        .doc(`/userDevices/${userDeviceId}`)
        .get()
        .then((doc) => {
            let userDeviceData = doc.data();
            let userHandle = userDeviceData.userHandle;
            let nameOfDevice = userDeviceData.device.nameOfDevice;
            // var with vars to pass through function
            deviceId = `${userHandle}-${nameOfDevice}-${userDeviceId}`;

            async function listenForOnMessageFromHaloDevice(deviceId){
                // global vars
                const cloudRegion = 'us-central1';
                const projectId = 'sfdd-d8a16';
                const registryId = 'Halo';
                // lib
                const iot = require('@google-cloud/iot');
                // client
                const iotClient = new iot.v1.DeviceManagerClient({
                // optional auth parameters.
                });
                // device path in iot core
                const devicePath = iotClient.devicePath(
                    projectId,
                    cloudRegion,
                    registryId,
                    deviceId
                );
                // check response
                try {
                    const responses = await iotClient.listDeviceStates({name: devicePath});
                    const states = responses[0].deviceStates;
                    // check if theres any response
                    if (states.length === 0) {
                        console.log(`No States for device: ${deviceId}`);
                    } else {
                        console.log(`States for device: ${deviceId}`);
                        // pick the last one in the array
                        const lastState = states[states.length - 1].binaryData.toString('utf8');
                        // print last result
                        console.log(lastState);
                        // send response
                        res.send(lastState);
                    }
                    // loop on the states
                    // for (let i = 0; i < states.length; i++) {
                    //     const state = states[i];
                    //     console.log(
                    //     'State:',
                    //     state,
                    //     '\nData:\n',
                    //     state.binaryData.toString('utf8')
                    //     );
                    // }
                } catch (err) {
                    console.error('Could not find device:', deviceId);
                    console.error('trace:', err);
                }
            }    
            listenForOnMessageFromHaloDevice(deviceId);
        })
}

// with socket.io
// exports.getOnOffFromHaloDevice = (req, res) => {
//     // libs to make work socket io
//     const app = require('express')();
//     const server = require('http').Server(app);
//     //const options = { /* ... */ };
//     const io = require('socket.io')(server);
//     // firebase part
//     const { db } = require('../utilities/admin');
//     // var to firebase consult
//     const userDeviceId = req.params.userDeviceId
//     // var for hold id of device
//     let deviceId = "";
//     // ask for firebase document
//     db
//         .doc(`/userDevices/${userDeviceId}`)
//         .get()
//         .then((doc) => {
//             let userDeviceData = doc.data();
//             let userHandle = userDeviceData.userHandle;
//             let nameOfDevice = userDeviceData.device.nameOfDevice;
//             // var with vars to pass through function
//             deviceId = `${userHandle}-${nameOfDevice}-${userDeviceId}`;
//             // socket init
//             io.on('connection', function(socket){ 
//                 // global vars
//                 const cloudRegion = 'us-central1';
//                 const projectId = 'sfdd-d8a16';
//                 const registryId = 'Halo';
//                 // function to listen messages from halo device    
//                 async function listenForOnMessageFromHaloDevice(deviceId){
//                     // lib gcloud
//                     const iot = require('@google-cloud/iot');
//                     // client
//                     const iotClient = new iot.v1.DeviceManagerClient({
//                     // optional auth parameters.
//                     });
//                     // device path in iot core
//                     const devicePath = iotClient.devicePath(
//                         projectId,
//                         cloudRegion,
//                         registryId,
//                         deviceId
//                     );
//                     // check response
//                     try {
//                         const responses = await iotClient.listDeviceStates({name: devicePath});
//                         // hold response 
//                         const states = responses[0].deviceStates;
//                         // check if theres any response
//                         if (states.length === 0) {
//                             console.log(`No States for device: ${deviceId}`);
//                         } else {
//                             console.log(`States for device: ${deviceId}`);
//                             // payload desire
//                             const lastState = states[-1].deviceStates;
//                             // see last response
//                             console.log(lastState);
//                             // send response
//                             res.send(lastState);
//                             // io emit data
//                             io.emit("ON", (lastState.deviceId + ";" + lastState.on + ";" + lastState.date).toString());
//                         }
//                     } catch (err) {
//                         console.error('Could not find device:', deviceId);
//                         console.error('trace:', err);
//                     }
//                 }    
//                 listenForOnMessageFromHaloDevice(deviceId);
//             })
//         })   
//     }         
