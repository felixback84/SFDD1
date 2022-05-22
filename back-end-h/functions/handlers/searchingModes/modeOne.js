// firebase
const { db } = require('../../utilities/admin')
//_
const { forEach } = require('underscore');

///////////////////////////////////////////// SETTINGS TO THING FROM UX //////////////////////////////////////////////////
// pass data of statics users means profileToMatch
exports.postProfileToMatchUserDevices = (req,res) => {
    // profile of dynamic
    let profileToSearchOfDynamicData = req.body
    // db part
    // userDeviceId 
    const userDeviceId = profileToSearchOfDynamicData.objWithProfileToSearchOfDynamic.thingId.split("-").slice(2)
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
        })
}

// to make the match between userDevices and staticDevices
exports.detectProfileMatchBetweenUserDevicesAndStaticDevices = (req,res) => {
    // profile of dynamic
    let objProfileDataOfDynamic = req.body.objProfileDataOfDynamic
    // var to hold coors object in an array of the rest
    let profilesInLiveDataSets = []
    // hold var
    let arraysToCheck = []
    // var to hold data
    let outputListOne = []
    let outputListTwo = []
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
                Data result on the statics connected: ${JSON.stringify(profilesInLiveDataSets)}`)
                // quantity of objects & [{...},{...}
        })
        .then(async()=>{
            // underscore
            let _ = require('underscore')
            // loop the results on the array
            for(let i = 0; i < profilesInLiveDataSets.length; i++){
                // counter global of tags 
                let counterFinalTagsDynamics = 0
                // var to hold coincidences
                let coincidences = {}
                // func to check the match
                const checkProfilesStaicsVsDynamics = async (args) => {
                    // obj to extract key names
                    let keyNames = args.dynamics
                    // loop
                    for(let key in keyNames){
                        // counter init
                        let countPerProp = 0
                        // checker
                        if(keyNames.hasOwnProperty(key)) {
                            // print
                            console.log(`to compare --> statics: ${args.statics[key]} 
                                & dynamic: ${args.dynamics[key]}`
                            )
                            // passing the keys
                            let statics = args.statics[key]
                            let dynamics = args.dynamics[key]
                            // counter for dynamics tags
                            countPerProp += dynamics.length
                            counterFinalTagsDynamics += countPerProp
                            // print
                            console.log({counterFinalTagsDynamics})
                            // isntersector
                            let intersection = _.intersection(statics, dynamics)
                            // check if is empty
                            if(intersection.length != 0){
                                // pass data to var obj
                                coincidences[key] = intersection
                                // print
                                console.log(`coincidences: ${JSON.stringify(coincidences)}`)
                            }
                        }
                    }
                    // return data results
                    return coincidences
                }
                // counter tags
                const counterCoincidenceTagsWithStatics = async (objWithTags) => {
                    // global counter
                    let countFinal = 0
                    // loop to count
                    for(let coincidenceKey in objWithTags){
                        // counter init
                        let countPerProp = 0
                        // check if are not empty props
                        if(objWithTags.hasOwnProperty(coincidenceKey)){ 
                            // check length of c/u props
                            countPerProp += coincidences[coincidenceKey].length
                            // count all props lengths
                            countFinal += countPerProp
                            // print
                            console.log({countPerProp})
                        }
                    }
                    // print
                    console.log({countFinal})
                    return countFinal
                }
                // data to pass 
                let argz = {
                    // from db
                    statics: profilesInLiveDataSets[i].profileToSearch,
                    // from ux input in user session
                    dynamics: objProfileDataOfDynamic.profileToMatch,
                };
                // check it, run it & push it
                let matchDataResults = await checkProfilesStaicsVsDynamics(argz)
                let matchDataResultsAndQualityOfMatch = await counterCoincidenceTagsWithStatics(matchDataResults)
                // ** quality match metric
                // import
                const {
                    findMatchValueQuality,
                } = require('../utilsForThings')
                // run it
                let resultsQualityMatch = await findMatchValueQuality(
                    counterFinalTagsDynamics,
                    matchDataResultsAndQualityOfMatch
                )
                // check if exits any coincidences
                if(Object.entries(matchDataResults).length != 0){
                    arraysToCheck.push({
                        matchDataResults,
                        coords: profilesInLiveDataSets[i].coords,
                        thingId: profilesInLiveDataSets[i].thingId,
                        meters:0,
                        matchQuality: resultsQualityMatch
                    })
                }
            }
        })
        // ** userCredentials
        .then(()=>{
            const promises = []
            // loop
            arraysToCheck.forEach((arrayToCheck)=>{
                // print item
                console.log("Current item: " + arrayToCheck)
                // extract userHandle
                const userHandle = arrayToCheck.thingId.split("-").slice(0,1).toString()
                // db connection
                let promise = db
                    .collection("users")
                    .where('userHandle','==',userHandle)
                    .get()
                    .then(snapshot => {
                        // check if exists
                        if (snapshot.empty) {
                            console.log('No matching documents.')
                        } else {
                            snapshot.forEach(doc => {
                                outputListOne.push({
                                    userHandle:doc.data().userHandle,
                                    type:doc.data().type,
                                    email:doc.data().email,
                                    names:doc.data().names,
                                    lastname:doc.data().lastname,
                                    companyName:doc.data().companyName,
                                    imgUrl:doc.data().imgUrl,
                                    bio:doc.data().bio,
                                })
                            })
                            return
                        }
                    })
                    .catch(err => {
                        console.log('Error getting documents', err)
                    })
                promises.push(promise)
            }) 
            Promise.all(promises).then(() => {
                return outputListOne
            })
            .then(()=>{
                // var to hold userHandle
                let userHandle = "";
                arraysToCheck.forEach((arrayToCheck)=>{
                    // userHandle
                    userHandle = arrayToCheck.thingId.split("-").slice(0,1).toString()
                    // second obj loop
                    outputListOne.forEach((outputItem)=>{
                        if(userHandle == outputItem.userHandle){
                            arrayToCheck.userCredentials = outputItem
                        }
                    })
                })
                // print
                console.log(`arraysToCheck after push user credentials: ${JSON.stringify(arraysToCheck)}`)
                return arraysToCheck
            })
            .catch(err => {
                res.status(500, err)
            })
        })
        // ** companyData
        .then(()=>{
            const promises = []
            // loop
            arraysToCheck.forEach((arrayToCheck)=>{
                // print item
                console.log("Current item: " + arrayToCheck)
                // extract userHandle
                const userHandle = arrayToCheck.thingId.split("-").slice(0,1).toString()
                // db connection
                let promise = db
                    .collection(`/users/${userHandle}/companyData`)
                    .get()
                    .then(snapshot => {
                        // check if exists
                        if (snapshot.empty) {
                            console.log('No matching documents.')
                        } else {
                            snapshot.forEach(doc => {
                                outputListTwo.push({
                                    companyName:doc.data().companyName,
                                    localPicUrl:doc.data().localPicUrl,
                                })
                            })
                            return
                        }
                    })
                    .catch(err => {
                        console.log('Error getting documents', err)
                    })
                promises.push(promise)
            })
            Promise.all(promises).then(() => {
                return outputListTwo
            })
            .then(()=>{
                // var to hold userHandle
                let companyName = ""
                // loop
                arraysToCheck.forEach((arrayToCheck)=>{
                    // userHandle
                    companyName = arrayToCheck.userCredentials.companyName
                    // second obj loop
                    outputListTwo.forEach((outputItem)=>{
                        // check to push in the right item
                        if(companyName == outputItem.companyName){
                            console.log("hi sun")
                            arrayToCheck.companyData = outputItem
                        }else{
                            console.log("hi moon")
                        }
                    })
                })
                // print
                console.log(`arraysToCheck after push company data: ${JSON.stringify(arraysToCheck)}`)
                return arraysToCheck
            })
            // save data
            .then(()=>{
                // func to save data of top5Coords in liveDataSets of dynamics
                const savaDataOfDynamicDeviceOnLiveDataSetsDoc = (dataToSave) => {
                    // userDeviceId 
                    const userDeviceId = objProfileDataOfDynamic.thingId.split("-").slice(2)
                    db
                        .doc(`/userDevices/${userDeviceId}`)
                        .collection('top5Tags') // test collection
                        .add({ ...dataToSave })
                        .then(() => {
                            // print
                            console.log(`final response to the user: ${dataToSave}`)
                            // res
                            // res.json("matches now in db");
                        })            
                        .catch((err) => {
                            console.error(err)
                        })          
                }
                // run it
                arraysToCheck.forEach((arrayToCheck)=>{
                    savaDataOfDynamicDeviceOnLiveDataSetsDoc(arrayToCheck)
                })
            })
            .catch(err => {
                res.status(500, err)
            })
        })
        .then(()=>{
            //res
            res.json("matches now in db")
        })
        .catch(err => {
            res.status(500, err)
        })
}

///////////////////////////////////////////////////////////////////////////////////// meassure modeTypes
// to meassure distance between devices ----> modeOne
exports.detectGPSCoordsProximityRangeForUserDeviceVsStaticDevices = async (inWait) => {
    const dataEnter = inWait 
    // var to hold mtsBetweenDevices
    let mtsAndSomeDataBetweenDevices = [];
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
            mtsAndSomeDataBetweenDevices.push({
                meters:distanceInMeters,
                thingId:inWaitAfter.top5Coords[i].thingId,
                matchQuality:inWaitAfter.top5Coords[i].matchQuality,
            })
            // return mtsAndSomeDataBetweenDevices
            let userDeviceId = inWaitAfter.thingId.split("-").slice(2).toString();
            // db save mts results part
            const docRef = db
                .doc(`/userDevices/${userDeviceId}`)
                .collection('top5Tags')
                .doc(inWaitAfter.top5Coords[i].docId)
            // update meters
            await docRef
                .update({
                    meters:distanceInMeters,
                })
                .catch(err => {
                    res.status(500, err);
                })
        }  
        // print
        console.log(`Unorder yet mtsAndSomeDataBetweenDevices: ${JSON.stringify(mtsAndSomeDataBetweenDevices)}`)
        return mtsAndSomeDataBetweenDevices
    }  
    // pass mts distance to top5Coords array in doc
    await checkDistance(dataEnter)
    // import    
    const { 
        metersRangeMatchColor,
    } = require('../utilsForThings');    
    // run it
    await metersRangeMatchColor(mtsAndSomeDataBetweenDevices, dataEnter.thingId);
}


exports.test = async (req,res) => {
    let idUserHandle= req.params.id
    // extract userHandle
    const userHandle = idUserHandle
    let outputListTwo = []
    // db
    let promise = db
        //.collection("users")
        // .where('userHandle','==',userHandle)
        .collection(`/users/${userHandle}/companyData`)
        //.collection('companyData')
        .get()
        .then(snapshot => {
            // check if exists
            if (snapshot.empty) {
                console.log('No matching documents.')
            } else {
                snapshot.forEach(doc => {
                    outputListTwo.push({
                        companyName:doc.data().companyName,
                        pic:doc.data().pic,
                    })
                })
                //return
            }
            console.log(JSON.stringify(outputListTwo))
            res.json(outputListTwo)
        })
        .catch(err => {
            console.log('Error getting documents', err)
        })
}