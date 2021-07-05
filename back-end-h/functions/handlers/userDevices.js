// firebase
const { admin, db } = require('../utilities/admin');
// thing commands
const {    
    heartbeatPostToDisablePublishTelemetry,
    heartbeatPostToEneablePublishTelemetry,
} = require('./forThingsHeartbeats');
//_
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



///////////////////////////////////////////// SETTINGS TO THING FROM UX //////////////////////////////////////////////////
// pass data of statics users means profileToMatch








