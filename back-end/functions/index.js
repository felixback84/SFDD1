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
                active: false,
                RSA_CERTICATE_PRIVATE_KEY:''
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

exports.createDeviceInIotCore = functions.firestore
    .document('activeUserDevices/{activeUserDevicesId}')
    .onCreate((snap) => {
        // client libraries
        const iot = require('@google-cloud/iot');
        //const {PubSub} = require('@google-cloud/pubsub');

        // Get an object representing the document
        const newActiveUserDevice = snap.data();

        // access a particular field as you would any JS property
        const userDeviceId = newActiveUserDevice.userDeviceId;

        // vars
        let userHandle; 
        let nameOfDevice; 
        let RSA_CERTIFICATE_PRIVATE_KEY;
        // ask for some data to userDevices collection
        db
            .doc(`/userDevices/${userDeviceId}`)
            .get()
            .then((doc) => {
                let userDeviceData = doc.data();
                userHandle = userDeviceData.userHandle;
                nameOfDevice = userDeviceData.device.nameOfDevice;
                RSA_CERTIFICATE_PRIVATE_KEY = userDeviceData.device.RSA_CERTIFICATE_PRIVATE_KEY;
            
                switch(nameOfDevice){

                    case 'Halo':
                        async function haloDeviceInit(){
                            // global vars for iot core
                            const cloudRegion = 'us-central1';
                            //const deviceId = deviceId;
                            const deviceId = `Halo - ${userHandle} - ${userDeviceId}`;
                            const projectId = 'sfdd-d8a16';
                            const registryId = 'Halo';
                            const RSA_CERTIFICATE_PRIVATE_KEY = '';
                            //const rsaCertificateFileUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}`;
            
                            // instanciate the client
                            const iotClient = new iot.v1.DeviceManagerClient({
                                // optional auth parameters.
                            });
                            
                            // register iot core path
                            const regPath = iotClient.registryPath(projectId, cloudRegion, registryId);
            
                            // specific device
                            const device = {
                                id: deviceId,
                                credentials: [
                                    {
                                        publicKey: {
                                            format: 'RSA_X509_PEM',
                                            // key: fs.readFileSync(rsaCertificateFileUrl).toString(), // path to the file in readFileSync()
                                            key: RSA_CERTIFICATE_PRIVATE_KEY
                                        },
                                    },
                                ],
                            };
            
                            // device creation request
                            const request = {
                                parent: regPath,
                                device
                            };
                            
                            try {
                                const responses = await iotClient.createDevice(request);
                                const response = responses[0];
                                console.log('Created device', response);
            
                                //////////////////////////////////////////////////////////// create topics for Pub/sub
                                //createTopicsToDevice(deviceId);
                                ////////////////////////////////////////////////////////////////
                                
                            } catch (err) {
                                console.error('Could not create device and everything else', err);
                            }
                        } 
                        haloDeviceInit();
                        case 'Hilda':
                            async function hildaDeviceInit(){
                                // global vars for iot core
                                const cloudRegion = 'us-central1';
                                //const deviceId = deviceId;
                                const deviceId = `Hilda - ${userHandle} - ${userDeviceId}`;
                                const projectId = 'sfdd-d8a16';
                                const registryId = 'Hilda';
                                const RSA_CERTIFICATE_PRIVATE_KEY = '';
                                //const rsaCertificateFileUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}`;
                    
                                // instanciate the client
                                const iotClient = new iot.v1.DeviceManagerClient({
                                    // optional auth parameters.
                                });
                                
                                // register iot core path
                                const regPath = iotClient.registryPath(projectId, cloudRegion, registryId);
                    
                                // specific device
                                const device = {
                                    id: deviceId,
                                    credentials: [
                                        {
                                            publicKey: {
                                                format: 'RSA_X509_PEM',
                                                // key: fs.readFileSync(rsaCertificateFileUrl).toString(), // path to the file in readFileSync()
                                                key: RSA_CERTIFICATE_PRIVATE_KEY
                                            },
                                        },
                                    ],
                                };
                                
                                // device creation request
                                const request = {
                                    parent: regPath,
                                    device
                                };
                                
                                try {
                                    const responses = await iotClient.createDevice(request);
                                    const response = responses[0];
                                    console.log('Created device', response);
                    
                                    //////////////////////////////////////////////////////////// create topics for Pub/sub
                                    //createTopicsToDevice(deviceId);
                                    //////////////////////////////////////////////////////////
                                    
                                } catch (err) {
                                    console.error('Could not create device and everything else', err);
                                }    
                            }
                        hildaDeviceInit();
                        default:
                            return null;    
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ error: err.code });
            });
}) 
