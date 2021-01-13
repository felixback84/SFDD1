// to measure the distance & match between users, to send a response to the thingId
// exports.detectGPSCoordsProximityRangeForStaticsAndDynamics = (inWait) => {

//     // var to hold coors object in an array of the rest
//     let coordsInLiveDataSets = [];
//     // vars to hold counters of matches in the specific gps range 
//     let counterGreen5Mts = 0;
//     let counterYellow10Mts = 0;
//     let counterRed15Mts = 0;
//     let counterFucsia20Mts = 0; 
//     let counterBlue25Mts = 0;

//     // coords of the user inline
//     let dataInDBDoc = {
//         thingId: inWait.thingId,
//         coords: inWait.coords,
//         profileToMatch: inWait.profileToMatch ///////////// to check
//     }
//     // print
//     console.log(`Data results of message inline: 
//                 coords.lat: ${dataInDBDoc.coords.lat}, 
//                 thingId: ${dataInDBDoc.thingId}, 
//                 profileToMatch: ${dataInDBDoc.profileToMatch}`
//             );

//     // db part
//     db  
//         .collectionGroup('liveDataSets')
//         .where('nameOfDevice','==','staticHeartbeat')
//         .get()
//         .then((querySnapshot) => {
//             // Do something with these reviews!
//             querySnapshot.forEach((doc) => {
//                 // push data to an array
//                 coordsInLiveDataSets.push({
//                     coords: doc.data().coords,
//                     thingId: doc.data().thingId,
//                     profileToMatch: doc.data().profileToMatch //////////////////////////////////////////// to check
//                 })
//             })
//             // print
//             console.log(`Number of statics with data in db (coordsInLiveDataSets): ${coordsInLiveDataSets.length}`); // quantity of objects
//             console.log(`Data result on the statics connected: ${JSON.stringify(coordsInLiveDataSets)}`); // [{...},{...}
//         })
//         .then(()=>{
//             // loop the results on the array
//             for(let i = 0; i < coordsInLiveDataSets.length; i++){
                
//                 function checkDistance(args){
//                     // print
//                     console.log(`args.coords: ${args.coords}`)
//                     console.log(`args: ${JSON.stringify(args)}`) 

//                     // logic to make the meassure part
//                     let R = 6371; // Radius of the earth in km
//                     let dLat = (args.coords.lat2 - args.coords.lat1) * Math.PI / 180;  // Javascript functions in radians
//                     let dLon = (args.coords.lon2 - args.coords.lon1) * Math.PI / 180; 
//                     let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//                         Math.cos(args.coords.lat1 * Math.PI / 180) * Math.cos(args.coords.lat2 * Math.PI / 180) * 
//                         Math.sin(dLon/2) * Math.sin(dLon/2); 
//                     let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//                     let d = R * c; // Distance in km
//                     let distanceInMeters = d * 1000; // Distance in mts

//                     // print
//                     console.log(`distanceInMeters to each comparasion: ${distanceInMeters}`)

//                     // make the array with the must close coords 
//                     if(distanceInMeters <= 25) {
//                         top5Coords.push({
//                             thingId: args.thingId, 
//                             coords: {
//                                 lat2: args.coords.lat2,
//                                 lon2: args.coords.lon2
//                             },
//                             profileToMatch: args.profileToMatch,
//                             meters: distanceInMeters
//                         }) 
                        
//                     } 
//                     // return in meters
//                     return distanceInMeters
//                 }
                
//                 // function to count user/devices/things in the range
//                 function metersRangeCounter(meters){
//                     if(meters >= 0 && meters <= 5){
//                         counterGreen5Mts++
//                         console.log(`counterGreen5Mts: ${counterGreen5Mts}`)
//                     } else if (meters >= 5.1 && meters <= 10){
//                         counterYellow10Mts++
//                         console.log(`counterYellow10Mts: ${counterYellow10Mts}`)
//                     } else if (meters >= 10.1 && meters <= 15){
//                         counterRed15Mts++
//                         console.log(`counterRed15Mts: ${counterRed15Mts}`)
//                     } else if (meters >= 15.1 && meters <= 20){
//                         counterFucsia20Mts++
//                         console.log(`counterFucsia20Mts: ${counterFucsia20Mts}`)
//                     } else if (meters >= 20.1 && meters <= 25){
//                         counterBlue25Mts++
//                         console.log(`counterBlue25Mts: ${counterBlue25Mts}`)
//                     }    
//                 }
                
//                 // data to pass
//                 let argz = {
//                     coords:{
//                         lon1:dataInDBDoc.coords.lon,     
//                         lat1:dataInDBDoc.coords.lat, 
//                         lon2:coordsInLiveDataSets[i].coords.lon, 
//                         lat2:coordsInLiveDataSets[i].coords.lat
//                     },
//                     profileToMatch: coordsInLiveDataSets[i].profileToMatch,
//                     thingId:coordsInLiveDataSets[i].thingId
//                 }
                
//                 // run it
//                 metersRangeCounter(checkDistance(argz)); 
//             }
//             // print it meters counters --------------> mandar el estado de los contadores todos como respuesta
//             console.log(`Results for counter of distances in - 
//                 counterGreen5Mts: ${counterGreen5Mts}, 
//                 counterYellow10Mts: ${counterYellow10Mts}, 
//                 counterRed15Mts:${counterRed15Mts}, 
//                 counterFucsia20Mts:${counterFucsia20Mts}, 
//                 counterBlue25Mts:${counterBlue25Mts}`
//             )
//             // print list top5 result
//             console.log(`Results of the list top5CoordLast: ${JSON.stringify(top5Coords)}`);

//             // func to save data of top5Coords
//             function savaData(dataToSave){
//                 // userDeviceId 
//                 const staticDeviceId = dataInDBDoc.thingId.split("-").slice(2);
//                 db
//                     .doc(`/userDevices/${staticDeviceId}`)
//                     .collection('liveDataSets')
//                     .doc(dataInDBDoc.thingId)
//                     .update({ top5Coords: top5Coords })
//                     .then(() => {
//                         console.log(dataToSave)
//                     })            
//                     .catch((err) => {
//                         console.error(err);
//                         res.status(500).json({ error: err.code });
//                     });                
//             }
//             // run it
//             savaData(top5Coords)
//         })
// }