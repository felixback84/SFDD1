// gps
exports.detectGPSCoordsProximityRange = firebase
    .firestore()
    .collection('liveDataSets')
    .where('thingId', '==', 'CarlosTal84-Heartbeat-PT44TQIpPyLJXRBqXZAQ')
    .get()
    .then(function (querySnapshot) {
    // Do something with these reviews!
        console.log(querySnapshot)
    })
.document('userDevices/{userDevicesId}')
    .document('liveDataSets/{liveDataSetsId}')
    .collection('liveDataSets')
    .document('liveDataSets/CarlosTal84-Heartbeat-PT44TQIpPyLJXRBqXZAQ')
    //.where('deviceId','==', 'AdPadmSiw6GnVggUAj51')
    .onUpdate((change, context) => {
        // grab data from firebase snapshot
        const userDeviceLiveDataSetsInfo = change.after.data();
        //const userDeviceLiveDataSetsInfo = snap.data();
        console.log(`hi from gps: ${userDeviceLiveDataSetsInfo}`);
        // // thingId
        let thingId = userDeviceLiveDataSetsInfo.thingId
        // get user coords data from his own liveDataSets collection
        let coords = {
            lat: userDeviceLiveDataSetsInfo.coords.lat,
            lon: userDeviceLiveDataSetsInfo.coords.lon
        }
        // var to hold coors object in an array
        let coordsInLiveDataSets = []
        // list top 5
        let top5Coord = []
        // check to all docs
        const userDevicesCollect = db
            .collection('userDevices')
            .where('deviceId','==', 'AdPadmSiw6GnVggUAj51')
            .where('thingId','!=',thingId)
            .get()
        // fill the array with all the coords
        userDevicesCollect
            .collection('liveDataSets')
            .get()
            // filter more fit abput the range in coord
            .then((data)=>{
                data.forEach((doc) => {
                    coordsInLiveDataSets.push({
                        coords: doc.data().coords,
                        thingId: doc.data().thingId
                    })
                })
            }).then(()=>{
                // loop the results on the array
                for(let i = 0; i < coordsInLiveDataSets.length; i++){
                    // measure distance GPS func
                    const checkDistance = (args) => {
                        let R = 6371; // Radius of the earth in km
                        let dLat = (args.coords.lat2-args.coords.lat1).toRad();  // Javascript functions in radians
                        let dLon = (args.coords.lon2-args.coords.lon1).toRad(); 
                        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                                Math.cos(args.coords.lat1.toRad()) * Math.cos(args.coords.lat2.toRad()) * 
                                Math.sin(dLon/2) * Math.sin(dLon/2); 
                        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
                        let d = R * c; // Distance in km
                        
                        // make the array with the must close coords
                        if(d <= 5) {
                            top5Coord.push({
                                thingId: args.thingId, 
                                coords: args.coords,
                                meters: d
                            })
                        } else if(d <= 10) {
                            top5Coord.push({
                                thingId: args.thingId, 
                                coords: args.coords,
                                meters: d
                            })
                        }else if(d <= 15) {
                            top5Coord.push({
                                thingId: args.thingId, 
                                coords: args.coords,
                                meters: d
                            })
                        }else if(d <= 20) {
                            top5Coord.push({
                                thingId: args.thingId, 
                                coords: args.coords,
                                meters: d
                            })
                        }else if(d <= 25) {
                            top5Coord.push({
                                thingId: args.thingId, 
                                coords: args.coords,
                                meters: d
                            })
                        }
                        
                    }

                    /** Converts numeric degrees to radians */
                    if (typeof(Number.prototype.toRad) === "undefined") {
                            Number.prototype.toRad = function() {
                            return this * Math.PI / 180;
                        }
                    }

                    // user whait for answer
                    let latUserInLine = coords.lat;
                    let lonUserInLine = coords.lon;

                    // user whait for answer
                    let latArrayCoordsInDB = coordsInLiveDataSets[i].coords.lat;
                    let lonArrayCoordsInDB = coordsInLiveDataSets[i].coords.lon;

                    // data to pass
                    let args = {
                        coords:{
                            lon1:lonUserInLine, 
                            lat1:latUserInLine, 
                            lon2:lonArrayCoordsInDB, 
                            lat2:latArrayCoordsInDB
                        },
                        thingId:thingId
                    }

                    // print
                    console.log(
                        'hi' + checkDistance(args)
                    );
                }
            })
            // send feedback to waiting response user
            .then(async () => {
                // global vars
                const cloudRegion = 'us-central1';
                const deviceId = thingId;
                const commandMessage = top5Coord;
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
                // send
                try {
                    const responses = await iotClient.sendCommandToDevice(request);
                    console.log('Sent command: ', responses[0]);
                    res.json(responses[0])
                } catch (err) {
                    console.error('Could not send command:', err);
                    res.json(err)
                }
            })
            .catch((err) => console.error(err));

    })  