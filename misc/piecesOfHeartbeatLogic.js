// var to hold coors object in an array
// let coordsInLiveDataSets = []
// list top 5
// let top5Coord = []
// observer group collection part
// const userDevicesRef = db.collection('userDevices');
// const populationQueryRes = await userDevicesRef.where('deviceId', '==', 'AdPadmSiw6GnVggUAj51').get();
// const liveDataSetsRef = await userDevicesRef.collection('liveDataSets');
// const stateQueryRes = await liveDataSetsRef.where('thingId', '!=', thingId).get()
// const nameQueryRes = await liveDataSetsRef.where('active', '==', 'true').get();

// const userDevicesRef = db.collection('userDevices');
// const userDevicesRefWithId = await userDevicesRef.where('deviceId', '==', 'AdPadmSiw6GnVggUAj51').get();


userDevicesRefWithId
    //     .collectionGroup('liveDataSets')
    //     .where('thingId', '!=', thingId)
    //     .get()
    //     .then((querySnapshot) => {
    //         // Do something with these reviews!
    //         querySnapshot.forEach((doc) => {
    //             coordsInLiveDataSets.push({
    //                 coords: doc.data().coords,
    //                 thingId: doc.data().thingId
    //             })
    //         })
    //         // print
    //         console.log(`coordsInLiveDataSets: ${coordsInLiveDataSets.length}`); // [object Object]
    //         console.log(JSON.stringify(coordsInLiveDataSets)); // [object Object]
            
    //     })


/////////////////////////////////////////////////////////////////////////////////// measure part
.then(()=>{
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
            let distanceInMeters = d * 100; // Distance in mts
            
            // make the array with the must close coords
            if(distanceInMeters <= 5) {
                top5Coord.push({
                    thingId: args.thingId, 
                    coords: args.coords,
                    meters: d
                })
            } else if(distanceInMeters <= 10) {
                top5Coord.push({
                    thingId: args.thingId, 
                    coords: args.coords,
                    meters: d
                })
            }else if(distanceInMeters <= 15) {
                top5Coord.push({
                    thingId: args.thingId, 
                    coords: args.coords,
                    meters: d
                })
            }else if(distanceInMeters <= 20) {
                top5Coord.push({
                    thingId: args.thingId, 
                    coords: args.coords,
                    meters: d
                })
            }else if(distanceInMeters <= 25) {
                top5Coord.push({
                    thingId: args.thingId, 
                    coords: args.coords,
                    meters: d
                })
            }
            // print
            console.log(`top5Coord: ${top5Coord}`);
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
            'hi distance:' + checkDistance(args)
        );
    }
// send feedback to waiting response user

})
.catch((err) => {
    console.error(err);
});



let listOfDataFromHeartbeatUserDevices = [];
                    // reach data from the specific devices group
                    let dataTest = async () => { 
                        const userDevicesRef = await db.collection('userDevices')
                        const userDevicesRefWithId = await userDevicesRef.where('deviceId', '==', 'AdPadmSiw6GnVggUAj51')
                        .get()
                        .then((data)=>{
                            // Do something with these reviews!
                            data.forEach((doc) => {
                                listOfDataFromHeartbeatUserDevices.push({
                                    active: doc.data().active,
                                    thingId: doc.data().thingId
                                })
                            })
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                        // print
                        console.log(`dataFromUserDevices: ${JSON.stringify(listOfDataFromHeartbeatUserDevices)}`);
                    }
                    // run it
                    dataTest()



                    // filter to extract just the heartbeat devices
                        // .then((data)=>{
                        //     filterCoordsOfRest = data.filter((thingId)=>{
                        //         thingId == 'AdPadmSiw6GnVggUAj51'
                        //     })
                        //     // print
                        //     console.log(`filterCoordsOfRest: ${filterCoordsOfRest}`);
                        // })



                        // // print
                            // console.log(`coordsInLiveDataSets: ${coordsInLiveDataSets.length}`); // [object Object]
                            // console.log(JSON.stringify(coordsInLiveDataSets)); // [object Object]
                            // // result
                            // filterCoordsOfRest = coordsInLiveDataSets.filter((coordsInLiveDataSet)=>{
                            //     return coordsInLiveDataSet.thingId == 'AdPadmSiw6GnVggUAj51';
                                
                            // })
                            // // print
                            // .then(()=>{
                            //     console.log(`filterCoordsOfRest: ${filterCoordsOfRest.length}`);
                            // })
                            // filter to extract just the heartbeat devices


                            .then(()=>{
                                // loop the results on the array
                                coordsInLiveDataSets.forEach(function checkDistance(args) {
                                    // measure distance GPS func
                                    let R = 6371; // Radius of the earth in km
                                    let dLat = (args.coords.lat2 - args.coords.lat1).toRad();  // Javascript functions in radians
                                    let dLon = (args.coords.lon2 - args.coords.lon1).toRad(); 
                                    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                                            Math.cos(args.coords.lat1.toRad()) * Math.cos(args.coords.lat2.toRad()) * 
                                            Math.sin(dLon/2) * Math.sin(dLon/2); 
                                    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
                                    let d = R * c; // Distance in km
                                    let distanceInMeters = d * 100; // Distance in mts
                                    
    
                                    // make the array with the must close coords
                                    if(distanceInMeters <= 5) {
                                        top5Coord.push({
                                            thingId: args.thingId, 
                                            coords: args.coords,
                                            meters: d
                                        })
                                    } else if(distanceInMeters <= 10) {
                                        top5Coord.push({
                                            thingId: args.thingId, 
                                            coords: args.coords,
                                            meters: d
                                        })
                                    } else if(distanceInMeters <= 15) {
                                        top5Coord.push({
                                            thingId: args.thingId, 
                                            coords: args.coords,
                                            meters: d
                                        })
                                    } else if(distanceInMeters <= 20) {
                                        top5Coord.push({
                                            thingId: args.thingId, 
                                            coords: args.coords,
                                            meters: d
                                        })
                                    } else if(distanceInMeters <= 25) {
                                        top5Coord.push({
                                            thingId: args.thingId, 
                                            coords: args.coords,
                                            meters: d
                                        })
                                    }
                                    // print
                                    console.log(`top5Coord: ${top5Coord}`);
                                })
    
                                // Converts numeric degrees to radians */
                                if (typeof(Number.prototype.toRad) === "undefined") {
                                        Number.prototype.toRad = function() {
                                        return this * Math.PI / 180;
                                    }
                                }  
    
                                // user whait for answer
                                let latUserInLine = dataInDBDoc.coords.lat;
                                let lonUserInLine = dataInDBDoc.coords.lon;
    
                                // user whait for answer
                                // let latArrayCoordsInDB = coordsInLiveDataSets[i].coords.lat;
                                // let lonArrayCoordsInDB = coordsInLiveDataSets[i].coords.lon;
    
                                
                                let latArrayCoordsInDB = -74.0702393;
                                let lonArrayCoordsInDB = 4.6348774;
    
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
                                  ///});
                                // for(let i = 0; i < coordsInLiveDataSets.length; i++){
                                //     // measure distance GPS func
                                //     function checkDistance(args) {
                                //         let R = 6371; // Radius of the earth in km
                                //         let dLat = (args.coords.lat2 - args.coords.lat1).toRad();  // Javascript functions in radians
                                //         let dLon = (args.coords.lon2 - args.coords.lon1).toRad(); 
                                //         let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                                //                 Math.cos(args.coords.lat1.toRad()) * Math.cos(args.coords.lat2.toRad()) * 
                                //                 Math.sin(dLon/2) * Math.sin(dLon/2); 
                                //         let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
                                //         let d = R * c; // Distance in km
                                //         let distanceInMeters = d * 100; // Distance in mts
                                        
    
                                //         // make the array with the must close coords
                                //         if(distanceInMeters <= 5) {
                                //             top5Coord.push({
                                //                 thingId: args.thingId, 
                                //                 coords: args.coords,
                                //                 meters: d
                                //             })
                                //         } else if(distanceInMeters <= 10) {
                                //             top5Coord.push({
                                //                 thingId: args.thingId, 
                                //                 coords: args.coords,
                                //                 meters: d
                                //             })
                                //         } else if(distanceInMeters <= 15) {
                                //             top5Coord.push({
                                //                 thingId: args.thingId, 
                                //                 coords: args.coords,
                                //                 meters: d
                                //             })
                                //         } else if(distanceInMeters <= 20) {
                                //             top5Coord.push({
                                //                 thingId: args.thingId, 
                                //                 coords: args.coords,
                                //                 meters: d
                                //             })
                                //         } else if(distanceInMeters <= 25) {
                                //             top5Coord.push({
                                //                 thingId: args.thingId, 
                                //                 coords: args.coords,
                                //                 meters: d
                                //             })
                                //         }
                                //         // print
                                //         console.log(`top5Coord: ${top5Coord}`);
                                //     }
    
                                //     // Converts numeric degrees to radians */
                                //     if (typeof(Number.prototype.toRad) === "undefined") {
                                //             Number.prototype.toRad = function() {
                                //             return this * Math.PI / 180;
                                //         }
                                //     }   
    
                                //     // user whait for answer
                                //     let latUserInLine = dataInDBDoc.coords.lat;
                                //     let lonUserInLine = dataInDBDoc.coords.lon;
    
                                //     // user whait for answer
                                //     // let latArrayCoordsInDB = coordsInLiveDataSets[i].coords.lat;
                                //     // let lonArrayCoordsInDB = coordsInLiveDataSets[i].coords.lon;
    
                                    
                                //     let latArrayCoordsInDB = -74.0702393;
                                //     let lonArrayCoordsInDB = 4.6348774;
    
                                //     // data to pass
                                //     let args = {
                                //         coords:{
                                //             lon1:lonUserInLine, 
                                //             lat1:latUserInLine, 
                                //             lon2:lonArrayCoordsInDB, 
                                //             lat2:latArrayCoordsInDB
                                //         },
                                //         thingId:thingId
                                //     }
    
                                //     // print
                                //     console.log(
                                //         'hi distance:' + checkDistance(args)
                                //     );
                                // }
                            /////////////////////////


                            /////////////////////////////////////////////////////// until here the message bus part to specific db doc, from here all is for heartbeat devices
            if(nameOfDevice == "Heartbeat"){
                return dbDataFromLiveDataSets
                .get()
                ////////////////////////////////////////// extract asap the data from the coords in the message from the user in line
                .then((doc)=>{ 
                    // coords
                    let dataInDBDoc = {
                        thingId: doc.data().thingId,
                        coords:{
                            lat: doc.data().coords.lat,
                            lon: doc.data().coords.lon
                        }
                    }
                    // print
                    console.log(`coords.lat: ${dataInDBDoc.coords.lat}, coords.thingId: ${dataInDBDoc.thingId}`); 
                    //////////////////////////////////////////////////////////////// extract data from the rest of users
                    // var to hold coors object in an array
                    let coordsInLiveDataSets = [];
                    // list top 5
                    let top5Coord = [];
                    // observer group collection part
                    db
                        .collectionGroup('liveDataSets')
                        .where('thingId', '!=', thingId)
                        .get()
                        .then((querySnapshot) => {
                            // Do something with these reviews!
                            querySnapshot.forEach((doc) => {
                                // push data to array
                                coordsInLiveDataSets.push({
                                    coords: doc.data().coords,
                                    thingId: doc.data().thingId
                                })
                            })
                            // print
                            console.log(`coordsInLiveDataSets: ${coordsInLiveDataSets.length}`); // quantity of objects
                            console.log(JSON.stringify(coordsInLiveDataSets)); // [{...},{...}]
                        })
                        /////////////////////////////////////////////////////////////////////////////////// measure part
                        ////////////////////////////////////////////////////////// send feedback to waiting response user

                        })
                        .catch((err) => {
                            console.error(err);
                        });
                    })    
            }

        })

        // // firebase
// const { db } = require('../utilities/admin');
// const functions = require('firebase-functions');

// exports.detectGPSCoordsProximityRange = functions.firestore
//     .document('userDevices/{userDevicesId}')
//     //.collection('liveDataSets')
//     //.where('deviceId','==', 'AdPadmSiw6GnVggUAj51')
//     .onUpdate((snap) => {
//         // grab data from firebase snapshot
//         const userDeviceLiveDataSetsInfo = snap.data();
//         console.log(userDeviceLiveDataSetsInfo);
//         // thingId
//         let thingId = userDeviceLiveDataSetsInfo.thingId
//         // get user coords data from his own liveDataSets collection
//         let coords = {
//             lat: userDeviceLiveDataSetsInfo.coords.lat,
//             lon: userDeviceLiveDataSetsInfo.coords.lon
//         }
//         // var to hold coors object in an array
//         let coordsInLiveDataSets = []
//         // list top 5
//         let top5Coord = []
//         // check to all docs
//         const userDevicesCollect = db
//             .collection('userDevices')
//             .where('deviceId','==', 'AdPadmSiw6GnVggUAj51')
//             .where('thingId','!=',thingId)
//             .get()
//         // fill the array with all the coords
//         userDevicesCollect
//             .collection('liveDataSets')
//             .get()
//             // filter more fit abput the range in coord
//             .then((data)=>{
//                 data.forEach((doc) => {
//                     coordsInLiveDataSets.push({
//                         coords: doc.data().coords,
//                         thingId: doc.data().thingId
//                     })
//                 })
//             }).then(()=>{
//                 // loop the results on the array
//                 for(let i = 0; i < coordsInLiveDataSets.length; i++){
//                     // measure distance GPS func
//                     const checkDistance = (args) => {
//                         let R = 6371; // Radius of the earth in km
//                         let dLat = (args.coords.lat2-args.coords.lat1).toRad();  // Javascript functions in radians
//                         let dLon = (args.coords.lon2-args.coords.lon1).toRad(); 
//                         let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//                                 Math.cos(args.coords.lat1.toRad()) * Math.cos(args.coords.lat2.toRad()) * 
//                                 Math.sin(dLon/2) * Math.sin(dLon/2); 
//                         let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//                         let d = R * c; // Distance in km
                        
//                         // make the array with the must close coords
//                         if(d <= 5) {
//                             top5Coord.push({
//                                 thingId: args.thingId, 
//                                 coords: args.coords,
//                                 meters: d
//                             })
//                         } else if(d <= 10) {
//                             top5Coord.push({
//                                 thingId: args.thingId, 
//                                 coords: args.coords,
//                                 meters: d
//                             })
//                         }else if(d <= 15) {
//                             top5Coord.push({
//                                 thingId: args.thingId, 
//                                 coords: args.coords,
//                                 meters: d
//                             })
//                         }else if(d <= 20) {
//                             top5Coord.push({
//                                 thingId: args.thingId, 
//                                 coords: args.coords,
//                                 meters: d
//                             })
//                         }else if(d <= 25) {
//                             top5Coord.push({
//                                 thingId: args.thingId, 
//                                 coords: args.coords,
//                                 meters: d
//                             })
//                         }
                        
//                     }

//                     /** Converts numeric degrees to radians */
//                     if (typeof(Number.prototype.toRad) === "undefined") {
//                             Number.prototype.toRad = function() {
//                             return this * Math.PI / 180;
//                         }
//                     }

//                     // user whait for answer
//                     let latUserInLine = coords.lat;
//                     let lonUserInLine = coords.lon;

//                     // user whait for answer
//                     let latArrayCoordsInDB = coordsInLiveDataSets[i].coords.lat;
//                     let lonArrayCoordsInDB = coordsInLiveDataSets[i].coords.lon;

//                     // data to pass
//                     let args = {
//                         coords:{
//                             lon1:lonUserInLine, 
//                             lat1:latUserInLine, 
//                             lon2:lonArrayCoordsInDB, 
//                             lat2:latArrayCoordsInDB
//                         },
//                         thingId:thingId
//                     }

//                     // print
//                     console.log(
//                         'hi' + checkDistance(args)
//                     );
//                 }
//             })
//             // send feedback to waiting response user
//             .then(async () => {
//                 // global vars
//                 const cloudRegion = 'us-central1';
//                 const deviceId = thingId;
//                 const commandMessage = top5Coord;
//                 // const commandMessage = activeValue;
//                 const projectId = 'sfdd-d8a16';
//                 const registryId = 'Hilda';
//                 // lib iot core
//                 const iot = require('@google-cloud/iot');
//                 // client
//                 const iotClient = new iot.v1.DeviceManagerClient({
//                 // optional auth parameters.
//                 });
//                 // client and path of device
//                 const formattedName = iotClient.devicePath(
//                     projectId,
//                     cloudRegion,
//                     registryId,
//                     deviceId
//                 );
//                 // message data
//                 const binaryData = Buffer.from(commandMessage);
//                 // request
//                 const request = {
//                     name: formattedName,
//                     binaryData: binaryData,
//                 };
//                 // send
//                 try {
//                     const responses = await iotClient.sendCommandToDevice(request);
//                     console.log('Sent command: ', responses[0]);
//                     res.json(responses[0])
//                 } catch (err) {
//                     console.error('Could not send command:', err);
//                     res.json(err)
//                 }
//             })
//             .catch((err) => console.error(err));
//     })   