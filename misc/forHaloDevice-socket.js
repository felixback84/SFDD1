// get on of halo device
exports.getOnOffFromHaloDevice = () => {
    // socket part
    const io = require('socket.io')();
    // server to listen
    const port = 3000;
    io.listen(port);
    console.log('listening on port ', port);

    var express = require('express');
    var app = express();
    var server = app.listen(3000);
    var io = require('socket.io').listen(server);
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
            // lastState from device
            let lastState = [];
            // connection
            io.on('connection', () => {
                // function to get state connection with device
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
                            // send response
                            // res.send(lastState);
                        } else {
                            console.log(`States for device: ${deviceId}`);
                            // pick the last one in the array
                            lastState = states[states.length - 1].binaryData.toString('utf8');
                            // print last result
                            console.log(lastState);
                            // send response (just for test)
                            //res.send(lastState);

                            // emit data via socket.io
                            // deviceId
                            io.emit("deviceId", (lastState.deviceId).toString());
                            // date
                            io.emit("date", (lastState.date).toString());
                            // lat
                            io.emit("latitude", (lastState.latitude).toString());
                            // long
                            io.emit("longitude", (lastState.longitude).toString());
                        }
                        
                    } catch (err) {
                        console.error('Could not find device:', deviceId);
                        console.error('trace:', err);
                    }
                    // recursive run
                    listenForOnMessageFromHaloDevice(deviceId);
                }  
                // actually run it
                setTimeout(listenForOnMessageFromHaloDevice(deviceId), 1000);  
            });
        })

    const app = require('express')();
    const server = require('http').createServer(app);
    //const options = { /* ... */ };
    const io = require('socket.io')(server);

    io.on('connection', socket => { 
        console.log(`client is subscribing to connection ${socket}`);
        client.emit('connection', new Date());
    });

    server.listen(3000);
    
}

