// firebase
const functions = require('firebase-functions');
const { db } = require('./utilities/admin');
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
    getAuthenticatedUser,
    markDevicesNotificationsRead    
} = require('./handlers/users');

    // notifications
    const {
        initNotificationsToActiveStateOfThing,
    } = require('./handlers/notifications');

// userDevices
const {
    getAllUserDevices,
    getUserDevice,
    //////////////////// to test mode
    postInUserDevices,
    /////////////////////// 
    getActiveUserDevices,
    getInactiveUserDevices,
    detectProfileMatchBetweenUserDevicesAndStaticDevices
} = require('./handlers/userDevices');
    
    // things heartbeats in general
    const {
        detectGPSCoordsProximityRangeToHearbeats,
        heartbeatPostActiveCommand,
        heartbeatPostInactiveCommand,
    } = require('./handlers/forThingsHeartbeats');

// static devices
const {
    getAllStaticDevices,
    getStaticDevice,
    //////////////////// to test mode
    postInStaticDevice,
    /////////////////////// 
    getActiveStaticDevices,
    getInactiveStaticDevices
} = require('./handlers/staticDevices');

    // things staticHeartbeats in general
    const {
        //detectGPSCoordsProximityRangeToStaticHearbeats,
        staticHeartbeatPostActiveCommand,
        staticHeartbeatPostInactiveCommand,
        staticHeartbeatPostCoordsCommand,
    } = require('./handlers/forThingsStaticsHeartbeats');
    
// devices
const { 
    getAllDevices,
    getDevice,
    likeDevice,
    unlikeDevice,
    postDeviceComment
} = require('./handlers/devices');

// iot core & pub/sub
const {
    createUserDeviceInIotCore,
    createStaticDeviceInIotCore
} = require('./handlers/finalCycleIotGcloud');

// dataSets
const {
    postInDataSetsUserDevice,
    getAllDataSetsUserDevice,
    getDataSetUserDevice
} = require('./handlers/dataSets');

// checkouts
const {  
    postDataCheckOutDevice,
    getAllCheckouts,
    getCheckout
} = require('./handlers/checkouts');

//////////////////////////////////////////// +++++++ API REST ROUTES +++++++ ///////////////////////////////////////////
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
// mark if the notifications was read 
app.post('/notifications', FBAuth, markDevicesNotificationsRead);

////////////////////////////////////////////////// USERDEVICES ////////////////////////////////////////////////////////
// *************************** just to test an easily create an userDevice property
app.post('/userdevices/:deviceId/create', FBAuth, postInUserDevices)
// get userDevice 
app.get('/userdevices', FBAuth, getAllUserDevices); 
// get one userDevice 
app.get('/userdevices/:userDeviceId', FBAuth, getUserDevice);
// get active userDevices
app.get('/userdevices/:userDeviceId/active', FBAuth, getActiveUserDevices);
// get inactive userAdventures
app.get('/userdevices/:userDeviceId/inactive', FBAuth, getInactiveUserDevices);
// to post userDevice data to make the initial match
app.post('/userdevices/match/staticsdevices', FBAuth, detectProfileMatchBetweenUserDevicesAndStaticDevices);

    ////////////////////////////////// userDevice heartbeat thing routes /////////////////////////////////////////////////
    // post active command in heartbeat things
    app.post('/userdevice/heartbeat/:thingId/active',FBAuth, heartbeatPostActiveCommand);
    // post inactive command in heartbeat things
    app.post('/userdevice/heartbeat/:thingId/inactive',FBAuth, heartbeatPostInactiveCommand);
    // get top5Coords ------> without use yet
    // app.get('/userdevice/heartbeat/:thingId/top5Coords',FBAuth, heartbeatTop5CoordsData);

/////////////////////////////////////////////// STATIC DEVICES ///////////////////////////////////////////////////
// *************************** just to test an easily create an staticDevice property
app.post('/staticdevices/:staticId/create', FBAuth, postInStaticDevice);
// get all static devices
app.get('/staticdevices', FBAuth, getAllStaticDevices);
// get specific static device
app.get('/staticdevices/:staticdevice', FBAuth, getStaticDevice);
// get active userDevices
app.get('/staticdevices/:staticDeviceId/active', FBAuth, getActiveStaticDevices);
// get inactive userAdventures
app.get('/staticdevices/:staticDeviceId/inactive', FBAuth, getInactiveStaticDevices);

    ////////////////////////////////// staticDevice heartbeat thing routes /////////////////////////////////////////////////
    // post active command in static heartbeat things
    app.post('/staticdevice/staticheartbeat/:thingId/active',FBAuth, staticHeartbeatPostActiveCommand);
    // post inactive command in static heartbeat things
    app.post('/staticdevice/staticheartbeat/:thingId/inactive',FBAuth, staticHeartbeatPostInactiveCommand);
    // post coords command in static hearbeat things
    app.post('/staticdevice/staticheartbeat/:thingId/coords',FBAuth, staticHeartbeatPostCoordsCommand);
    
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

////////////////////////////////////////////////// STATICS ////////////////////////////////////////////////////////
//---------------> not yet

////////////////////////////////////// iot core & pub/sub routes  ////////////////////////////////////////////////////
// creation of user device in iot core
app.get('/device/:userDeviceId/createDeviceInIotCore', createUserDeviceInIotCore);
// creation of static device in iot core
app.get('/device/:staticDeviceId/createStaicDeviceInIotCore', createStaticDeviceInIotCore);

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
// get all checkouts
app.get('/user/checkouts', FBAuth, getAllCheckouts);
// get one checkout
app.get('/user/checkouts/:checkoutId', FBAuth, getCheckout);

// export functions
exports.api = functions.https.onRequest(app);

///////////////////////////////// +++++++ SOME ACTIONS IN DB WITHOUT HTTP REQUEST ++++++++ /////////////////////////////////////
// after creation of checkout means userDevice property
exports.createUserDevicePropertyAfterCheckout = functions.firestore
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
            //let snapShotnameOfDevice = newCheckout.device.nameOfDevice;

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
        }   
});

// create liveDataSet (userDevices) doc in liveDataSets collection to trasmit telemetry events to client fot userDevices --------------- to check response
exports.createUserDeviceInIotCoreAndDocumentInLiveDataCollection = functions.firestore
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
        async function initUserDevicesIotCore(valueUserDeviceId){
            // api url
            const fetch = require('node-fetch');
            const urlApi = `https://us-central1-sfdd-d8a16.cloudfunctions.net/api/device/${valueUserDeviceId}/createDeviceInIotCore`;
            const options = {
                method: 'GET'
            };
            //fetch
            const iotResponse = await fetch(urlApi, options);
            const iotJsonData = await iotResponse.json();
            console.log(`Response for initDevicesIotCore: ${iotJsonData}`);
        }
        // run it
        initUserDevicesIotCore(userDeviceId);   
        
        /////////////////////////////////////////////////////////////// create liveData doc in collection //////////////////////////////////
        db
            .doc(`/userDevices/${userDeviceId}`)
            .collection('liveDataSets')
            .doc(thingId)
            .set(dataSetModel)
            .catch((err) => {
                console.error(err);
            });
    })

// create liveDataSet (staticDevices) doc in liveDataSets collection to trasmit telemetry events to client fot staticDevices
exports.createStaticDeviceInIotCoreAndDocumentInLiveDataCollection = functions.firestore
    .document('staticDevices/{staticDevicesId}')
    .onCreate((snap) => {
        // grab data from firebase snapshot
        const newStaticDevice = snap.data();
        // doc id
        const staticDeviceId = snap.id;
        // other data
        const userHandle = newStaticDevice.userHandle;
        const dataSetModel = newStaticDevice.device.dataSets;
        const nameOfDevice = newStaticDevice.device.nameOfDevice;
        // thingId
        const thingId = `${userHandle}-${nameOfDevice}-${staticDeviceId}`;

        //////////////////////////////////////////////////////////////////// add staticThingId to staticDevice property
        db
            .doc(`/staticDevices/${staticDeviceId}`)
            .update({thingId: thingId})
            .catch((err) => {
                console.error(err);
            });
        ////////////////////////////////////////////////////////////////////// create device in iot core
        async function initStaticDevicesIotCore(valueStaticDeviceId){
            // api url
            const fetch = require('node-fetch');
            const urlApi = `https://us-central1-sfdd-d8a16.cloudfunctions.net/api/device/${valueStaticDeviceId}/createStaticDeviceInIotCore`;
            const options = {
                method: 'GET'
            };
            //fetch
            const iotResponse = await fetch(urlApi, options);
            const iotJsonData = await iotResponse.json();
            console.log(`Response for initStaticDevicesIotCore: ${iotJsonData}`);
        }
        // run it 
        initStaticDevicesIotCore(staticDeviceId); 

        /////////////////////////////////////////////////////////////// create liveData doc in collection //////////////////////////////////
        db
            .doc(`/staticDevices/${staticDeviceId}`)
            .collection('liveDataSets')
            .doc(thingId)
            .set(dataSetModel)
            .catch((err) => {
                console.error(err);
            });
    })

// detect traffic in topic events and db sync
exports.detectTelemetryEventsForAllDevices = functions.pubsub.topic('events').onPublish(
    async (message, context) => {
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
        // pick from userDeviceId -- CarlosTal84-(static)Heartbeat-PT44TQIpPyLJXRBqXZAQ
        const thingId = obj.thingId;
        // check the type of device send the message
        // print object
        console.log(`obj: ${obj.createdAt} - ${thingId}`);
        // userDeviceId OR staticDeviceId means id of property
        const userDeviceIdOrStaticDeviceId = thingId.split("-").slice(2).toString();
        // nameOfDevice
        const nameOfDevice = thingId.split("-").slice(1,2).toString();
        // userHandle
        const userHandle = thingId.split("-").slice(0,1).toString();
        // print 
        console.log(`nameOfDevice: ${nameOfDevice}`);
        console.log(`userDeviceIdOrStaticDeviceId: ${userDeviceIdOrStaticDeviceId}`);

        // check the type of device logic
        if(nameOfDevice == "Heartbeat"){
            //db part
            let dbDataFromLiveDataSets = db
                .doc(`/userDevices/${userDeviceIdOrStaticDeviceId}`)
                .collection('liveDataSets')
                .doc(thingId)
            // update specific db doc
            dbDataFromLiveDataSets  
                .update({
                    ////// exceptions ////////
                    top5Coords,
                    searchingMode,
                    profileToMatch,
                    ////////////////////
                    ...obj
                })
            //////////////////////////////////////////////////// GPS LOGIC FOR USERDEVICES //////////////////////////////////////////////////////
            // init process to make the meassures of the gps coords in heartbeat things
            if(nameOfDevice == "Heartbeat" && obj.active == 'true'){ // nameOfDevice in thing
                return dbDataFromLiveDataSets
                    .get()    
                    .then((doc)=>{
                        let dataDB = doc.data()
                        // run it meassure GPS coords
                        detectGPSCoordsProximityRangeToHearbeats(dataDB);  
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        } else if(nameOfDevice == "staticHeartbeat"){
            //db part -----> si es necesartio se pueden hacer dos variables diferentes una para cada dispositivo
            let dbDataFromLiveDataSets = db
                .doc(`/staticDevices/${userDeviceIdOrStaticDeviceId}`)
                .collection('liveDataSets')
                .doc(thingId)
            // update specific db doc
            dbDataFromLiveDataSets  
                .update({
                    ...obj
                })
        }

        //////////////////////////////////////////// NOTIFICATIONS PART  ////////////////////////////
        // data to pass to create the notification    
        if(obj.active == "true"){
            // obj to notification doc to ON command
            const dataToNotificationOfStateOfThing = {
                messageaActiveFromThing: obj.active,
                userDeviceId,
                dataToCretateNotification:{
                    read: false,
                    activeThing: obj.active,
                    userDeviceId: userDeviceId,
                    thingId: thingId,
                    createdAt: obj.createdAt,
                    nameOfDevice: nameOfDevice,
                    userHandle: userHandle,
                    description : "active device from app",
                    type: 'device'
                }
            }
            // run it to notificate the users of the active state of things
            initNotificationsToActiveStateOfThing(dataToNotificationOfStateOfThing);
        } else if (obj.active == "false") {
            // obj to notification doc to ON command
            const dataToNotificationOfStateOfThing = {
                messageaActiveFromThing: obj.active,
                userDeviceId,
                dataToCretateNotification:{
                    read: false,
                    activeThing: obj.active,
                    userDeviceId: userDeviceId,
                    thingId: thingId,
                    createdAt: obj.createdAt,
                    nameOfDevice: nameOfDevice,
                    userHandle: userHandle,
                    description : "inactive device from app",
                    type: 'device'
                }
            }
            // run it to notificate the users of the active state of things
            initNotificationsToActiveStateOfThing(dataToNotificationOfStateOfThing);   
        }
    }
)

