// firebase
const { admin, db } = require('../utilities/admin');

// imports
const { 
    sendCommandGPSColor   
} = require('./forThingsHeartbeats');

// *********************** Post a complete device for an user or userDevice property - without use
exports.postInUserDevices = (req, res) => {

    // pass data to user var
    const newUserDevice = {
        deviceId: req.params.deviceId,
        userHandle: req.user.userHandle,
        createdAt: new Date().toISOString(),
        active: false,
        thingId: '' 
    };    
    
    // object to hold all info, newUserDevice, deviceData
    let allUserDeviceData = {};
    allUserDeviceData = newUserDevice;

    db
        .collection('userDevices')
        .where('userHandle', '==', req.user.userHandle)
        .where('deviceId', '==', req.params.deviceId)
        .limit(1)
        .get()
        .then((data) => {
            if (!data.empty) {
                return res.status(404).json({ error: 'Device is already yours' });
            } else {
                
                db
                    .doc(`/devices/${req.params.deviceId}`)
                    .get()
                    .then((doc) => {
                        // now save the select info of .doc (device) of the collection
                        let selectInfoDevice = {
                            nameOfDevice: doc.data().nameOfDevice,
                            description: doc.data().description,
                            imgUrl: doc.data().imgUrl,
                            coverUrl: doc.data().coverUrl,
                            videoUrl: doc.data().videoUrl,
                            badgeUrl: doc.data().badgeUrl,
                            createdAt: doc.data().createdAt,
                            dataSets: doc.data().dataSets
                        };
                        allUserDeviceData.device = selectInfoDevice;
                        // write in global object
                        return db
                        .collection('userDevices')
                        .add(allUserDeviceData)  
                    })
                    .then(() => {
                        return res.json(allUserDeviceData);
                    }) 
                    .catch((err) => {
                        console.error(err);
                        res.status(500).json({ error: err.code });
                    });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
};

// get all userDevices
exports.getAllUserDevices = (req, res) => {
    let userDevices = [];
    db
        .collection('userDevices') 
        .where('userHandle', '==', req.user.userHandle)
        .get()
        .then((data)=> {
            data.forEach((doc) => {
                userDevices.push({
                    userDeviceId: doc.id,
                    userHandle: doc.data().userHandle,
                    active: doc.data().active,
                    createdAt: doc.data().createdAt,
                    device: doc.data().device,
                    deviceId: doc.data().deviceId,
                    thingId: doc.data().thingId
                });
            });
            return res.json(userDevices);
        })    
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

// get one userDevice
exports.getUserDevice = (req, res) => {
    let userDeviceData;
    db
        .doc(`/userDevices/${req.params.userDeviceId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'userDevice not found' });
            }
            userDeviceData = doc.data();
            userDeviceData.userDeviceId = doc.id;
            return res.json(userDeviceData);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

// get active userdevice
exports.getActiveUserDevices = async (req, res) => {
    // ask to if ther any device active
    const activeUserDeviceDocument = db
        .collection('activeUserDevices')
        .where('userHandle', '==', req.user.userHandle)
        .where('active', '==', true)
        .limit(1)

    // ask for device
    const userDeviceDocument = db.doc(`/userDevices/${req.params.userDeviceId}`); 
    // global var to hold all data
    let userDeviceData;
    // ask if exists this device
    userDeviceDocument
        .get()
        .then((doc) => {
            if (doc.exists) {
                userDeviceData = doc.data();
                userDeviceData.userDeviceId = doc.id;
                // return active device
                return activeUserDeviceDocument.get();
            } else {
                return res.status(404).json({ error: 'userDevice not found' });
            }
        })
        // check if is empty this kind of item in the activeDevices collection
        .then((data) => {
            if (data.empty) {
                //console.log(data);
                return db
                    // add data to it
                    .collection('activeUserDevices')
                    //////////////////////////////////////////////////
                    .add({
                        userDeviceId: req.params.userDeviceId,
                        userHandle: req.user.userHandle,
                        createdAt: new Date().toISOString(),
                        active: true,
                        /// esto deberia extraerse del modelo de datos de cada dispositivo, los modos (active or not active) deberian ser una colleción especial
                        activeThing: false
                    })
                    /////////////////////////////////////////////////
                    .then(() => {
                        return userDeviceDocument.update({ active: true });
                    })
                    .then(() => {
                        return res.json(userDeviceData);
                    });
            } else {
                return res.status(400).json({ error: 'userDevice already active' });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });   
}

// get inactive userdevice
exports.getInactiveUserDevices = (req, res) => {
    const activeUserDeviceDocument = db
            .collection('activeUserDevices')
            .where('userHandle', '==', req.user.userHandle)
            .where('userDeviceId', '==', req.params.userDeviceId)
            .where('active', '==', true)
            .limit(1);

    const userDeviceDocument = db.doc(`/userDevices/${req.params.userDeviceId}`);
    let userDeviceData;
    
    userDeviceDocument
        .get()
        .then((doc) => {
            if (doc.exists) {
                userDeviceData = doc.data();
                userDeviceData.userDeviceId = doc.id;
                return activeUserDeviceDocument.get();
            } else {
                return res.status(404).json({ error: 'userDevice not found' });
            }
        })
        .then((data) => {
            if (data.empty) {
                return res.status(400).json({ error: 'Device not active' });
            } else {
                return db
                    .doc(`/activeUserDevices/${data.docs[0].id}`)
                    .delete()
                    .then(() => {
                        return userDeviceDocument.update({ active: false });
                    })
                    .then(() => {
                        res.json(userDeviceData);
                    });
            }
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
                        .collection('liveDataSets')
                        .doc(objProfileDataOfDynamic.thingId)
                        .update({ top5Coords: dataToSave })
                        .then(() => {
                            console.log(`final response to the user: ${dataToSave}`);
                        })            
                        .catch((err) => {
                            console.error(err);
                        });                
                }
                // run it
                savaDataOfDynamicDeviceOnLiveDataSetsDoc(arraysToCheck);
            })
            .catch(err => {
                res.status(500, err);
            })
        })
}

// color in db
async function colorInDb(thingId,colorVal){
    // userDeviceId
    let userDeviceId = thingId.split("-").slice(2).toString();
    // print
    console.log(`color db func data: ${thingId} - ${colorVal}`)
    // db save mts results part
    db
        .doc(`/userDevices/${userDeviceId}`)
        .collection('liveDataSets')
        .doc(thingId)
        .update({
            colorValue:colorVal
        })
        .catch(err => {
            res.status(500, err);
        })
}

// to pick wich color message send to the device
async function metersRangeMatchColor(metersArr,thingId){
    // sort arr asc
    let arrSort = metersArr.sort((a, b) => {
        return a.meters - b.meters;
    });
    // print
    console.log(`Order now mtsBetweenDevices: ${JSON.stringify(arrSort)}`)
    // loop
    for(let i = 0; i < arrSort.length; i++){
        // check ranges
        if(arrSort[i].meters >= 0 && arrSort[i].meters <= 5){
            let colorToThingResponse = {
                colorValue:{r:76,g:175,b:80}, 
                colorName:"green", 
            }
            console.log("hi from meters range match: 0-5");
            // color in db
            await colorInDb(thingId,colorToThingResponse.colorValue);
            // command to thing
            await sendCommandGPSColor(colorToThingResponse,thingId);
            return
        } else if (arrSort[i].meters >= 5.1 && arrSort[i].meters <= 10){
            let colorToThingResponse = {
                colorValue:{r:255,g:235,b:59}, 
                colorName:"yellow", 
            }
            console.log("hi from meters range match: 5-10");
            // color in db
            await colorInDb(thingId,colorToThingResponse.colorValue);
            // command to thing
            sendCommandGPSColor(colorToThingResponse,thingId);
            return
        } else if (arrSort[i].meters >= 10.1 && arrSort[i].meters <= 15){
            let colorToThingResponse = {
                colorValue:{r:244,g:67,b:54}, 
                colorName:"red", 
            }
            console.log("hi from meters range match: 10-15");
            // color in db
            await colorInDb(thingId,colorToThingResponse.colorValue);
            // command to thing
            sendCommandGPSColor(colorToThingResponse,thingId);
            return
        } else if (arrSort[i].meters >= 15.1 && arrSort[i].meters <= 20){
            let colorToThingResponse = {
                colorValue:{r:233,g:30,b:99}, 
                colorName:"fucsia", 
            }
            console.log("hi from meters range match: 15-20");
            // color in db
            await colorInDb(thingId,colorToThingResponse.colorValue);
            // command to thing
            sendCommandGPSColor(colorToThingResponse,thingId);
            return
        } else if (arrSort[i].meters >= 20.1 && arrSort[i].meters <= 25){
            let colorToThingResponse = {
                colorValue:{r:33,g:150,b:243}, 
                colorName:"blue", 
            }
            console.log("hi from meters range match: 20-25");
            // color in db
            await colorInDb(thingId,colorToThingResponse.colorValue);
            // command to thing
            sendCommandGPSColor(colorToThingResponse,thingId);
            return
        }  
    }
}

// to meassure distance between devices
exports.detectGPSCoordsProximityRangeForUserDeviceVsStaticDevices = async (inWait) => {
    const dataEnter = inWait
    // var to hold mtsBetweenDevices
    let mtsBetweenDevices = [];
    // func
    async function checkDistance(inWaitAfter){
        // print
        console.log(`complete args: ${JSON.stringify(inWaitAfter)}`)
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
            // push data to mtsBetweenDevices vart
            mtsBetweenDevices.push({
                meters: distanceInMeters,
                thingId: inWaitAfter.top5Coords[i].thingId
            }) 
        }  
        // print
        console.log(`Unorder yet mtsBetweenDevices: ${JSON.stringify(mtsBetweenDevices)}`)
        // return results
        return mtsBetweenDevices
    }  
 
    // pass mts distance to top5Coords array in doc
    await checkDistance(dataEnter).then((data)=>{
        // userDeviceId
        let userDeviceId = inWait.thingId.split("-").slice(2).toString();
        // db save mts results part
        db
            .doc(`/userDevices/${userDeviceId}`)
            .collection('liveDataSets')
            .doc(inWait.thingId)
            .update({
                mtsBetweenDevices:data
            })
        })
        .catch(err => {
            res.status(500, err);
        })

    // run it
    await metersRangeMatchColor(mtsBetweenDevices, dataEnter.thingId);
}

// to meassure between a specific static devices and dynamic
exports.detectGPSCoordsProximityRangeForUserDeviceVsSpecificStaticDevice = async (inWait) => {
    // var to hold mtsBetweenDevices
    let mtsBetweenDevices = [];
    // data from db after message income
    const dataEnter = inWait;
    // pick the last item in the arr
    const index = dataEnter.indexOfSpecificUserDevice
    // init meassure
    console.log(`jo - index:${index}`)
    async function checkDistance(args){
        console.log("jo - jo")
        // logic to make the meassure part
        let R = 6371; // Radius of the earth in km
        let dLat = (args.staticDevice.coords.lat - args.userDevice.coords.lat) * Math.PI / 180;  // Javascript functions in radians
        let dLon = (args.staticDevice.coords.lon - args.userDevice.coords.lon) * Math.PI / 180; 
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(args.staticDevice.coords.lat * Math.PI / 180) * Math.cos(args.userDevice.coords.lat* Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        let d = R * c; // Distance in km
        let distanceInMeters = d * 1000; // Distance in m
        // print
        console.log(`distanceInMeters to each comparasion: ${distanceInMeters}`);
        // run it
        // push data to mtsBetweenDevices var
        mtsBetweenDevices.push({
            meters: distanceInMeters
        })
    }
    // args to pass it
    const argz = {
        userDevice:{
            coords:inWait.coords
        },
        staticDevice:{
            coords:inWait.top5Coords[index].coords
        }
    }
    // run it
    await checkDistance(argz);
    await metersRangeMatch(mtsBetweenDevices,dataEnter.thingId);
}




///////////////////////////////////////////// SETTINGS TO THING FROM UX //////////////////////////////////////////////////
// pass data of statics users means profileToMatch
exports.postProfileToSearchUserDevices = (req,res) => {
    // profile of dynamic
    let profileToSearchOfDynamicData = req.body;
    // db part
    // userDeviceId 
    const userDeviceId = profileToSearchOfDynamicData.objWithProfileToSearchOfDynamic.thingId.split("-").slice(2);
    db
        .doc(`/userDevices/${userDeviceId}`)
        .collection('liveDataSets')
        .doc(profileToSearchOfDynamicData.objWithProfileToSearchOfDynamic.thingId)
        .update({ profileToMatch: profileToSearchOfDynamicData.objWithProfileToSearchOfDynamic.profileToMatch, })
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

// specific the mode of search
exports.heartbeatPostSearchingMode = (req,res) => {
    const searchingModeData = req.body;
    // db part
    // userDeviceId 
    const userDeviceId = searchingModeData.objSearchingModeData.thingId.split("-").slice(2);
    db
        .doc(`/userDevices/${userDeviceId}`)
        .collection('liveDataSets')
        .doc(searchingModeData.objSearchingModeData.thingId)
        .update({ searchingMode: searchingModeData.objSearchingModeData.searchingMode, })
        .then(() => {
            console.log(`objWithProfileToSearchOfDynamic: ${searchingModeData}`)
            // res
            return res.json(searchingModeData);
        })            
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        }); 
}

// search and mark a specific static devices to posterior meassure
exports.selectStaticDeviceToSearchByUserDevice = (req,res) => {
    const selectProfileToSearchData = req.body;
    // userDeviceId 
    const userDeviceId = selectProfileToSearchData.objSelectProfileToSearch.thingId.split("-").slice(2);
    // var to hold the index
    let index = undefined;
    // db part
    let infoInLiveDataSets = db
        .doc(`/userDevices/${userDeviceId}`)
        .collection('liveDataSets')
        .doc(selectProfileToSearchData.objSelectProfileToSearch.thingId)
        
    // search in array init
    return infoInLiveDataSets
        .get()
        .then((doc)=>{
            // extract just the fiel that i need
            const top5Coords = doc.data().top5Coords;
            // print
            console.log(`top5Coords array: ${JSON.stringify(top5Coords)}`);
            // filter the item in the array
            index = top5Coords.findIndex((element) => {
                if (element.thingId === selectProfileToSearchData.objSelectProfileToSearch.thingIdToSearch) {
                    return true
                }
            })
            // print
            console.log(`filter index in an array: ${index}`)
        })
        .then(()=>{
            return infoInLiveDataSets
                .update({
                    indexOfSpecificUserDevice: index
                })
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        }); 
}