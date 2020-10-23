// firebase
const { db } = require('../utilities/admin');

// post active command in hild things
exports.hildaPostActiveCommand = async (req, res) => {
    // req data
    const thingId = req.params.thingId;
    const activeValue = {...req.body};
    //const activeValue = req.body.active;
    // print
    console.log(activeValue)
    // to string 
    const string = JSON.stringify(activeValue);
    // global vars
    const cloudRegion = 'us-central1';
    const deviceId = thingId;
    const commandMessage = string;
    // const commandMessage = activeValue;
    const projectId = 'sfdd-d8a16';
    const registryId = 'Hilda';
    // lib iot core
    const iot = require('@google-cloud/iot');
    // client
    const iotClient = new iot.v1.DeviceManagerClient({
    // optional auth parameters.
    });
    // client and path of device
    const formattedName = iotClient.devicePath(
        projectId,
        cloudRegion,
        registryId,
        deviceId
    );
    // message data
    const binaryData = Buffer.from(commandMessage);
    // request
    const request = {
        name: formattedName,
        binaryData: binaryData,
    };

    try {
        const responses = await iotClient.sendCommandToDevice(request);
        console.log('Sent command: ', responses[0]);
        res.json(responses[0])
    } catch (err) {
        console.error('Could not send command:', err);
        res.json(err)
    }
}

// post inactive command in hild things
exports.hildaPostInactiveCommand = async (req, res) => {
    // req data
    const thingId = req.params.thingId;
    const inactiveValue = {...req.body};
    // print
    console.log(inactiveValue)
    // to string
    const string = JSON.stringify(inactiveValue);
    // global vars
    const cloudRegion = 'us-central1';
    const deviceId = thingId;
    const commandMessage = string;
    const projectId = 'sfdd-d8a16';
    const registryId = 'Hilda';
    // lib iot core
    const iot = require('@google-cloud/iot');
    // client
    const iotClient = new iot.v1.DeviceManagerClient({
    // optional auth parameters.
    });
    // client and path of device
    const formattedName = iotClient.devicePath(
        projectId,
        cloudRegion,
        registryId,
        deviceId
    );
    // message data
    const binaryData = Buffer.from(commandMessage);
    // request
    const request = {
        name: formattedName,
        binaryData: binaryData,
    };

    try {
        const responses = await iotClient.sendCommandToDevice(request);
        console.log('Sent command: ', responses[0]);
        res.json(responses[0])
    } catch (err) {
        console.error('Could not send command:', err);
        res.json(err)
    }

    // reset some values on liveDataSets to initial states 
    db
        .doc(`/liveDataSets/${deviceId}`)
        .get()
        .then((doc) => {
            return doc.ref.update(
                { 
                    colorValues:{
                        r:0,
                        g:0,
                        b:0
                    },
                    motorSpeed: 0
                }
            )
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Something went wrong' });
        });
}

// post motor speed command in hilda device
exports.hildaPostMotorSpeedCommand = async (req, res) => {
    // req data
    const thingId = req.params.thingId;
    const motorSpeedValue = {...req.body};
    // print
    console.log(motorSpeedValue)
    // to string
    const string = JSON.stringify(motorSpeedValue);
    // global vars
    const cloudRegion = 'us-central1';
    const deviceId = thingId;
    const commandMessage = string;
    const projectId = 'sfdd-d8a16';
    const registryId = 'Hilda';
    // lib iot core
    const iot = require('@google-cloud/iot');
    // client
    const iotClient = new iot.v1.DeviceManagerClient({
    // optional auth parameters.
    });
    // client and path of device
    const formattedName = iotClient.devicePath(
        projectId,
        cloudRegion,
        registryId,
        deviceId
    );
    // message data
    const binaryData = Buffer.from(commandMessage);
    // request
    const request = {
        name: formattedName,
        binaryData: binaryData,
    };

    try {
        const responses = await iotClient.sendCommandToDevice(request);
        console.log('Sent command: ', responses[0]);
        res.json(responses[0])
    } catch (err) {
        console.error('Could not send command:', err);
        res.json(err)
    }
}

// post colors command in hilda device
exports.hildaPostColorCommand = async (req, res) => {
    // req data
    const thingId = req.params.thingId;
    const colorValues = {...req.body};
    // print
    console.log(colorValues)
    // to string
    const string = JSON.stringify(colorValues);
    // global vars
    const cloudRegion = 'us-central1';
    const deviceId = thingId;
    const commandMessage = string;
    const projectId = 'sfdd-d8a16';
    const registryId = 'Hilda';
    // lib iot core
    const iot = require('@google-cloud/iot');
    // client
    const iotClient = new iot.v1.DeviceManagerClient({
    // optional auth parameters.
    });
    // client and path of device
    const formattedName = iotClient.devicePath(
        projectId,
        cloudRegion,
        registryId,
        deviceId
    );
    // message data
    const binaryData = Buffer.from(commandMessage);
    // request
    const request = {
        name: formattedName,
        binaryData: binaryData,
    };

    try {
        const responses = await iotClient.sendCommandToDevice(request);
        console.log('Sent command: ', responses[0]);
        res.json(responses[0])
    } catch (err) {
        console.error('Could not send command:', err);
        res.json(err)
    }
}

