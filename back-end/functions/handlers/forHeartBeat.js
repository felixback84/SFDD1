// firebase
const { db } = require('../utilities/admin');
// post active command in hild things
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

// post inactive command in hild things
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

// to get top5Coords for app
exports.heartbeatTop5CoordsData = async (req, res) => {
    db
        .doc(`/userDevices/${req.params.userDeviceId}`)
        .collection('topMatches')
        .get()
        .then((data) => {
            let topMatches = [];
            data.forEach((doc) => {
                topMatches.push({
                    topMatchesId: doc.id,
                    ...doc.data()
                });
            });
            return res.json(topMatches);
        })
        .catch((err) => console.error(err));   
}

// to measure the distance & match between users, to send a response to the thingId
exports.detectGPSCoordsProximityRange = (inWait) => {
    
    // var to hold coors object in an array
    let coordsInLiveDataSets = [];
    // list top 5
    let top5Coords = [];
    
    // vars to hold counters of matches in the specific gps range 
    let counterGreen5Mts = 0;
    let counterYellow10Mts = 0;
    let counterRed15Mts = 0;
    let counterFucsia20Mts = 0; 
    let counterBlue25Mts = 0;
    
    // qualify match
    let evaluationOfMatch = 0;
    // vars to count coincidence
    let fullMatch = 0;
    let midMatch = 0;
    let bottomMatch = 0;
    let noneMatch = 0;

    // print
    console.log(`inWait.coords to message coords inline: ${inWait.coords}`)
    console.log(`inWait to the entire message inline: ${JSON.stringify(inWait)}`)
    
    // coords of the user inline
    let dataInDBDoc = {
        thingId: inWait.thingId,
        coords: inWait.coords,
        profileToMatch: inWait.profileToMatch ///////////// to check
    }
    // print
    console.log(`Data results of message inline: 
                coords.lat: ${dataInDBDoc.coords.lat}, 
                thingId: ${dataInDBDoc.thingId}, 
                profileToMatch: ${dataInDBDoc.profileToMatch}`
            ); 
    //////////////////////////////////////////////////////////////// extract data from the rest of users
    // observer group collection part
    db
        .collectionGroup('liveDataSets')
        //.where('thingId', '!=', thingId) // a cause of the other devices
        .where('nameOfDevice','==','heartbeat')
        .get()
        .then((querySnapshot) => {
            // Do something with these reviews!
            querySnapshot.forEach((doc) => {
                // push data to array
                coordsInLiveDataSets.push({
                    coords: doc.data().coords,
                    thingId: doc.data().thingId,
                    profileToMatch: doc.data().profileToMatch //////////////////////////////////////////// to check
                })
            })
            // print
            console.log(`Number of devices with data in db (coordsInLiveDataSets): ${coordsInLiveDataSets.length}`); // quantity of objects
            console.log(`Data result on the devices connected: ${JSON.stringify(coordsInLiveDataSets)}`); // [{...},{...}]
        })
        // meassure gps coords of all the users involve
        .then(()=>{
            
            // loop the results on the array
            for(let i = 0; i < coordsInLiveDataSets.length; i++){
                
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

                    // make the array with the must close coords 
                    if(distanceInMeters <= 25) {
                        top5Coords.push({
                            thingId: args.thingId, 
                            coords: {
                                lat2: args.coords.lat2,
                                lon2: args.coords.lon2
                            },
                            profileToMatch: args.profileToMatch,
                            meters: distanceInMeters
                        }) 
                        
                    } 
                    // return in meters
                    return distanceInMeters
                }
                
                // function to count user/devices/things in the range
                function metersRangeCounter(meters){
                    if(meters >= 0 && meters <= 5){
                        counterGreen5Mts++
                        console.log(`counterGreen5Mts: ${counterGreen5Mts}`)
                    } else if (meters >= 5.1 && meters <= 10){
                        counterYellow10Mts++
                        console.log(`counterYellow10Mts: ${counterYellow10Mts}`)
                    } else if (meters >= 10.1 && meters <= 15){
                        counterRed15Mts++
                        console.log(`counterRed15Mts: ${counterRed15Mts}`)
                    } else if (meters >= 15.1 && meters <= 20){
                        counterFucsia20Mts++
                        console.log(`counterFucsia20Mts: ${counterFucsia20Mts}`)
                    } else if (meters >= 20.1 && meters <= 25){
                        counterBlue25Mts++
                        console.log(`counterBlue25Mts: ${counterBlue25Mts}`)
                    }    
                }
                
                // data to pass
                let argz = {
                    coords:{
                        lon1:dataInDBDoc.coords.lon,     
                        lat1:dataInDBDoc.coords.lat, 
                        lon2:coordsInLiveDataSets[i].coords.lon, 
                        lat2:coordsInLiveDataSets[i].coords.lat
                    },
                    profileToMatch: coordsInLiveDataSets[i].profileToMatch,
                    thingId:coordsInLiveDataSets[i].thingId
                }
                
                // check to not loop over himself    
                if(argz.thingId != dataInDBDoc.thingId){
                    // run it
                    metersRangeCounter(checkDistance(argz)) 
                } else {
                    console.log('Not possible make the comparation')
                }
            }
            
            // print it meters counters --------------> mandar el estado de los contadores todos como respuesta
            console.log(`Results for counter of distances in - 
                counterGreen5Mts: ${counterGreen5Mts}, 
                counterYellow10Mts: ${counterYellow10Mts}, 
                counterRed15Mts:${counterRed15Mts}, 
                counterFucsia20Mts:${counterFucsia20Mts}, 
                counterBlue25Mts:${counterBlue25Mts}`
            )
            // print list top5 result
            console.log(`Results of the list top5CoordLast: ${JSON.stringify(top5Coords)}`);

            // func to save data of top5Coords
            function savaData(dataToSave){
                // userDeviceId 
                const userDeviceId = dataInDBDoc.thingId.split("-").slice(2);
                db
                    .doc(`/userDevices/${userDeviceId}`)
                    .collection('liveDataSets')
                    .doc(dataInDBDoc.thingId)
                    .update({ top5Coords: top5Coords })
                    .then(() => {
                        console.log(dataToSave)
                    })            
                    .catch((err) => {
                        console.error(err);
                        res.status(500).json({ error: err.code });
                    });                
            }
            // run it
            savaData(top5Coords)
        })
        .then(()=>{
            
            // to eval the match in the selec ones of proximity
            function toCompareProfileToMatch(labels){
                // vars to receive data
                const labelsToFind = labels.labelsToFind;
                const labelsToCheck = labels.labelsToCheck;
                
                // check a full coincidence first
                // 1-1-1
                if(labelsToFind == labelsToCheck){
                    evaluationOfMatch += 3
                    fullMatch++
                // 0 - 1 - 1    
                } else if(
                    labelsToFind.luckyNumber != labelsToCheck.luckyNumber && 
                    labelsToFind.dcHero == labelsToCheck.dcHero &&
                    labelsToFind.cat == labelsToCheck.cat){
                        evaluationOfMatch += 2
                        midMatch++
                // 1 - 0 - 1 
                } else if(
                    labelsToFind.luckyNumber == labelsToCheck.luckyNumber && 
                    labelsToFind.dcHero != labelsToCheck.dcHero &&
                    labelsToFind.cat == labelsToCheck.cat){
                        evaluationOfMatch += 2
                        midMatch++
                // 1 - 1 - 0         
                } else if(
                    labelsToFind.luckyNumber == labelsToCheck.luckyNumber && 
                    labelsToFind.dcHero == labelsToCheck.dcHero &&
                    labelsToFind.cat != labelsToCheck.cat){
                        evaluationOfMatch += 2
                        midMatch++
                // 0 - 0 - 1    
                } else if(
                    labelsToFind.luckyNumber != labelsToCheck.luckyNumber && 
                    labelsToFind.dcHero != labelsToCheck.dcHero &&
                    labelsToFind.cat == labelsToCheck.cat){
                        evaluationOfMatch += 1
                        bottomMatch++
                // 0 - 1 - 0     
                } else if(
                    labelsToFind.luckyNumber != labelsToCheck.luckyNumber && 
                    labelsToFind.dcHero == labelsToCheck.dcHero &&
                    labelsToFind.cat != labelsToCheck.cat){
                        evaluationOfMatch += 1
                        bottomMatch++
                // 1 - 0 - 0         
                } else if(
                    labelsToFind.luckyNumber == labelsToCheck.luckyNumber && 
                    labelsToFind.dcHero != labelsToCheck.dcHero &&
                    labelsToFind.cat != labelsToCheck.cat){
                        evaluationOfMatch += 1
                        bottomMatch++
                // 0 - 0 - 0        
                } else if(
                    labelsToFind.luckyNumber != labelsToCheck.luckyNumber && 
                    labelsToFind.dcHero != labelsToCheck.dcHero &&
                    labelsToFind.cat != labelsToCheck.cat){
                        evaluationOfMatch = 0
                        noneMatch++
                }
            }

            // run it
            for(let i = 0; i < top5Coords.length; i++){
                // var to pass in obj comparer
                let labelz = {
                    labelsToFind: dataInDBDoc.profileToMatch,
                    labelsToCheck: top5Coords[i].profileToMatch
                }
                // check to ensure
                if(top5Coords != 0){
                    toCompareProfileToMatch(labelz);
                } else {
                    console.log('Not items in top5Coords')
                }
            }

            // print
            console.log(`Results for match in - 
                evaluationOfMatch: ${evaluationOfMatch},
                fullMatch: ${fullMatch},
                midMatch: ${midMatch},
                bottomMatch: ${bottomMatch},
                noneMatch: ${noneMatch}`
            )
        })
        //////////////////////////////////////////////////////////////// res message part to device
        .then(()=>{
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

            // color to send to device
            function colorPicker(){
                //x >= 0.001 && x <= 0.009
                if(countersObj.counterGreen5Mts >= 1){
                    let colorToThingResponse = {
                        colorValue:{r:1,g:2,b:3}, 
                        colorName:"green", 
                        profileMatchQualify: evaluationOfMatch
                    }
                    // command to thing -------------------> enviar solo cuando se haya recorrido las lista top5Coords
                    sendCommandGPSColor(colorToThingResponse)
                } else if (countersObj.counterYellow10Mts >= 1){
                    let colorToThingResponse = {
                        colorValue:{r:4,g:5,b:6}, 
                        colorName:"yellow", 
                        profileMatchQualify: evaluationOfMatch
                    }
                    // command to thing
                    sendCommandGPSColor(colorToThingResponse)
                } else if (countersObj.counterRed15Mts >= 1){
                    let colorToThingResponse = {
                        colorValue:{r:7,g:8,b:9}, 
                        colorName:"red", 
                        profileMatchQualify: evaluationOfMatch
                    }
                    // command to thing
                    sendCommandGPSColor(colorToThingResponse)
                } else if (countersObj.counterFucsia20Mts >= 1){
                    let colorToThingResponse = {
                        colorValue:{r:10,g:11,b:12}, 
                        colorName:"fucsia", 
                        profileMatchQualify:  
                        evaluationOfMatch
                    }
                    // command to thing
                    sendCommandGPSColor(colorToThingResponse)
                } else if (countersObj.counterBlue25Mts >= 1){
                    let colorToThingResponse = {
                        colorValue:{r:13,g:14,b:15}, 
                        colorName:"blue", 
                        profileMatchQualify: evaluationOfMatch
                    }
                    // command to thing
                    sendCommandGPSColor(colorToThingResponse)
                }
            }
            // obj with counters state
            let countersObj = {
                counterGreen5Mts,
                counterYellow10Mts,
                counterRed15Mts,
                counterFucsia20Mts, 
                counterBlue25Mts
            }
            // run it
            colorPicker(countersObj);
        })
        .catch((err) => {
            console.error(err);
        });     
}



