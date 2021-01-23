// firebase
const { db } = require('../utilities/admin');

// imports
const { 
    sendCommandGPSColor   
} = require('./forThingsHeartbeats');

// *********************** Post a complete device for an user or userDevice property - without use
exports.postInUserDevices = (req, res) => {
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
                    findMe: false,
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
                let matchDataResuls = checkProfilesStaicsVsDynamics(argz);
                if(Object.entries(matchDataResuls).length !== 0){
                    arraysToCheck.push({
                        matchDataResuls: matchDataResuls,
                        coords: profilesInLiveDataSets[i].coords,
                        thingId: profilesInLiveDataSets[i].thingId,
                    });
                }
            }
            // print results
            console.log(`arraysToCheck result before empty ones filter --> 
                ${JSON.stringify(arraysToCheck)}`);
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
                        return res.json(dataToSave);
                    })            
                    .catch((err) => {
                        console.error(err);
                        res.status(500).json({ error: err.code });
                    });                
            }
            // run it
            savaDataOfDynamicDeviceOnLiveDataSetsDoc(arraysToCheck);
        })
        .catch((err) => console.error(err));
}

// to pick wich color message send to the device
async function metersRangeMatch(metersArr,thingId){
    for(let i = 0; i < metersArr.length; i++){
        // check ranges
        if(metersArr[i].meters >= 0 && metersArr[i].meters <= 5){
            let colorToThingResponse = {
                colorValue:{r:1,g:2,b:3}, 
                colorName:"green", 
            }
            console.log("hi from meters range match: 0-5");
            // command to thing
            sendCommandGPSColor(colorToThingResponse,thingId);
            return
        } else if (metersArr[i].meters >= 5.1 && metersArr[i].meters <= 10){
            let colorToThingResponse = {
                colorValue:{r:4,g:5,b:6}, 
                colorName:"yellow", 
            }
            console.log("hi from meters range match: 5-10");
            // command to thing
            sendCommandGPSColor(colorToThingResponse,thingId);
            return
        } else if (metersArr[i].meters >= 10.1 && metersArr[i].meters <= 15){
            let colorToThingResponse = {
                colorValue:{r:7,g:8,b:9}, 
                colorName:"red", 
            }
            console.log("hi from meters range match: 10-15");
            // command to thing
            sendCommandGPSColor(colorToThingResponse,thingId);
            return
        } else if (metersArr[i].meters >= 15.1 && metersArr[i].meters <= 20){
            let colorToThingResponse = {
                colorValue:{r:10,g:11,b:12}, 
                colorName:"fucsia", 
            }
            console.log("hi from meters range match: 15-20");
            // command to thing
            sendCommandGPSColor(colorToThingResponse,thingId);
            return
        } else if (metersArr[i].meters >= 20.1 && metersArr[i].meters <= 25){
            let colorToThingResponse = {
                colorValue:{r:13,g:14,b:15}, 
                colorName:"blue", 
            }
            console.log("hi from meters range match: 20-25");
            // command to thing
            sendCommandGPSColor(colorToThingResponse,thingId);
            return
        }  
    }
}

// to meassure distance between devices
exports.detectGPSCoordsProximityRangeToHearbeats = async (inWait) => {
    const dataEnter = inWait
    // var to hold mtsBetweenDevices
    let mtsBetweenDevices = [];
    // func
    function checkDistance(inWaitAfter){
        // print
        console.log(`complete args: ${JSON.stringify(inWaitAfter)}`)
        for(let i = 0; i < inWaitAfter.top5Coords.length; i++){
            // logic to make the meassure part
            let R = 6371; // Radius of the earth in km
            let dLat = (inWaitAfter.top5Coords[i].coords.lat - inWaitAfter.coords.lat) * Math.PI / 180;  // Javascript functions in radians
            let dLon = (inWaitAfter.top5Coords[i].coords.lon - inWaitAfter.coords.lon) * Math.PI / 180; 
            let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(inWaitAfter.top5Coords[i].coords.lat * Math.PI / 180) * Math.cos(inWait.coords.lat* Math.PI / 180) * 
                Math.sin(dLon/2) * Math.sin(dLon/2); 
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            let d = R * c; // Distance in km
            let distanceInMeters = d * 1000; // Distance in m
            // print
            console.log(`distanceInMeters to each comparasion: ${distanceInMeters}`);
            // push data to mtsBetweenDevices vart
            mtsBetweenDevices.push({
                meters: distanceInMeters
            })
        }  
        // sort arr
        mtsBetweenDevices.sort((a, b) => {
            return a.meters - b.meters;
        });
        // db save mts results part
        console.log(`Order mtsBetweenDevices: ${JSON.stringify(mtsBetweenDevices)}`)
    }  
    // run it 
    await checkDistance(dataEnter);
    await metersRangeMatch(mtsBetweenDevices,dataEnter.thingId);
}

// specific the mode of search
exports.heartbeatPostSearchMode = (req,res) => {

}

// search for a specific static devices
