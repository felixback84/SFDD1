// create device & topics in iot core - pub/sub
exports.createDeviceInIotCore = functions.firestore
    .document('activeUserDevices/{activeUserDevicesId}')
    .onCreate((snap) => {
        // grab userDeviceId from firebase doc
        const newActiveUserDevice = snap.data();
        const userDeviceId = newActiveUserDevice.userDeviceId

        async function initDevicesIotCore(valueUserDeviceId){
            // api url
            const fetch = require('node-fetch');
            const urlApi = `https://us-central1-sfdd-d8a16.cloudfunctions.net/api/device/${valueUserDeviceId}/createDevicesInIotCore`;
            const options = {
                method: 'GET'
            };
            //fetch
            const iotResponse = await fetch(urlApi, options);
            const iotJsonData = await iotResponse.json();
            console.log(`Response for initDevicesIotCore: ${iotJsonData}`);
        }
        // run it
        initDevicesIotCore(userDeviceId);
        
    });