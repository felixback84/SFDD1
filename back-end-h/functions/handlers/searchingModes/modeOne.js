// firebase
const { db } = require('../../utilities/admin')
//_
const { forEach } = require('underscore');

///////////////////////////////////////////// SETTINGS TO THING FROM UX //////////////////////////////////////////////////
// pass data of statics users means profileToMatch
exports.postProfileToMatchUserDevices = (req,res) => {
    // profile of dynamic
    let profileToSearchOfDynamicData = req.body;
    // db part
    // userDeviceId 
    const userDeviceId = profileToSearchOfDynamicData.objWithProfileToSearchOfDynamic.thingId.split("-").slice(2);
    db
        .doc(`/userDevices/${userDeviceId}`)
        .collection('liveDataSets')
        .doc(profileToSearchOfDynamicData.objWithProfileToSearchOfDynamic.thingId)
        .update({ 
            profileToMatch: profileToSearchOfDynamicData.objWithProfileToSearchOfDynamic.profileToMatch,
        })
        .then(() => {
            console.log(`objWithProfileToSearchOfDynamic: ${profileToSearchOfDynamicData}`)
            // res
            return res.json(profileToSearchOfDynamicData);
        })            
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });  
}

// to make the match between userDevices and staticDevices
exports.detectProfileMatchBetweenUserDevicesAndStaticDevices = (req,res) => {
    // profile of dynamic
    let objProfileDataOfDynamic = req.body.objProfileDataOfDynamic
    // var to hold coors object in an array of the rest
    let profilesInLiveDataSets = [];
    // hold var
    let arraysToCheck = [];
    // var to hold data
    let outputList = [];
    // db part
    db  
        .collectionGroup('liveDataSets')
        .where('nameOfDevice','==','staticHeartbeat')
        .get()
        .then((querySnapshot) => { 
            // Do something with these reviews!
            querySnapshot.forEach((doc) => {
                // push data to an array
                profilesInLiveDataSets.push({
                    coords: doc.data().coords,
                    thingId: doc.data().thingId,
                    profileToSearch: doc.data().profileToSearch, 
                })
            })
            // print
            console.log(`Number of statics with data in db (profilesInLiveDataSets): ${profilesInLiveDataSets.length} & 
                Data result on the statics connected: ${JSON.stringify(profilesInLiveDataSets)}`); 
                // quantity of objects & [{...},{...}
        })
        .then(()=>{
            // underscore
            let _ = require('underscore');
            // loop the results on the array
            for(let i = 0; i < profilesInLiveDataSets.length; i++){
                // var to hold coincidences
                let coincidences = {};
                // func to check the match
                function checkProfilesStaicsVsDynamics(args){
                    // obj to extract key names
                    let keyNames = args.dynamics;
                    // loop
                    for (let key in keyNames) {
                        if (keyNames.hasOwnProperty(key)) {
                            // print
                            console.log(`to compare --> statics: ${args.statics[key]} & dynamic: ${args.dynamics[key]}`)
                            // passing the keys
                            let statics = args.statics[key];
                            let dynamics = args.dynamics[key];
                            // isntersector
                            let intersection = _.intersection(statics, dynamics)
                            // check if is empty
                            if(intersection.length != 0){
                                // pass data to var obj
                                coincidences[key] = intersection;
                                // print
                                console.log(`coincidences: ${JSON.stringify(coincidences)}`)
                            }
                        }
                    }
                    // return data results
                    return coincidences;
                }

                // data to pass 
                let argz = {
                    statics: profilesInLiveDataSets[i].profileToSearch,
                    dynamics: objProfileDataOfDynamic.profileToMatch,
                };
                
                // check it, run it & push it
                let matchDataResults = checkProfilesStaicsVsDynamics(argz);
                if(Object.entries(matchDataResults).length !== 0){
                    arraysToCheck.push({
                        matchDataResults: matchDataResults,
                        coords: profilesInLiveDataSets[i].coords,
                        thingId: profilesInLiveDataSets[i].thingId,
                        meters:0
                    });
                }
            }
        })
        .then(()=>{
            const promises = [];
            // loop
            arraysToCheck.forEach(function(arrayToCheck) {
                // print item
                console.log("Current item: " + arrayToCheck);
                // extract userHandle
                const userHandle = arrayToCheck.thingId.split("-").slice(0,1).toString();
                // db connection
                let promise = db
                    .collection("users")
                    .where('userHandle','==',userHandle)
                    .get()
                    .then(snapshot => {
                        // check if exists
                        if (snapshot.empty) {
                            console.log('No matching documents.');
                        } else {
                            snapshot.forEach(doc => {
                                outputList.push({
                                    userHandle:doc.data().userHandle,
                                    type:doc.data().type,
                                    email:doc.data().email,
                                    names:doc.data().names,
                                    lastname:doc.data().lastname,
                                    companyName:doc.data().companyName,
                                    imgUrl:doc.data().imgUrl,
                                    bio:doc.data().bio,
                                });
                            });
                            return;
                        }
                    })
                    .catch(err => {
                        console.log('Error getting documents', err);
                    });
                promises.push(promise);
            }) 
            Promise.all(promises).then(() => {
                //res.send(JSON.stringify(outputList));
                return outputList
            })
            .then(()=>{
                // var to hold userHandle
                let userHandle = "";
                arraysToCheck.forEach((arrayToCheck)=>{
                    // userHandle
                    userHandle = arrayToCheck.thingId.split("-").slice(0,1).toString();
                    // second obj loop
                    outputList.forEach((outputItem)=>{
                        if(userHandle == outputItem.userHandle){
                            arrayToCheck.userCredentials = outputItem
                        }
                    })
                })
                // print
                console.log(`arraysToCheck after push user credentials: ${JSON.stringify(arraysToCheck)}`);
                return arraysToCheck
            })
            .then(()=>{
                // func to save data of top5Coords in liveDataSets of dynamics
                function savaDataOfDynamicDeviceOnLiveDataSetsDoc(dataToSave){
                    // userDeviceId 
                    const userDeviceId = objProfileDataOfDynamic.thingId.split("-").slice(2);
                    db
                        .doc(`/userDevices/${userDeviceId}`)
                        .collection('top5Tags')
                        .add({ ...dataToSave })
                        .then(() => {
                            // print
                            console.log(`final response to the user: ${dataToSave}`);
                            // res
                            //res.json("matches now in db");
                        })            
                        .catch((err) => {
                            console.error(err);
                        });                
                }
                // run it
                arraysToCheck.forEach((arrayToCheck)=>{
                    savaDataOfDynamicDeviceOnLiveDataSetsDoc(arrayToCheck);
                })
            })
            .catch(err => {
                res.status(500, err);
            })
        })
}

///////////////////////////////////////////////////////////////////////////////////// meassure modeTypes
// to meassure distance between devices ----> modeOne
exports.detectGPSCoordsProximityRangeForUserDeviceVsStaticDevices = async (inWait) => {
    const dataEnter = inWait 
    // var to hold mtsBetweenDevices
    let mtsBetweenDevices = [];
    // func
    async function checkDistance(inWaitAfter){
        console.log(`checking checkDistance for all tag matches`)
        // print
        console.log(`complete args: ${JSON.stringify(inWaitAfter)}`)
        // loop
        for(let i = 0; i < inWaitAfter.top5Coords.length; i++){
            // logic to make the meassure part
            let R = 6371; // Radius of the earth in km
            let dLat = (inWaitAfter.top5Coords[i].coords.lat - inWaitAfter.coords.lat) * Math.PI / 180;  // Javascript functions in radians
            let dLon = (inWaitAfter.top5Coords[i].coords.lon - inWaitAfter.coords.lon) * Math.PI / 180; 
            let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(inWaitAfter.top5Coords[i].coords.lat * Math.PI / 180) * Math.cos(inWaitAfter.coords.lat* Math.PI / 180) * 
                Math.sin(dLon/2) * Math.sin(dLon/2); 
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            let d = R * c; // Distance in km
            let distanceInMeters = d * 1000; // Distance in m
            // print
            console.log(`distanceInMeters to each comparasion: ${distanceInMeters}`);
            // push in to arr
            mtsBetweenDevices.push({
                meters:distanceInMeters,
                thingId:inWaitAfter.top5Coords[i].thingId
            })
            // return mtsBetweenDevices
            let userDeviceId = inWaitAfter.thingId.split("-").slice(2).toString();
            // db save mts results part
            const docRef = db
                .doc(`/userDevices/${userDeviceId}`)
                .collection('top5Tags')
                .doc(inWaitAfter.top5Coords[i].docId)
            // update meters
            await docRef
                .update({
                    meters:distanceInMeters
                })
                .catch(err => {
                    res.status(500, err);
                })
        }  
        // print
        console.log(`Unorder yet mtsBetweenDevices: ${JSON.stringify(mtsBetweenDevices)}`)
        return mtsBetweenDevices
    }  
    // pass mts distance to top5Coords array in doc
    await checkDistance(dataEnter)
    // import    
    const {
        metersRangeMatchColor,
    } = require('../utilsForThings');    
    // run it
    await metersRangeMatchColor(mtsBetweenDevices, dataEnter.thingId);
}