function metersRangeCounter(meters){
    if(meters >= 0 && meters <= 5){
        let counterGreen5Mts = 0
        counterGreen5Mts++
    } else if (meters >= 5.1 && meters <= 10){
        let counterGreen10Mts = 0
        counterGreen10Mts++
    } else if (meters >= 10.1 && meters <= 15){
        let counterGreen15Mts = 0
        counterGreen15Mts++
    } else if (meters >= 15.1 && meters <= 20){
        let counterGreen20Mts = 0
        counterGreen20Mts++
    } else if (meters >= 20.1 && meters <= 25){
        let counterGreen25Mts = 0
        counterGreen25Mts++
    }    
}


/////////////////////////////////////////////////////////////////////// message to devices part
// colorValue object
// let colorToThingResponse = {
//     colorValue:{
//         r:0,
//         g:0,
//         b:0,
//     },
//     colorName:''
// }

// function to send message
async function sendCommandGPSColor(colorObj){
    // global vars
    const cloudRegion = 'us-central1';
    const deviceId = dataInDBDoc.thingId;
    const string = JSON.stringify(colorObj);
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

// color for signal in device
function colorPicker(meters){
    //x >= 0.001 && x <= 0.009
    if(meters >= 0 && meters <= 5){
        let colorToThingResponse = {cororValue:{r:1,g:2,b:3}, colorName:"green"}
        // command to thing
        sendCommandGPSColor(colorToThingResponse)
    } else if (meters >= 5.1 && meters <= 10){
        let colorToThingResponse = {cororValue:{r:4,g:5,b:6}, colorName:"yellow"}
        // command to thing
        sendCommandGPSColor(colorToThingResponse)
    } else if (meters >= 10.1 && meters <= 15){
        let colorToThingResponse = {cororValue:{r:7,g:8,b:9}, colorName:"red"}
        // command to thing
        sendCommandGPSColor(colorToThingResponse)
    } else if (meters >= 15.1 && meters <= 20){
        let colorToThingResponse = {cororValue:{r:10,g:11,b:12}, colorName:"fucsia"}
        // command to thing
        sendCommandGPSColor(colorToThingResponse)
    } else if (meters >= 20.1 && meters <= 25){
        let colorToThingResponse = {cororValue:{r:13,g:14,b:15}, colorName:"blue"}
        // command to thing
        sendCommandGPSColor(colorToThingResponse)
    }
}
// run it
colorPicker(distanceInMeters)
