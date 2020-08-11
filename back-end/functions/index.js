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

// iot core & pub/sub
const {
    createDeviceInIotCore,
    deleteInIotCore
} = require('./handlers/finalCycleIotGcloud');

// iot core & pub/sub
// const {
//     getOnOffFromHaloDevice
// } = require('./handlers/forHaloDeviceWithSubs');

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

// deletion of device and topics in iot core and pub/sub respectivily
app.delete('/device/:userDeviceId/deleteInIotCore', deleteInIotCore);

////////////////////////////////// halo device routes /////////////////////////////////////////////////
// Routes device halo
//app.get('/userDevices/iotCore/:userDeviceId/on-off', getOnOffFromHaloDevice);
//app.get('/userDevices/iotCore/:userDeviceId/off', getOffFromHaloDevice);

// export functions
exports.api = functions.https.onRequest(app);

///////////////////////////////// SOME ACTIONS IN DB WITHOUT HTTP REQUEST ///////////////////////////////////////////////
// after creation of checkout 
exports.createUserPropertyAfterCheckout = functions.firestore
    .document('checkouts/{checkoutsId}')
    .onCreate((snap) => {
        
        // Get an object representing the document
        const newCheckout = snap.data();
        // access a particular field as you would any JS property
        const type = newCheckout.type;
        // perform desired operations ...
        if(type == 'device'){
            let snapShotDeviceId = newCheckout.device.deviceId;
            let snapShotUserHandle =  newCheckout.userHandle;

            const newUserDevice = {
                deviceId: snapShotDeviceId,
                userHandle: snapShotUserHandle,
                createdAt: new Date().toISOString(),
                active: false
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

// create device & topics in iot core - pub/sub
exports.createDeviceInIotCore = functions.firestore
    .document('activeUserDevices/{activeUserDevicesId}')
    .onCreate((snap) => {
        // grab userDeviceId from firebase doc
        const newActiveUserDevice = snap.data();
        const userDeviceId = newActiveUserDevice.userDeviceId

        async function initDevicesIotCore(dataDevice){
            // api url
            const fetch = require('node-fetch');
            const urlApi = `https://us-central1-sfdd-d8a16.cloudfunctions.net/api/device/${dataDevice}/createDevicesInIotCore`;
            const options = {
                method: 'GET'
            };
            //fetch
            const iotResponse = await fetch(urlApi, options);
            const iotJsonData = await iotResponse.json();
            console.log(`Response for initDevicesIotCore: ${iotJsonData}`);
        }
        // run it
        //setTimeout(initDevicesIotCore(userDeviceId), 2000);
        initDevicesIotCore(userDeviceId);
        
    });

// delete device & topics in iot core - pub/sub ------------------ to check
exports.deleteDeviceInIotCore = functions.firestore
    .document('activeUserDevices/{activeUserDevicesId}')
    .onDelete((snap) => {
        // grab userDeviceId from firebase doc
        const inActiveUserDevice = snap.data();
        const userDeviceId = inActiveUserDevice.userDeviceId
        console.log(userDeviceId);
        // declarate function to init iotCore & pub/sub
        async function killIotCoreAndPubSub(dataDevice){
            // api url
            const fetch = require('node-fetch');
            const urlApi = `https://us-central1-sfdd-d8a16.cloudfunctions.net/api/device/${dataDevice}/deleteInIotCore`;
            const options = {
                method: 'DELETE'
            };
            //fetch 
            const iotResponse = await fetch(urlApi, options);
            const iotJsonData = await iotResponse.json();
            console.log(iotJsonData);
        }

        //check response
        async function exeKillIotCoreAndPubSub (userDeviceId){
            try{
                const deviceCreatedAndTopics = await killIotCoreAndPubSub(userDeviceId);
                const deviceCreatedAndTopicsResponse = await deviceCreatedAndTopics.json();
                console.log(deviceCreatedAndTopicsResponse);
            }
            catch{
                console.error(err);
            }
        }
        exeKillIotCoreAndPubSub(userDeviceId);
    })

// detect traffic in topic events and db sync
exports.detectTelemetryEvents = functions.pubsub.topic('events').onPublish(
    (message, context) => {
        //console.log(`message: ${message}`);
        console.log(`deviceId: ${message.attributes.deviceId}`);
        console.log(`data: ${message.data}`);
        let data = message.data;        
        // Base64 Encoding
        // create a buffer
        const buff = Buffer.from(data, 'base64');
        // decode buffer as UTF-8
        const str = buff.toString('utf-8');
        // print normal string
        console.log(str);
        // db
        //const dataSet = db.doc(`/devices/${req.params.deviceId}`);
        //const dataSet = db.doc(`/dataSets/VOMnMkhVQGjNycL3SnK1`)
        //return admin.database().ref(`dataSets/`).update({
        return db
            .collection('userDevices')
            .doc(`8n4ohAo247H1W5SsxY9s`)
            .collection('dataSets')
            ,doc('VOMnMkhVQGjNycL3SnK1')
            .update({
                thingId: str.thingId,
                createdAt: str.createdAt,
                lat: str.lat,
                lon: str.lon
        });
})
