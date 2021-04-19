// firebase
const { admin, db } = require('../utilities/admin');
// thing commands
const {    
    heartbeatPostToDisablePublishTelemetry,
    heartbeatPostToEneablePublishTelemetry,
} = require('./forThingsHeartbeats');
const { forEach } = require('underscore');

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

// to meassure distance between devices
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
                thingId:top5Coords[i].thingId
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
    } = require('./utilsForThings');    
    // run it
    await metersRangeMatchColor(mtsBetweenDevices, dataEnter.thingId);
}

// to meassure between a specific static devices and dynamic
exports.detectGPSCoordsProximityRangeForUserDeviceVsSpecificStaticDevice = async (inWait) => {
    // dp update part
    let userDeviceId = inWait.thingId.split("-").slice(2).toString();
    // var to hold mtsBetweenDevices
    let mtsBetweenDevices = [];
    // data from db after message income
    const dataEnter = inWait;
    // pick the last item in the arr
    const id = dataEnter.idOfSpecificUserDevice
    // init meassure
    console.log(`id of array to find - id:${id}`)
    async function checkDistance(args){
        console.log(`checking checkDistance to specific static Vs dynaic`)
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
        
        // db save mts results part
        const docRef = db
            .doc(`/userDevices/${userDeviceId}`)
            .collection('top5Tags')
            .doc(inWait.docId)
        // update meters
        await docRef
            .update({
                meters:distanceInMeters
            })
            .catch(err => {
                res.status(500, err);
            })
    }

    // args to pass it
    const argz = {
        userDevice:{
            coords:inWait.coords
        },
        staticDevice:{
            coords:inWait.staticDeviceCoords
        }
    }
    // run it
    await checkDistance(argz);
    await metersRangeMatch(mtsBetweenDevices,dataEnter.thingId);
}

// method to make the meassurment with the list of selected products
exports.meassureOfMatchesInProducts = async (inWait) => {
    const dataEnter = inWait
    // print
    console.log(`dataEnter:${JSON.stringify(dataEnter)}`)
    // var to hold mtsBetweenDevices    
    let mtsBetweenDevicesToProducts = [];
    // func
    async function checkDistance(inWaitAfter){
        console.log(`checking checkDistance for all porduct selections`)
        // loop
        for(let i = 0; i < inWaitAfter.top5Products.length; i++){
            // print
            console.log(`key:${inWaitAfter.top5Products[i].coords}`)
            // logic to make the meassure part
            let R = 6371; // Radius of the earth in km
            let dLat = (inWaitAfter.top5Products[i].coords.lat - inWaitAfter.coords.lat) * Math.PI / 180;  
            let dLon = (inWaitAfter.top5Products[i].coords.lon - inWaitAfter.coords.lon) * Math.PI / 180; 
            let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(inWaitAfter.top5Products[i].coords.lat * Math.PI / 180) 
                * Math.cos(inWaitAfter.coords.lat* Math.PI / 180) 
                * Math.sin(dLon/2) * Math.sin(dLon/2); 
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            let d = R * c; // Distance in km
            let distanceInMeters = d * 1000; // Distance in m
            // print
            console.log(`distanceInMeters to each comparasion: ${distanceInMeters}`);
            // push data to mtsBetweenDevices vart
            mtsBetweenDevicesToProducts.push({
                meters: distanceInMeters,
                thingId: inWaitAfter.top5Products[i].thingId
            })
            // return mtsBetweenDevices
            let userDeviceId = inWaitAfter.thingId.split("-").slice(2).toString();
            // db save mts results part
            const docRef = db
                .doc(`/userDevices/${userDeviceId}`)
                .collection('top5Products')
                .doc(inWaitAfter.top5Products[i].docId)
            // update meters
            await docRef
                .update({
                    meters:distanceInMeters
                })
        }
        // print
        console.log(`Unorder yet mtsBetweenDevicesToProducts: ${JSON.stringify(mtsBetweenDevicesToProducts)}`)
        // return results
        return mtsBetweenDevicesToProducts
    } 
    // run it
    await checkDistance(dataEnter) 
    // import    
    const {
        metersRangeMatchColor,
    } = require('./utilsForThings');    
    // run it
    await metersRangeMatchColor(mtsBetweenDevicesToProducts, dataEnter.thingId);
}

// meassure distance between dynamic user and specific product
exports.meassureOfMatchToEspecificProduct = async (inWait) => {
    // dp update part
    let userDeviceId = inWait.thingId.split("-").slice(2).toString();
    // var to hold mtsBetweenDevices
    let mtsBetweenUserDevicesAndProduct = [];
    // data from db after message income
    const dataEnter = inWait;
    // pick the last item in the arr
    const id = dataEnter.idOfSpecificUserDevice
    // init meassure
    console.log(`id of array to find - id:${id}`)
    async function checkDistance(args){
        console.log(`checking checkDistance to specific product`)
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
        mtsBetweenUserDevicesAndProduct.push({
            meters: distanceInMeters
        })
        
        // db save mts results part
        const docRef = db
            .doc(`/userDevices/${userDeviceId}`)
            .collection('top5Products')
            .doc(inWait.docId)
        // update meters
        await docRef
            .update({
                meters:distanceInMeters
            })
            .catch(err => {
                res.status(500, err);
            })
    }

    // args to pass it
    const argz = {
        userDevice:{
            coords:inWait.coords
        },
        staticDevice:{
            coords:inWait.staticDeviceCoords
        }
    }
    // run it
    await checkDistance(argz);
    await metersRangeMatch(mtsBetweenDevices,dataEnter.thingId);
}

//////////////////////////////////////////////////////////////////////////////////////////

// post coords points from app in userDevice geoCoords collection and liveDataSets and many more
exports.postGeoCoordsUserDeviceAppAndStopTelemetryFromThingAndUpdateLiveDataSetsPlus = (req,res)=>{
    // geofire
    const geofire = require('geofire-common');
    // geo data in req body
    let geoData = req.body.geoData
    // thingId
    const userDeviceId = geoData.thingId.split("-").slice(2).toString();
    // counter
    let counterOfGPSPoints = 0
    // db part to save all data in geoCoords
    db
        .doc(`/userDevices/${userDeviceId}`)
        .collection('geoCoords')
        .add({
            createdAt: new Date().toISOString(),
            coords: {
                        longitude: geoData.coords.lon, 
                        latitude: geoData.coords.lat,
                        hash: geofire.geohashForLocation([geoData.coords.lat,geoData.coords.lon]),
                        nameOfPoint: `coordsFromApp-${counterOfGPSPoints++}`
                    }
        })
        .then(async()=>{
            // let it know trouhgt a command send to the thing the disable data publish
            await heartbeatPostToDisablePublishTelemetry(true,geoData.thingId)
            // res of server
            // res.json("disabled command send to thing");
            // update data in liveDataSets on specific field for this to see the user position
            const liveDataSetsData = db
                .doc(`/userDevices/${userDeviceId}`)
                .collection('liveDataSets')
                .doc(geoData.thingId)
            // update in liveDataSets coords field
            liveDataSetsData
                .update({
                    coords: {
                        lat:geoData.coords.lat,
                        lon:geoData.coords.lon,
                        nameOfPoint:geoData.coords.nameOfPoint,
                        hash:geofire.geohashForLocation([geoData.coords.lat,geoData.coords.lon])
                    },
                    createdAt: new Date().toISOString(),
                })
                .then(()=>{
                    // print
                    console.log("Coords update in liveDataSets from UX")
                    // create a method that extract from liveDataSets and return (dataDB) 
                    // the data to the funtion to meassure function
                    return liveDataSetsData
                    .get()
                    .then(async(doc)=>{
                        // var to hold the active state of the device
                        let active = doc.data().active
                        // check if is turn on or turn off
                        if(active == 'true'){
                            // run it meassure GPS coords for the userDevice and all the matches statics
                            let dataDB = {
                                thingId:doc.data().thingId,
                                coords:doc.data().coords,
                                top5Coords:doc.data().top5Coords,
                                searchingMode:doc.data().searchingMode,
                            }
                            // same cycle already achieve for the device
                            //////////////////////////////////////////////////// GPS MEASSURE MODES /////////////////////////////////////////////////////
                            if(dataDB.searchingMode[0] === "modeOne"){
                                // import module
                                const { 
                                    detectGPSCoordsProximityRangeForUserDeviceVsStaticDevices 
                                } = require('./userDevices');
                                // run it meassure GPS coords for the userDevice and all the matches statics
                                await detectGPSCoordsProximityRangeForUserDeviceVsStaticDevices(dataDB); 
                                // print
                                console.log("say hello to my little friend from app modeOne")
                            } else if(dataDB.searchingMode[0] === "modeTwo"){
                                // import module
                                const { 
                                    detectGPSCoordsProximityRangeForUserDeviceVsSpecificStaticDevice 
                                } = require('./userDevices');
                                // run it meassure GPS for a specific static device pick by the user
                                await detectGPSCoordsProximityRangeForUserDeviceVsSpecificStaticDevice(dataDB);
                                // print
                                console.log("say hello to my little friend from app modeTwo")
                            }  
                            // look the timestamp in the collection geoCoords or in leveDataSets and check 
                            // if the time go up some specific ammount of millis
                            // how i can check if a variable don't change in a specific amount of time in js
                            // Set the date we're counting down to 25 secs
                            let countDownDate = new Date().getTime() + 25000; 
                            // print
                            console.log(`countDownDate: ${countDownDate}`)
                            // Update the count down every 1 second
                            let x = setInterval(async()=>{
                                // Get today's date and time
                                let now = new Date().getTime();
                                // Find the distance between now and the count down date
                                let distance = countDownDate - now;
                                // check if countDown fall to zero
                                if(distance < 0){
                                    // print
                                    console.log(`distance: ${distance}`)
                                    // clear interval
                                    clearInterval(x);
                                    // trigger command to thing to reactivate telemetry
                                    await heartbeatPostToEneablePublishTelemetry(false,geoData.thingId)
                                }
                            }, 1000)
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                    });
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ error: err.code });
                });  
        })
        
}

// post list of products and
exports.postListOfProductsToFind = async (req, res) => {
    // receive list of products
    let listOfProducts = req.body.listOfProducts
    // var to hold results for products
    let resultsOfMatchOfProducts = []
    // var to hold coords of statics
    let resultOfCoords = []
    // to hold the order obj
    let arrWithCoordsKeysInOrder = []
    // var to hold all
    let allData = []
    // userDeviceId
    let userDeviceId = req.body.userDeviceId
    // find those products on the collection 
    const toMakelistOfProducts = async () => {
        for(let i = 0; i < listOfProducts.length; i++){
            // dp liveDataSets part
            db
                .doc(`/products/${listOfProducts[i].productsId}`)
                .get()
                .then((doc)=>{
                    resultsOfMatchOfProducts.push({
                        name:doc.data().name,
                        tags:doc.data().tags,
                        category:doc.data().category,
                        staticDeviceProperty:doc.data().staticDeviceProperty,
                        description:doc.data().description,
                        familyOfDevices:doc.data().familyOfDevices,
                        imgUrl:doc.data().imgUrl,
                        price:doc.data().price,
                        createdAt:doc.data().createdAt,
                        productId:doc.id
                    })
                    // print
                    // console.log(`resultsOfMatchOfProducts:${resultsOfMatchOfProducts}`)  
                    return resultsOfMatchOfProducts
                })
                .catch(err => {
                    res.status(500, err);
                })
        }     
    }   
    // run it
    await toMakelistOfProducts()
    
    // coords of vendors
    const toMakelistOfCoords = async () => {
        // arr for promise
        const searchPromises = [];
        // loop
        for(let i = 0; i < listOfProducts.length; i++){
            // staticDeviceId means id of property
            const staticDeviceId = listOfProducts[i].staticDeviceProperty.split("-").slice(2).toString();
            // dp liveDataSets part
            let searchPromise = db
                .doc(`/staticDevices/${staticDeviceId}`)
                .collection('liveDataSets')
                .doc(listOfProducts[i].staticDeviceProperty)
                .get()
                .then((doc)=>{
                    // make a list in db with the coincidences like top5Coords
                    resultOfCoords.push({
                        coords:doc.data().coords,
                        thingId:doc.data().thingId
                    })
                })
                .catch(err => {
                    res.status(500, err);
                })
                // push promise list
                searchPromises.push(searchPromise);
        }
        // promise
        Promise
            .all(searchPromises)
            .then(()=>{
                // print
                console.log(`resultOfCoords:${JSON.stringify(resultOfCoords)}`)
                // return raw data from db & map the unorder obj
                return resultOfCoords
            })
            .then(async(data)=>{
                // map the unorder obj
                data.map((resultOfCoord)=>{
                    // vars
                    let sortedCoordsKeys = {} 
                    let keysOfCoords = []
                    // loop to extract keys
                    for (key in resultOfCoord.coords) {
                        if (resultOfCoord.coords.hasOwnProperty(key)) {
                            keysOfCoords.push(key);
                        }
                    }
                    // print
                    console.log(`sort a:${keysOfCoords.sort()}`)
                    // loop to make obj in order
                    for (key = 0; key < keysOfCoords.length; key++) {
                        sortedCoordsKeys[keysOfCoords[key]] = resultOfCoord.coords[keysOfCoords[key]];
                    }
                    // to push the the final list
                    arrWithCoordsKeysInOrder.push({
                        coords:sortedCoordsKeys,
                        thingId:resultOfCoord.thingId
                    })
                    // return sorted obj
                    return arrWithCoordsKeysInOrder;
                })
                // print
                console.log(`arrWithCoordsKeysInOrder:${JSON.stringify(arrWithCoordsKeysInOrder)}`)
            })
            .then(()=>{
                //to eliminate duplicates of coords
                const removeDuplicates = async (arr) => {
                    // print
                    // console.log(`hi from duplicate: ${JSON.stringify(arr)}`)
                    // to string
                    const jsonObject = arr.map(JSON.stringify);
                    // find repeats
                    const uniqueSet = new Set(jsonObject);
                    // write arr
                    const uniqueArray = Array.from(uniqueSet).map(JSON.parse); 
                    //print
                    console.log(`uniqueArray:${JSON.stringify(uniqueArray)}`)   
                    // return arr
                    return uniqueArray
                }
                //run it & hold it to remove duplicates in coords
                let listUniqueObjCoords = removeDuplicates(arrWithCoordsKeysInOrder)
                // return result
                return listUniqueObjCoords
            })    
            .then((data)=>{
                // to find equals and create obj with the specific data
                const findEqual = (resultOfCoord) => {
                    resultsOfMatchOfProducts.forEach((item) => {
                        if(resultOfCoord.thingId === item.staticDeviceProperty){
                            allData.push({
                                coords:resultOfCoord.coords,
                                products:item,
                                thingId:resultOfCoord.thingId,
                                meters:0
                            })
                            return allData
                        }
                    })    
                    // print
                    console.log(`allData:${JSON.stringify(allData)}`)
                }
                // run find method to establish a relation between the two arrays (coords & products)
                data.find(findEqual)
            }) 
            .then(()=>{
                allData.forEach((item)=>{
                    console.log('hi')
                    db
                    .doc(`/userDevices/${userDeviceId}`)
                    .collection('top5Products')
                    .add({
                        ...item
                    })
                    .catch(err => {
                        res.status(500, err);
                    })
                })  
            })
            .catch(err => {
                res.status(500, err);
            })
    }
    // run it to begin
    await toMakelistOfCoords()
}

// to find wich statics are close to me by geohash only for app
exports.findStaticsInSpecificMtsRange = (req,res) => {
    // geofire
    const geofire = require('geofire-common');
    // var to hold arr with coords
    const center = [parseFloat(req.params.lat),parseFloat(req.params.lng)]
    // var to hold mts range
    const radiusInM = req.params.mts
    // list of statics
    const bounds = geofire.geohashQueryBounds(center, radiusInM);
    const promises = [];
    // pass the limits
    for (const bound of bounds) {
        const query = db.collectionGroup('liveDataSets')
            .where('nameOfDevice','==','staticHeartbeat')
            .orderBy('coords.hash')
            .startAt(bound[0])
            .endAt(bound[1]);
        // push data in promises list
        promises.push(query.get().catch(err => {
            console.log(err)
        }));
    }
    // Collect all the query results together into a single list
    Promise
        .all(promises)
        .then((snapshots) => {
        // matchings docs
        const matchingDocs = [];
        // loops
        for (const snap of snapshots) {
            for (const doc of snap.docs){
                // print
                console.log(`doc:${JSON.stringify(doc.data())}`)
                // coords vars
                const lat = doc.data().coords.lat
                const lng = doc.data().coords.lon
                // We have to filter out a few false positives due to GeoHash accuracy, but most will match
                const distanceInKm = geofire.distanceBetween([lat, lng], center);
                const distanceInM = distanceInKm * 1000;
                // checker distances in range
                if (distanceInM <= radiusInM) {
                    matchingDocs.push(doc);
                }
            }
        }
        // return docs
        return matchingDocs;
    })
    .then((matchingDocs) => {
        matchingDocs.forEach((doc)=>{
            // Process the matching documents
            console.log(`doc final:${JSON.stringify(doc.data())}`)
        })
    })
    .catch(err => {
        console.log(err)
    })
}

// get products with geohash
exports.findStaticsProductsInSpecificMtsRange = async (req,res) => {
    // geofire
    const geofire = require('geofire-common');
    // var to hold arr with coords
    const center = [parseFloat(req.params.lat),parseFloat(req.params.lng)]
    // var to hold mts range
    const radiusInM = req.params.mts
    // list of statics
    const bounds = geofire.geohashQueryBounds(center, radiusInM);
    const promises = [];
    // pass the limits
    for (const bound of bounds) {
        const query = db
            .collection('products')
            .where('category','==',req.params.category)
            .orderBy('geoHash')
            .startAt(bound[0])
            .endAt(bound[1]);
        // push data in promises list
        promises.push(query.get().catch(err => {
            console.log(err)
        }));
    }

    // vars to hold matchings docs
    const matchingDocs = [];
    const listOfItems = []
    
    // Collect all the query results together into a single list
    Promise.all(promises)
        .then(async(snapshots) => {
            // func
            async function dbFunc(document){
                // run it
                let staticDeviceProperty = document.data().staticDeviceProperty
                // print
                console.log(`staticDeviceProperty:${staticDeviceProperty}`)
                // db part to get coords of products
                let item = db
                    .doc(`/staticDevices/${staticDeviceProperty.split("-").slice(2).toString()}`)
                    .collection('liveDataSets')
                    .where('thingId','==',staticDeviceProperty)
                    .get()
                    .then((data)=>{
                        data.forEach((doc)=>{
                            coords = doc.data().coords
                        })
                        console.log(`coords in db process:${JSON.stringify(coords)}`)
                        return coords
                    })
                    .then((data)=>{
                        console.log(`data with coords:${JSON.stringify(data)}`)
                        const distanceInKm = geofire.distanceBetween([parseFloat(data.lat),parseFloat(data.lon)], center);
                        console.log(`distanceInKm:${JSON.stringify(distanceInKm)}`)
                        const distanceInM = distanceInKm * 1000;
                        // checker distances in range
                        if(distanceInM <= radiusInM){
                            // push data in arr
                            matchingDocs.push(document.data())
                            // print
                            console.log(`hi there is item after distance filter`)
                            return
                        } else {
                            console.log(`hi there not item after distance filter`)
                        }    
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    // push item in list
                    listOfItems.push(item)
            }

            // loops
            for(const snap of snapshots){
                for(const doc of snap.docs){
                    // run it
                    await dbFunc(doc)
                }
            } 
            // final process with promise
            Promise.all(listOfItems)
                .then(()=>{
                    return matchingDocs
                })
                .then((matchingDocs)=>{
                    console.log(`data:${matchingDocs} - ${matchingDocs.length}`)     
                    res.json(matchingDocs)
                })
                .catch(err => {
                    console.log(err)
                }) 
        })  
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
    // db part
    let infoInLiveDataSets = db
        .doc(`/userDevices/${userDeviceId}`)
        .collection('liveDataSets')
        .doc(selectProfileToSearchData.objSelectProfileToSearch.thingId)
        
    infoInLiveDataSets
        .update({
            idOfSpecificStaticDevice: selectProfileToSearchData.objSelectProfileToSearch.thingIdToSearch
        })
        .then(()=>{
            res.json("staticDevice Mark")
        })
}

// search and mark a specific static devices to posterior meassure
exports.selectProductOfStaticDeviceToSearchByUserDevice = (req,res) => {
    const selectProfileToSearchData = req.body;
    // userDeviceId 
    const userDeviceId = selectProfileToSearchData.objSelectProfileToSearch.thingId.split("-").slice(2);
    // db part
    let infoInLiveDataSets = db
        .doc(`/userDevices/${userDeviceId}`)
        .collection('liveDataSets')
        .doc(selectProfileToSearchData.objSelectProfileToSearch.thingId)
        
    infoInLiveDataSets
        .update({
            idOfSpecificProduct: selectProfileToSearchData.objSelectProfileToSearch.thingIdToSearch
        })
        .then(()=>{
            res.json("staticDevice porduct Mark")
        })
}