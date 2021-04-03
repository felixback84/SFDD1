// send color message to hearbeats
exports.sendCommandGPSColor = async (colorAndMotorObj,thingId) => {
    // global vars
    const cloudRegion = 'us-central1';
    const deviceId = thingId;
    const string = JSON.stringify(colorAndMotorObj);
    const commandMessage = string;
    const projectId = 'sfdd-d8a16';
    const registryId = 'Heartbeat';
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
        //res.json(responses[0])
    } catch (err) {
        console.error('Could not send command:', err);
        //res.json(err)
    }
}

// post active command in heartbeat things
exports.heartbeatPostActiveCommand = async (req, res) => {
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
    const projectId = 'sfdd-d8a16'; 
    const registryId = 'Heartbeat';
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

// post inactive command in heartbeat things
exports.heartbeatPostInactiveCommand = async (req, res) => {
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
    const registryId = 'Heartbeat';
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

// let it know trouhgt a command send to the thing the disable data publish
exports.heartbeatPostToDisablePublishTelemetry = async (stateOfTelemetryDisabled,theThingId) => {
    // req data
    const thingId = theThingId;
    const disabledPublishTelemetry = {disabledTelemetry:stateOfTelemetryDisabled};
    // print
    console.log(disabledPublishTelemetry)
    // to string
    const string = JSON.stringify(disabledPublishTelemetry);
    // global vars
    const cloudRegion = 'us-central1';
    const deviceId = thingId;
    const commandMessage = string;
    const projectId = 'sfdd-d8a16';
    const registryId = 'Heartbeat';
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
        //res.json(responses[0])
    } catch (err) {
        console.error('Could not send command:', err);
        //res.json(err)
    }
}  

// let it know trouhgt a command send to the thing the disable data publish
exports.heartbeatPostToEneablePublishTelemetry = async (stateOfTelemetryDisabled,theThingId) => {
    // req data
    const thingId = theThingId;
    const disabledPublishTelemetry = {disabledTelemetry:stateOfTelemetryDisabled};
    // print
    console.log(disabledPublishTelemetry)
    // to string
    const string = JSON.stringify(disabledPublishTelemetry);
    // global vars
    const cloudRegion = 'us-central1';
    const deviceId = thingId;
    const commandMessage = string;
    const projectId = 'sfdd-d8a16';
    const registryId = 'Heartbeat';
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
        //res.json(responses[0])
    } catch (err) {
        console.error('Could not send command:', err);
        //res.json(err)
    }
}  


