// measure distance between userdevices and staticdevices
exports.detectGPSCoordsProximityRangeToHearbeats = (inWait) => {
    // print
    console.log(`inWait.coords to message coords inline: ${inWait.coords}`)
    console.log(`inWait to the entire message inline: ${JSON.stringify(inWait)}`)
    // loop the results on the array
    for(let i = 0; i < coordsInLiveDataSets.length; i++){
        // func to meassure dstance between given coords
        function checkDistance(args){
            // print
            console.log(`args.coords: ${args.coords}`)
            console.log(`args: ${JSON.stringify(args)}`)
            // logic to make the meassure part
            let R = 6371; // Radius of the earth in km
            let dLat = (args.coords.lat2 - args.coords.lat1) * Math.PI / 180;  // Javascript functions in radians
            let dLon = (args.coords.lon2 - args.coords.lon1) * Math.PI / 180; 
            let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(args.coords.lat1 * Math.PI / 180) * Math.cos(args.coords.lat2 * Math.PI / 180) * 
                Math.sin(dLon/2) * Math.sin(dLon/2); 
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            let d = R * c; // Distance in km
            let distanceInMeters = d * 1000; // Distance in m

            // print
            console.log(`distanceInMeters to each comparasion: ${distanceInMeters}`)
            // return in meters
            return distanceInMeters
        }  
        // data to pass it
        let argz = {
            coords:{
                lonUserDevice:inWait.coords.lon,     
                latUserDevice:inWait.coords.lat, 
                lonStaticDevices:inWait.top5Cooords[i].coords.lon, 
                latStaticDevices:inWait.top5Cooords[i].coords.lat
            },
            thingId:inWait.top5Cooords[i].thingId
        }
        // run it
        checkDistance(argz)     
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

