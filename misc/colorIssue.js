 // .then(()=>{
    //     // db save mts results part ----------------------------> Not sure about this yet
    //     // userDeviceId
    //     const userDeviceId = inWait.thingId.split("-").slice(2).toString();
        
    //     // connect with doc
    //     let dbDataFromLiveDataSets = db
    //         .doc(`/userDevices/${userDeviceId}`)
    //         .collection('liveDataSets')
    //         .doc(inWait.thingId)
        
    //     // update mts in profileMatches
    //     dbDataFromLiveDataSets
    //         .update({
    //             mtsBetweenDevices:mtsBetweenDevices
    //         })
        
    //     // get doc after update
    //     dbDataFromLiveDataSets.get()
    //     // run it
    //     for(let i = 0; i < dbDataFromLiveDataSets.length; i++){
    //         colorPicker(dbDataFromLiveDataSets[i].mtsBetweenDevices,inWait.thingId)
    //     }
    // })


    // color to send to device
function colorPicker(countersObj, thingId){
    //x >= 0.001 && x <= 0.009
    if(countersObj.counterGreen5Mts >= 1){
        let colorToThingResponse = {
            colorValue:{r:1,g:2,b:3}, 
            colorName:"green", 
            thingId: thingId,
        }
        sendCommandGPSColor(colorToThingResponse)
    } else if (countersObj.counterYellow10Mts >= 1){
        let colorToThingResponse = {
            colorValue:{r:4,g:5,b:6}, 
            colorName:"yellow", 
            thingId: thingId
        }
        // command to thing
        sendCommandGPSColor(colorToThingResponse)
    } else if (countersObj.counterRed15Mts >= 1){
        let colorToThingResponse = {
            colorValue:{r:7,g:8,b:9}, 
            colorName:"red", 
            thingId: thingId
        }
        // command to thing
        sendCommandGPSColor(colorToThingResponse)
    } else if (countersObj.counterFucsia20Mts >= 1){
        let colorToThingResponse = {
            colorValue:{r:10,g:11,b:12}, 
            colorName:"fucsia", 
            thingId: thingId
        }
        // command to thing
        sendCommandGPSColor(colorToThingResponse)
    } else if (countersObj.counterBlue25Mts >= 1){
        let colorToThingResponse = {
            colorValue:{r:13,g:14,b:15}, 
            colorName:"blue", 
            thingId: thingId
        }
        // command to thing
        sendCommandGPSColor(colorToThingResponse)
    }
}



    // function to count static things in the range
// function metersRangeCounter(meters){
//     // vars to hold counters of matches in the specific gps range 
//     let counterGreen5Mts = 0;
//     let counterYellow10Mts = 0;
//     let counterRed15Mts = 0;
//     let counterFucsia20Mts = 0; 
//     let counterBlue25Mts = 0;
//     // check ranges
//     if(meters >= 0 && meters <= 5){
//         counterGreen5Mts++
//         console.log(`counterGreen5Mts: ${counterGreen5Mts}`)
//     } else if (meters >= 5.1 && meters <= 10){
//         counterYellow10Mts++
//         console.log(`counterYellow10Mts: ${counterYellow10Mts}`)
//     } else if (meters >= 10.1 && meters <= 15){
//         counterRed15Mts++
//         console.log(`counterRed15Mts: ${counterRed15Mts}`)
//     } else if (meters >= 15.1 && meters <= 20){
//         counterFucsia20Mts++
//         console.log(`counterFucsia20Mts: ${counterFucsia20Mts}`)
//     } else if (meters >= 20.1 && meters <= 25){
//         counterBlue25Mts++
//         console.log(`counterBlue25Mts: ${counterBlue25Mts}`)
//     }  
    
//     // obj with results data
//     const resultCountersMts = {
//         counterGreen5Mts,
//         counterYellow10Mts,
//         counterRed15Mts,
//         counterFucsia20Mts, 
//         counterBlue25Mts,
//     }
//     // print
//     console.log(`resultCountersMts: ${JSON.stringify(resultCountersMts)}`)
//     // return
//     return resultCountersMts
// }

// // measure distance between userdevices and staticdevices
// exports.detectGPSCoordsProximityRangeToHearbeats = async (inWait) => {
//     // var to hold mtsBetweenDevices
//     let mtsBetweenDevices = [];
//     let varFunc = undefined;
//     // print
//     console.log(`inWait complete data from DB "liveDataSets": ${JSON.stringify(inWait)}`)
    
//         // loop the results on the array
//         for(let i = 0; i < inWait.top5Coords.length; i++){
//             // func to meassure dstance between given coords
//             function checkDistance(args){
//                 // print
//                 console.log(`args: ${JSON.stringify(args)}`)
//                 console.log(`args.coords: ${JSON.stringify(args.coordsInEval)}`)
//                 // logic to make the meassure part
//                 let R = 6371; // Radius of the earth in km
//                 let dLat = (args.coordsInEval.latStaticDevices - args.coordsInEval.latUserDevice) * Math.PI / 180;  // Javascript functions in radians
//                 let dLon = (args.coordsInEval.lonStaticDevices - args.coordsInEval.lonUserDevice) * Math.PI / 180; 
//                 let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//                     Math.cos(args.coordsInEval.latStaticDevices * Math.PI / 180) * Math.cos(args.coordsInEval.latUserDevice * Math.PI / 180) * 
//                     Math.sin(dLon/2) * Math.sin(dLon/2); 
//                 let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//                 let d = R * c; // Distance in km
//                 let distanceInMeters = d * 1000; // Distance in m

//                 // print
//                 console.log(`distanceInMeters to each comparasion: ${distanceInMeters}`);
//                 // push data to mtsBetweenDevices vart
//                 mtsBetweenDevices.push({
//                     thingId: args.thingsIds.thingIdStatics, 
//                     meters: distanceInMeters
//                 })
//                 // print
//                 console.log(`data in list mtsBetweenDevices: ${mtsBetweenDevices}`);
//                 // return in meters
//                 return distanceInMeters
//             }  
//             // data to pass it
//             let argz = {
//                 coordsInEval:{
//                     lonUserDevice:inWait.coords.lon,     
//                     latUserDevice:inWait.coords.lat, 
//                     lonStaticDevices:inWait.top5Coords[i].coords.lon, 
//                     latStaticDevices:inWait.top5Coords[i].coords.lat,
//                 },
//                 thingsIds:{
//                     thingIdStatics:inWait.top5Coords[i].thingId,
//                     thingIdDynamic:inWait.thingId
//                 }
//             }
//             // run it all-----> run also the color command function to thing
//             //varFunc = await metersRangeCounter(checkDistance(argz));
//             // await colorPicker(await metersRangeCounter(await checkDistance(argz)),inWait.thingId);
//             //await metersRangeCounter(await checkDistance(argz))
//             let one = await checkDistance(argz);
//         }
        
//         // const results = await varFunc;
//         // colorPicker(results,inWait.thingId);   
// }