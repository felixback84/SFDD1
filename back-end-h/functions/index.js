// firebase
const functions = require('firebase-functions')
const { db } = require('./utilities/admin')
// express    
const app = require('express')()
// middleware for auth
const FBAuth = require('./utilities/fbAuth')
// middleware for coords of statics
const CoordsOfStatics = require('./utilities/coordsOfStatics')
//cors
const cors = require('cors')
app.use(cors({ origin: true }))

////////////////////////////////////////// HANDLERS //////////////////////////////////////////////////
// users
const { 
    signup,  
    login,
    addUserDetails,
    addCompanyDetails,
    uploadUserImage,
    getAuthenticatedUser,
    ///////// notifications
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
    //////////////////// to test mode /////////////////
    postInUserDevices,
    /////////////////////// SETTINGS FROM UX //////////
    getActiveUserDevices,
    getInactiveUserDevices,
} = require('./handlers/userDevices');
    
    // things heartbeats in general ---> commands
    const {
        heartbeatPostActiveCommand,
        heartbeatPostInactiveCommand,
    } = require('./handlers/forThingsHeartbeats');

    // liveDataSets
    const {
        heartbeatPostSearchingMode,
    } = require('./handlers/liveDataSetsUserDevices');

    // top5Tags
    const {
        getTop5TagFromUserDevice, // ux
    } = require('./handlers/top5Tags');

    // top5Products
    const {
        
    } = require ('./handlers/top5Products')

    // dataSets
    const {
        postInDataSetsUserDevice,
        getAllDataSetsUserDevice,
        getDataSetUserDevice
    } = require('./handlers/dataSets');

// helpers
const {
    // switcher coords income
    postGeoCoordsUserDeviceAppAndStopTelemetryFromThingAndUpdateLiveDataSetsPlus,
} = require('./handlers/helpers');

    ////////////////////////////////////////////////// searching modes ///////////////////////////////////////
    // searching modeOne
    const {
        postProfileToMatchUserDevices, // top5Tags from ux
        detectProfileMatchBetweenUserDevicesAndStaticDevices, // match
        detectGPSCoordsProximityRangeForUserDeviceVsStaticDevices, // meassure modeOne

        test
    } = require('./handlers/searchingModes/modeOne');

        // searching modeTwo
        const {
            selectStaticDevicesToSearchByUserDevice,  // ----> top5Tag ux picker
            deSelectStaticDevicesToSearchByUserDevice, // ----> top5Tag ux picker to eliminate
            detectGPSCoordsProximityRangeForUserDeviceVsSpecificsStaticDevice, // meassure modeTwo
        } = require('./handlers/searchingModes/modeTwo');
    
    // searching modeThree
    const {
        // es cosa de escoger cual es el buscador
        //searchStaticDevicesProductsByCategoryAndTag, // products searcher to one category and one tag
        searchStaticDevicesProductsByCategoryAndTags, // products searcher category and tags
        searchStaticDevicesProductsByCategoriesAndTags, // products searcher categories and tags ---> not yet
        // findStaticsProductsInSpecificMtsRange, ------> better search

        postListOfProductsToFind, // ---> top5Products from ux 
        meassureOfMatchesInProducts, // ----> meassure modeThree
    } = require('./handlers/searchingModes/modeThree');
    
        // searching modeFour
        const {
            // se debe seleccionar del anterior modo la lista de devices
            selectProductOfStaticDeviceToSearchByUserDevice, // ----> top5Products ux picker
            meassureOfMatchToEspecificProduct, // ----> meassure modeFour ----> to check
        } = require('./handlers/searchingModes/modeFour');

    // searching by meters
    const {
        // tags
        findStaticsInSpecificMtsRange, // ----> modeMtsOne
        postTop5TagsInUserDeviceId,

        // products
        findStaticsProductsInSpecificMtsRange, // ----> modeMtsTwo
        // postListOfProductsToFind, // ---> already exists in modeThree
    } = require('./handlers/searchingModes/byMeters');
        
// static device
const {
    getAllStaticDevices,
    getStaticDevice,
    //////////////////// to test mode
    postInStaticDevice,
    /////////////////////// 
    getActiveStaticDevices,
    getInactiveStaticDevices,
} = require('./handlers/staticDevices');

    // things staticHeartbeats in general ---> commands
    const {
        staticHeartbeatPostActiveCommand,
        staticHeartbeatPostInactiveCommand,
    } = require('./handlers/forThingsStaticsHeartbeats');

    // liveDataSets statics
    const {
        postCoordsStaticDevices, // ux staticDevices
        postProfileToSearchStaticDevices, // ux staticDevices
    } = require ('./handlers/liveDataSetsStaticDevices')

    // products
    const {
        findProductsOfStaticDevices, // UX
        postProductsToStaticDevices, // ux staticDevices
    } = require ('./handlers/products')

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
// add user details
app.post('/user/companyDetails', FBAuth, addCompanyDetails);
// post image of user
app.post('/user/image', FBAuth, uploadUserImage);
// get all own user data (auth)
app.get('/user', FBAuth, getAuthenticatedUser);
// mark if the notifications was read 
app.post('/notifications', FBAuth, markDevicesNotificationsRead);

////////////////////////////////////////////////// USERDEVICES ////////////////////////////////////////////////////////
// *************************** just to test an easily create an userDevice property
app.post('/userdevices/:deviceId/create', FBAuth, postInUserDevices)
// to make tests in general
app.get('/test/:id',test)
// ***************************

// get userDevices
app.get('/userdevices', FBAuth, getAllUserDevices); 
// get one userDevice 
app.get('/userdevices/:userDeviceId', FBAuth, getUserDevice);
// get active userDevices
app.get('/userdevices/:userDeviceId/active', FBAuth, getActiveUserDevices);
// get inactive userDevices
app.get('/userdevices/:userDeviceId/inactive', FBAuth, getInactiveUserDevices);

    ////////////////////////////////// userDevice heartbeat thing routes /////////////////////////////////////////////////
    // post active command in heartbeat things
    app.post('/userdevice/heartbeat/:thingId/active',FBAuth, heartbeatPostActiveCommand);
    // post inactive command in heartbeat things
    app.post('/userdevice/heartbeat/:thingId/inactive',FBAuth, heartbeatPostInactiveCommand);

    /////////////////////////////////////////// liveDataSets /////////////////////////////////////////////////////////
    // post search mode command in heartbeat things
    app.post('/userdevice/heartbeat/searchingmode',FBAuth, heartbeatPostSearchingMode);
    
    //////////////////////////////////////////// top5Tags ///////////////////////////////////////////////////////
    // get a specific top5Tag - ux
    app.get('/userdevices/:userDeviceId/top5tags/:top5tagId',FBAuth,getTop5TagFromUserDevice)

    /////////////////////////////////////////// top5Products /////////////////////////////////////////////////////////
    
    ////////////////////////////////////////////////// DATASETS/////////////////////////////////////////////////////////
    // post dataSets in user device 
    app.post('/user/device/:userDeviceId/dataset', FBAuth, postInDataSetsUserDevice);
    // get all dataSets in user device
    app.get('/user/device/:userDeviceId/datasets', FBAuth, getAllDataSetsUserDevice);
    // get one dataSets in user device 
    app.get('/user/device/:userDeviceId/dataset/:dataSetId', FBAuth, getDataSetUserDevice);

////////////////////////////////////////////////// searching modes ///////////////////////////////////////
/////*** */ utils
// post coords points from app in userDevice geoCoords collection -----> switcher of coords income
app.post('/userdevice/postGeoCoords',FBAuth,postGeoCoordsUserDeviceAppAndStopTelemetryFromThingAndUpdateLiveDataSetsPlus);

////*** */ modeOne
// post profile data to search for userDevice ---> before modeOne
app.post('/userdevice/profileToSearch',FBAuth, postProfileToMatchUserDevices);
// to post userDevice data to make the initial match
app.post('/userdevices/match/staticsdevices', detectProfileMatchBetweenUserDevicesAndStaticDevices); 

    /////*** */ modeTwo
    // post to selectStaticDeviceToSearch by userDevice ---> more than one now - before modeTwo
    app.post('/userdevice/selectStaticDevicesToSearch',FBAuth,selectStaticDevicesToSearchByUserDevice);
    // post to unselectStaticDeviceToSearch by userDevice 
    app.post('/userdevice/deSelectStaticDevicesToSearch',FBAuth,deSelectStaticDevicesToSearchByUserDevice);

/////*** */ mode three
// search of static devices products according to one category and one tag it has
//app.get('/staticdevice/products/category/:category/tag/:tag',FBAuth, searchStaticDevicesProductsByCategoryAndTag)
// search of static devices products according to one category and tags it has
app.post('/staticdevice/products/category/tags',FBAuth, searchStaticDevicesProductsByCategoryAndTags)
// search of static devices products according to one categories and tags it has ---> not yet
app.post('/staticdevice/products/categories/tags',FBAuth, searchStaticDevicesProductsByCategoriesAndTags)
// to post list of products to find his positions and owners
app.post('/userdevice/postlistofproducts', postListOfProductsToFind) // before modeThree

    /////*** */ mode four
    // post product to Search by userDevice ---> before modeFour
    app.post('/userdevice/selectProductOfStaticDeviceToSearchByUserDevice',FBAuth,selectProductOfStaticDeviceToSearchByUserDevice);

/////*** */ bymeters
// to post and find wich statics are close to me by geohash
app.get('/staticdevices/findstatics/lat/:lat/lng/:lng/mts/:mts', findStaticsInSpecificMtsRange)
// top post staticDevices list results of search
app.post('/userdevice/create/top5tags',FBAuth, postTop5TagsInUserDeviceId)

// to post and find wich statics products are closer to me with several filters
app.get('/userdevice/findstaticsProducts/category/:category/lat/:lat/lng/:lng/mts/:mts',findStaticsProductsInSpecificMtsRange)

/////////////////////////////////////////////// STATIC DEVICES ///////////////////////////////////////////////////
// *************************** just to test an easily create an staticDevice property
app.post('/staticdevices/:staticId/create', FBAuth, postInStaticDevice);
// get all static devices
app.get('/staticdevices', FBAuth, getAllStaticDevices);
// get specific static device
app.get('/staticdevices/:staticdevice', FBAuth, getStaticDevice);
// get active staticDevices
app.get('/staticdevices/:staticDeviceId/active', FBAuth, getActiveStaticDevices);
// get inactive staticDevice
app.get('/staticdevices/:staticDeviceId/inactive', FBAuth, getInactiveStaticDevices);

    ////////////////////////////////// staticDevice heartbeat thing routes /////////////////////////////////////////////////
    // post active command in static heartbeat things
    app.post('/staticdevice/staticheartbeat/:thingId/active',FBAuth, staticHeartbeatPostActiveCommand);
    // post inactive command in static heartbeat things
    app.post('/staticdevice/staticheartbeat/:thingId/inactive',FBAuth, staticHeartbeatPostInactiveCommand);
    
    ////////////////////////////////////////////////////// static liveDataSets ///////////////////////////////////////////
    // post coords data in staticHearbeat
    app.post('/staticdevice/coords',FBAuth, postCoordsStaticDevices);
    // post profile data in staticHearbeat
    app.post('/staticdevice/profileToSearch',FBAuth, postProfileToSearchStaticDevices);

    ///////////////////////////////////////// products ////////////////////////////////////////////
    // find porducts wich offer the vendors
    app.get('/staticdevice/products/:thingId',FBAuth, findProductsOfStaticDevices)
    // post products in statics
    app.post('/staticdevice/thingId/:thingId/postproducts',FBAuth,CoordsOfStatics,postProductsToStaticDevices)

////////////////////////////////////////////////// DEVICES ////////////////////////////////////////////////////////
// get all devices
app.get('/devices', getAllDevices);
// get one device:public
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
        
        /////////////////////////////////////////////////////////////// create liveDataSets doc in collection //////////////////////////////////
        db
            .doc(`/userDevices/${userDeviceId}`)
            .collection('liveDataSets')
            .doc(thingId)
            .set(dataSetModel)
            .catch((err) => {
                console.error(err);
            });
        /////////////////////////////////////////////////////////////// create geoCoords doc in collection //////////////////////////////////    
        db
            .doc(`/userDevices/${userDeviceId}`)
            .collection('geoCoords')
            .doc(thingId)
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
        // geofire
        const geofire = require('geofire-common');
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
                    createdAt:obj.createdAt,
                    thingId:obj.thingId,
                    nameOfDevice:obj.nameOfDevice,
                    active:obj.active,
                    connectionStatus:obj.connectionStatus,
                    batteryLife:obj.batteryLife,
                    disabledTelemetry:obj.disabledTelemetry,
                    coords:{
                        lat:obj.coords.lat,
                        lon:obj.coords.lon,
                        hash:geofire.geohashForLocation([obj.coords.lat, obj.coords.lon]),
                        nameOfPoint:obj.coords.nameOfPoint
                    },
                })
                .then(()=>{
                     // save data in geoCoords collection
                    return db
                        .doc(`/userDevices/${userDeviceIdOrStaticDeviceId}`)
                        .collection('geoCoords')
                        .add({
                            createdAt: new Date().toISOString(),
                            coords: {
                                lat:obj.coords.lat,
                                lon:obj.coords.lon, 
                                hash:geofire.geohashForLocation([obj.coords.lat,obj.coords.lon]),
                                nameOfPoint:obj.coords.nameOfPoint
                            } 
                        })
                        .catch((err) => {   
                            console.error(err);
                        });
                })
            
            //////////////////////////////////////////////////// GPS LOGIC FOR USERDEVICES //////////////////////////////////////////////////////
            // init process to make the meassures of the gps coords in heartbeat things
            if(obj.active == 'true'){ 
                return dbDataFromLiveDataSets
                    .get()    
                    .then(async(doc)=>{
                        // conditions
                        let searchingMode = doc.data().searchingMode
                        // data to pass
                        let data = doc.data() 
                        // print
                        console.log(
                            `searchingMode & dataToMeassure: 
                            ${JSON.stringify(searchingMode)} - 
                            ${JSON.stringify(data)}`
                        );
                        //////////////////////////////////////////////////// GPS MEASSURE MODES /////////////////////////////////////////////////////
                        // import
                        const {
                            objFromDBToMeassureProcess
                        } = require('./handlers/utilsForThings');
                        // picker mode 
                        // to selected and match with tags
                        if(searchingMode[0] === "modeOne"){
                            // run it meassure GPS coords for the userDevice and all the matches statics
                            await detectGPSCoordsProximityRangeForUserDeviceVsStaticDevices(
                                await objFromDBToMeassureProcess(searchingMode[0],data,userDeviceIdOrStaticDeviceId)
                            );
                            // print 
                            console.log("say hello to my little friend from thing modeOne")
                        } else if(searchingMode[0] === "modeTwo"){
                            // to specific staticDevice (vendors)
                            // run it meassure GPS for a specific static device pick by the user
                            const res = await objFromDBToMeassureProcess(searchingMode[0],data,userDeviceIdOrStaticDeviceId)
                            const resfin = await res
                            console.log(`resfin:${JSON.stringify(resfin)}`)
                            await detectGPSCoordsProximityRangeForUserDeviceVsSpecificsStaticDevice(
                                resfin
                            );
                            // print 
                            console.log("say hello to my little friend from thing modeTwo")
                        }  else if(searchingMode[0] === "modeThree"){
                            // to selected products
                            await meassureOfMatchesInProducts(
                                await objFromDBToMeassureProcess(searchingMode[0],data,userDeviceIdOrStaticDeviceId)
                            );
                            // print 
                            console.log("say hello to my little friend from thing modeThree")
                        } else if (searchingMode[0] === "modeFour"){
                            // to specific product  
                            meassureOfMatchToEspecificProduct(
                                await objFromDBToMeassureProcess(searchingMode[0],data,userDeviceIdOrStaticDeviceId)
                            ) // ---> make capable of meassure in more than one product
                            // print 
                            console.log("say hello to my little friend from thing modeFour")
                        } else if (searchingMode[0] === "modeFive"){
                            // run it meassure GPS coords for the userDevice and all the matches statics
                            await detectGPSCoordsProximityRangeForUserDeviceVsStaticDevices(
                                await objFromDBToMeassureProcess(searchingMode[0],data,userDeviceIdOrStaticDeviceId)
                            );
                            // print 
                            console.log("say hello to my little friend from thing modeFive")
                        } else if (searchingMode[0] === "modeSix"){
                            // to specific product  
                            meassureOfMatchesInProducts(
                                await objFromDBToMeassureProcess(searchingMode[0],data,userDeviceIdOrStaticDeviceId)
                            ) 
                            // print 
                            console.log("say hello to my little friend from thing modeSix")
                        }
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
            //////////////////////////////////////////////////// GPS LOGIC FOR STATICDEVICES //////////////////////////////////////////////////////
            // init process to make the meassures of the gps coords in heartbeat things
            // if(obj.active == 'true'){ 
            //     return dbDataFromLiveDataSets
            //         .get()    
            //         .then((doc)=>{
            //             let dataDB = doc.data()
            //             // run it meassure GPS coords
            //             detectGPSCoordsProximityRangeToStaticsHearbeats(dataDB);  
            //         })
            //         .catch((err) => {
            //             console.error(err);
            //         });
            // }
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
            // run it to notificate the users of the inactive state of things
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

