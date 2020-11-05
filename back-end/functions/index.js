// firebase
const functions = require('firebase-functions');
const { admin, db, realDB } = require('./utilities/admin');
// express    
const app = require('express')();
// middleware for auth
const FBAuth = require('./utilities/fbAuth');
//cors
const cors = require('cors');
app.use(cors({ origin: true }));

////////////////////////////////////////// HANDLERS //////////////////////////////////////////////////
// users
const { 
    signup,  
    login,
    addUserDetails,
    uploadUserImage,
    getAuthenticatedUser
} = require('./handlers/users');

// userDevices
const {
    getAllUserDevices,
    getUserDevice,
    getActiveUserDevices,
    getInactiveUserDevices
    
} = require('./handlers/userDevices');

// userAdventures
const {
    getAllUserAdventures,
    getUserAdventure,
    getActiveUserAdventures,
    getInactiveUserAdventures
} = require('./handlers/userAdventures');

// dataSets
const {
    postInDataSetsUserDevice,
    getAllDataSetsUserDevice,
    getDataSetUserDevice
} = require('./handlers/dataSets');

// checkouts
const {
    postDataCheckOutAdventure,
    postDataCheckOutDevice,
    getAllCheckouts,
    getCheckout
} = require('./handlers/checkouts');

// devices
const { 
    getAllDevices,
    getDevice,
    likeDevice,
    unlikeDevice,
    postDeviceComment
} = require('./handlers/devices');

// adventures
const { 
    getAllAdventures,
    getAdventure,
    likeAdventure,
    unlikeAdventure,
    postAdventureComment    
} = require('./handlers/adventures');

// just to test
const {
    postInUserDevices
} = require('./handlers/postInUserDevices');

// iot core & pub/sub
const {
    createDeviceInIotCore
} = require('./handlers/finalCycleIotGcloud');

// hilda devices
const {
    hildaPostActiveCommand,
    hildaPostInactiveCommand,
    hildaPostMotorSpeedCommand,
    hildaPostColorCommand
} = require('./handlers/forHildaThings');

// gps
// const {
//     detectGPSCoordsProximityRange
// } = require('./handlers/forHeartBeat');
//////////////////////////////////////////// API REST ROUTES ////////////////////////////////////////////////////////
///////////////////////////////////////////////// USERS /////////////////////////////////////////////////////////////
// signup user
app.post('/signup', signup);
// login user   
app.post('/login', login);
// add user details
app.post('/user', FBAuth, addUserDetails);
// post image of user
app.post('/user/image', FBAuth, uploadUserImage);
// get all own user data (auth)
app.get('/user', FBAuth, getAuthenticatedUser);

////////////////////////////////////////////////// USERDEVICES ////////////////////////////////////////////////////////
// get userDevice 
app.get('/userdevices', FBAuth, getAllUserDevices); 
// get one userDevice 
app.get('/userdevices/:userDeviceId', FBAuth, getUserDevice);
// get active userDevices
app.get('/userdevices/:userDeviceId/active', FBAuth, getActiveUserDevices);
// get inactive userAdventures
app.get('/userdevices/:userDeviceId/inactive', FBAuth, getInactiveUserDevices);

// just to test
app.post('/userdevices/:deviceId/create', FBAuth, postInUserDevices)
 
////////////////////////////////////////////////// USERADVENTURES /////////////////////////////////////////////////////
// get userDevice 
app.get('/useradventures', FBAuth, getAllUserAdventures);
// get one userAdventure 
app.get('/useradventures/:userAdventureId', FBAuth, getUserAdventure);
// get active userAdventures
app.get('/useradventures/:userAdventureId/active', FBAuth, getActiveUserAdventures);
// get inactive userAdventures
app.get('/useradventures/:userAdventureId/inactive', FBAuth, getInactiveUserAdventures);

////////////////////////////////////////////////// DATASETS/////////////////////////////////////////////////////////
// post dataSets in user device 
app.post('/user/device/:userDeviceId/dataset', FBAuth, postInDataSetsUserDevice);
// get all dataSets in user device
app.get('/user/device/:userDeviceId/datasets', FBAuth, getAllDataSetsUserDevice);
// get one dataSets in user device 
app.get('/user/device/:userDeviceId/dataset/:dataSetId', FBAuth, getDataSetUserDevice);
 
////////////////////////////////////////////////// CHECKOUTS ////////////////////////////////////////////////////////
// post data for checkout device
app.post('/user/checkout/device/:deviceId', FBAuth, postDataCheckOutDevice);
// post data for checkout adventure
app.post('/user/checkout/adventure/:adventureId', FBAuth, postDataCheckOutAdventure);
// get all checkouts
app.get('/user/checkouts', FBAuth, getAllCheckouts);
// get one checkout
app.get('/user/checkouts/:checkoutId', FBAuth, getCheckout);

////////////////////////////////////////////////// DEVICES ////////////////////////////////////////////////////////
// get all devices
app.get('/devices', getAllDevices);
// get one device:pub
app.get('/devices/:deviceId', getDevice);
// like for device
app.get('/device/:deviceId/like', FBAuth, likeDevice);
// unlike for device
app.get('/device/:deviceId/unlike', FBAuth, unlikeDevice);
// comment on device
app.post('/device/:deviceId/comment', FBAuth, postDeviceComment);

////////////////////////////////////////// ADVENTURES /////////////////////////////////////////////////////////////
// get all adventures
app.get('/adventures', getAllAdventures);
// get one adventure:pub
app.get('/adventures/:adventureId', getAdventure);
// likes
app.get('/adventure/:adventureId/like', FBAuth, likeAdventure);
// unlikes
app.get('/adventure/:adventureId/unlike', FBAuth, unlikeAdventure); 
// comment on an adventure
app.post('/adventure/:adventureId/comment', FBAuth, postAdventureComment);

////////////////////////////////////// iot core & pub/sub routes  ////////////////////////////////////////////////////
// creation of device in iot core
app.get('/device/:userDeviceId/createDevicesInIotCore', createDeviceInIotCore);

////////////////////////////////// halo thing routes /////////////////////////////////////////////////


////////////////////////////////// hilda thing routes /////////////////////////////////////////////////
// post active command in hilda things
app.post('/device/hilda/:thingId/active',FBAuth, hildaPostActiveCommand);
// post inactive command in hilda things
app.post('/device/hilda/:thingId/inactive',FBAuth, hildaPostInactiveCommand);
// post motor speed command in hilda things
app.post('/device/hilda/:thingId/motorSpeed',FBAuth, hildaPostMotorSpeedCommand);
// post color command in hilda things
app.post('/device/hilda/:thingId/color',FBAuth, hildaPostInactiveCommand);

// export functions
exports.api = functions.https.onRequest(app);

///////////////////////////////// SOME ACTIONS IN DB WITHOUT HTTP REQUEST ///////////////////////////////////////////////
// after creation of checkout means userDevice/Adventure property
exports.createUserPropertyAfterCheckout = functions.firestore
    .document('checkouts/{checkoutsId}')
    .onCreate((snap) => {
        // Get an object representing the document
        const newCheckout = snap.data();
        // access a particular field as you would any JS property
        const type = newCheckout.type;
        // perform desired operations ...
        if(type == 'device'){
            // pick data from checkout process
            let snapShotDeviceId = newCheckout.device.deviceId;
            let snapShotUserHandle =  newCheckout.userHandle;
            let snapShotnameOfDevice = newCheckout.device.nameOfDevice;

            //obj to inicial data in property
            const newUserDevice = {
                deviceId: snapShotDeviceId,
                userHandle: snapShotUserHandle,
                createdAt: new Date().toISOString(),
                active: false,
                thingId: ''
            };

            // object to hold all info, newUserDevice, deviceData
            let allUserDeviceData = {};
            allUserDeviceData = newUserDevice;
            // ask if exists for userDevices data
            db
            .collection('userDevices')
            .where('userHandle', '==', snapShotUserHandle)
            .where('deviceId', '==', snapShotDeviceId)
            .limit(1)
            .get()
            .then((data) => {
                if (!data.empty) {
                    console.log('Device already yours');
                } else {
                    db
                        .doc(`/devices/${snapShotDeviceId}`)
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
                                ageRate: doc.data().ageRate,
                                howManyAdventures: doc.data().howManyAdventures,
                                dataSets: doc.data().dataSets
                            };
                            allUserDeviceData.device = selectInfoDevice;
                            // write in global object
                            return db
                                    .collection('userDevices')
                                    .add(allUserDeviceData) 
                        })
                }
            })
            .catch((err) => console.error(err));

        } else if (type == 'adventure') {
            let snapShotAdventureId = newCheckout.adventure.adventureId;
            let snapShotUserHandle =  newCheckout.userHandle;

            const newUserAdventure = {
                adventureId: snapShotAdventureId,
                userHandle: snapShotUserHandle,
                createdAt: new Date().toISOString(),
                active: false
            };

            // object to hold all info, newUserDevice, deviceData
            let allUserAdventureData = {};
            allUserAdventureData = newUserAdventure;

            db
            .collection('userAdventures')
            .where('userHandle', '==', snapShotUserHandle)
            .where('adventureId', '==', snapShotAdventureId)
            .limit(1)
            .get()
            .then((data) => {
                if (!data.empty) {
                    console.log('Adventure already yours');
                } else {
                    db
                        .doc(`/adventures/${snapShotAdventureId}`)
                        .get()
                        .then((doc) => {
                            // now save the select info of .doc (device) of the collection
                            let selectInfoAdventure = {
                                title: doc.data().title,
                                description: doc.data().description,
                                imgUrl: doc.data().imgUrl,
                                videoUrl: doc.data().videoUrl,
                                createdAt: doc.data().createdAt,
                                duration: doc.data().duration,
                                tags: doc.data().tags,
                                language: doc.data().language,
                                audioUrl: doc.data().audioUrl,
                                device: {
                                    nameOfDevice: doc.data().device.nameOfDevice,
                                    badgeUrl: doc.data().device.badgeUrl
                                }
                            }
                            allUserAdventureData.adventure = selectInfoAdventure;
                            // write in global object
                            return db
                                .collection('userAdventures')
                                .add(allUserAdventureData)   
                        })
                }
            })
            .catch((err) => console.error(err));
        } else {
            console.log('error from inscription')
        }
});
 
// create live data doc in liveData collection to trasmit telemetry events to client --------------- to check response
exports.createDeviceInIotCoreAndDocumentInLiveDataCollection = functions.firestore
    .document('userDevices/{userDevicesId}')
    .onCreate((snap) => {
        // grab data from firebase snapshot
        const newUserDevice = snap.data();
        // doc id
        const userDeviceId = snap.id;
        // other data
        const userHandle = newUserDevice.userHandle;
        const dataSetModel = newUserDevice.device.dataSets;
        const nameOfDevice = newUserDevice.device.nameOfDevice;
        // thingId
        const thingId = `${userHandle}-${nameOfDevice}-${userDeviceId}`;
        //////////////////////////////////////////////////////////////////// add thingId to userDevice property
        db
            .doc(`/userDevices/${userDeviceId}`)
            .update({thingId: thingId})
            .catch((err) => {
                console.error(err);
            });
        
        ////////////////////////////////////////////////////////////////////// create device in iot core
        async function initDevicesIotCore(valueUserDeviceId){
            // api url
            const fetch = require('node-fetch');
            const urlApi = `https://us-central1-sfdd-d8a16.cloudfunctions.net/api/device/${valueUserDeviceId}/createDevicesInIotCore`;
            const options = {
                method: 'GET'
            };
            //fetch
            const iotResponse = await fetch(urlApi, options);
            const iotJsonData = await iotResponse.json();
            console.log(`Response for initDevicesIotCore: ${iotJsonData}`);
        }
        // run it
        initDevicesIotCore(userDeviceId);   
        
        ////////////////////////////////////////////////////////////////////// create liveData doc in collection 
        db
            .doc(`/userDevices/${userDeviceId}`)
            .collection('liveDataSets')
            .doc(thingId)
            .set(dataSetModel)
            .catch((err) => {
                console.error(err);
            });
    })

// detect traffic in topic events and db sync
exports.detectTelemetryEventsForAllDevices = functions.pubsub.topic('events').onPublish(
    (message, context) => {
        // all data
        let data = message.data;        
        // create a buffer decoding with base64
        const buff = Buffer.from(data, 'base64');
        // decode buffer as UTF-8
        const str = buff.toString('utf-8');
        // print normal string
        console.log(`str: ${str}`);
        // str to obj
        let obj = JSON.parse(str); 
        // pick userDeviceId -- CarlosTal84-Halo-8n4ohAo247H1W5SsxY9s
        const thingId = obj.thingId;
        // print object
        console.log(`obj: ${obj.createdAt} - ${thingId}`);
        // userDeviceId 
        const userDeviceId = thingId.split("-").slice(2);
        // nameOfDevice
        const nameOfDevice = thingId.split("-").slice(1,2);
        // print 
        console.log(`nameOfDevice: ${nameOfDevice}`);
        console.log(`userDeviceId: ${userDeviceId}`);

        //db part
        let dbDataFromLiveDataSets = db
            .doc(`/userDevices/${userDeviceId}`)
            .collection('liveDataSets')
            .doc(thingId)
        
        dbDataFromLiveDataSets
            .update({
                ...obj
            }) 
            //*************** */ until here the message bus part to specific db doc
            return dbDataFromLiveDataSets
                .get()
                .then((doc)=>{ 
                    ////////////////////////////////////////// extract asap the data from the coords in the message from the user in line
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
                    //////////////////////////////////////////////////////////////// to the rest of users
                    // var to hold coors object in an array
                    let coordsInLiveDataSets = []
                    // list top 5
                    let top5Coord = []
                    // observer group collection part
                    db
                        .collectionGroup('liveDataSets')
                        .where('thingId', '!=', thingId)
                        //.where('active', '==', "false")
                        .get()
                        .then((querySnapshot) => {
                            // Do something with these reviews!
                            querySnapshot.forEach((doc) => {
                                coordsInLiveDataSets.push({
                                    coords: doc.data().coords,
                                    thingId: doc.data().thingId
                                })
                            })
                            // print
                            console.log(`coordsInLiveDataSets: ${coordsInLiveDataSets.length}`); // [object Object]
                            console.log(JSON.stringify(coordsInLiveDataSets)); // [object Object]
                            
                        })
                        ///////////////////////////////////////////////////////////////////////////////////// measure part
                        // .then(()=>{
                        //     // loop the results on the array
                        //     for(let i = 0; i < coordsInLiveDataSets.length; i++){
                        //         // measure distance GPS func
                        //         const checkDistance = (args) => {
                        //             let R = 6371; // Radius of the earth in km
                        //             let dLat = (args.coords.lat2-args.coords.lat1).toRad();  // Javascript functions in radians
                        //             let dLon = (args.coords.lon2-args.coords.lon1).toRad(); 
                        //             let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                        //                     Math.cos(args.coords.lat1.toRad()) * Math.cos(args.coords.lat2.toRad()) * 
                        //                     Math.sin(dLon/2) * Math.sin(dLon/2); 
                        //             let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
                        //             let d = R * c; // Distance in km
                        //             let distanceInMeters = d * 100; // Distance in mts
                                    
                        //             // make the array with the must close coords
                        //             if(distanceInMeters <= 5) {
                        //                 top5Coord.push({
                        //                     thingId: args.thingId, 
                        //                     coords: args.coords,
                        //                     meters: d
                        //                 })
                        //             } else if(distanceInMeters <= 10) {
                        //                 top5Coord.push({
                        //                     thingId: args.thingId, 
                        //                     coords: args.coords,
                        //                     meters: d
                        //                 })
                        //             }else if(distanceInMeters <= 15) {
                        //                 top5Coord.push({
                        //                     thingId: args.thingId, 
                        //                     coords: args.coords,
                        //                     meters: d
                        //                 })
                        //             }else if(distanceInMeters <= 20) {
                        //                 top5Coord.push({
                        //                     thingId: args.thingId, 
                        //                     coords: args.coords,
                        //                     meters: d
                        //                 })
                        //             }else if(distanceInMeters <= 25) {
                        //                 top5Coord.push({
                        //                     thingId: args.thingId, 
                        //                     coords: args.coords,
                        //                     meters: d
                        //                 })
                        //             }
                        //             // print
                        //             console.log(`top5Coord: ${top5Coord}`);
                        //         }
            
                        //         /** Converts numeric degrees to radians */
                        //         if (typeof(Number.prototype.toRad) === "undefined") {
                        //                 Number.prototype.toRad = function() {
                        //                 return this * Math.PI / 180;
                        //             }
                        //         }
            
                        //         // user whait for answer
                        //         let latUserInLine = coords.lat;
                        //         let lonUserInLine = coords.lon;
            
                        //         // user whait for answer
                        //         let latArrayCoordsInDB = coordsInLiveDataSets[i].coords.lat;
                        //         let lonArrayCoordsInDB = coordsInLiveDataSets[i].coords.lon;
            
                        //         // data to pass
                        //         let args = {
                        //             coords:{
                        //                 lon1:lonUserInLine, 
                        //                 lat1:latUserInLine, 
                        //                 lon2:lonArrayCoordsInDB, 
                        //                 lat2:latArrayCoordsInDB
                        //             },
                        //             thingId:thingId
                        //         }
            
                        //         // print
                        //         console.log(
                        //             'hi distance:' + checkDistance(args)
                        //         );
                        //     }
                        // // send feedback to waiting response user
                        
                        // })
                        // .catch((err) => {
                        //     console.error(err);
                        // });
                        
                })
                .catch((err) => {
                    console.error(err);
                });
    })


