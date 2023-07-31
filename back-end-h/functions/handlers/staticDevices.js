// firebase
const { db } = require('../utilities/admin');

// post staticDevice means create property
exports.postInStaticDevice = (req,res) => {
	// obj to save data in db
	const newStaticDevice = {
		staticId: req.params.staticId,
		createdAt: new Date().toISOString(),
		userHandle: req.user.userHandle,
		active: false, 
		thingId: ''
	};

	// object to hold all info
    let allStaticDeviceData = {};
    allStaticDeviceData = newStaticDevice;

	// firebase db part
	db
        .collection('staticDevices')
        .where('userHandle', '==', req.user.userHandle)
        .where('staticId', '==', req.params.staticId)
        .limit(1)
        .get()
        .then((data) => {
            if (!data.empty) {
                return res.status(404).json({ error: 'Static is already yours' });
            } else {
                
                db
                    .doc(`/statics/${req.params.staticId}`)
                    .get()
                    .then((doc) => {
                        // clean values to create empty dataSets stuctures on the staticDevices properties
                        const dataSets = doc.data().dataSets
                        const dataSetsCleanOfValues = {}
                        Object.keys(dataSets.profileToSearch).forEach((key)=>{
                            dataSetsCleanOfValues[key] = []
                        })
                        let total = {
                            ...dataSets,
                        }
                        total.profileToSearch = dataSetsCleanOfValues
                        // now save the select info of .doc (device) of the collection
                        let selectInfoStatic = {
                            nameOfDevice: doc.data().nameOfDevice,
                            description: doc.data().description,
                            coverUrl: doc.data().coverUrl,
                            videoUrl: doc.data().videoUrl,
                            badgeUrl: doc.data().badgeUrl,
                            createdAt: doc.data().createdAt,
                            dataSets: total
                        };
                        allStaticDeviceData.device = selectInfoStatic;
                        // write in global object
                        return db
                            .collection('staticDevices')
                            .add(allStaticDeviceData)  
                    })
                    .then(() => {
                        return res.json(allStaticDeviceData);
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
}

// get all staticDevices
exports.getAllStaticDevices = (req,res) => {
	let staticDevices = [];
    db
        .collection('staticDevices')
        .where('userHandle', '==', req.user.userHandle)
        .get()
        .then((data)=> {
            data.forEach((doc) => {
                staticDevices.push({
                    staticDeviceId: doc.id,
                    userHandle: doc.data().userHandle,
                    active: doc.data().active,
                    createdAt: doc.data().createdAt,
                    device: doc.data().device,
                    staticId: doc.data().staticId,
                    thingId: doc.data().thingId
                });
            });
            return res.json(staticDevices);
        })    
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

// get a specific staticDevice
exports.getStaticDevice = (req,res) => {
	let staticDeviceData;
    db
        .doc(`/staticDevices/${req.params.staticDeviceId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'staticDevice not found' });
            }
        	staticDeviceData = doc.data();
            staticDeviceData.staticDeviceId = doc.id;
            return res.json(staticDeviceData);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

// get active staticDevices
exports.getActiveStaticDevices = async (req, res) => {
    // ask to if ther any device active
    const activeStaticDeviceDocument = db
        .collection('activeStaticDevices')
        .where('userHandle', '==', req.user.userHandle)
        .where('active', '==', true)
        .limit(1)

    // ask for device
    const staticDeviceDocument = db.doc(`/staticDevices/${req.params.staticDeviceId}`); 
    // global var to hold all data
    let staticDeviceData;
    // ask if exists this device
    staticDeviceDocument
        .get()
        .then((doc) => {
            if (doc.exists) {
                staticDeviceData = doc.data();
                staticDeviceData.staticDeviceId = doc.id;
                // return active device
                return activeStaticDeviceDocument.get();
            } else {
                return res.status(404).json({ error: 'staticDevice not found' });
            }
        })
        // check if is empty this kind of item in the activeDevices collection
        .then((data) => {
            if (data.empty) {
                //console.log(data);
                return db
                    // add data to it
                    .collection('activeStaticDevices')
                    //////////////////////////////////////////////////
                    .add({
                        staticDeviceId: req.params.staticDeviceId,
                        userHandle: req.user.userHandle,
                        createdAt: new Date().toISOString(),
                        active: true,
                        /// esto deberia extraerse del modelo de datos de cada dispositivo, los modos (active or not active) deberian ser una colleción especial
                        activeThing: false
                    })
                    /////////////////////////////////////////////////
                    .then(() => {
                        return staticDeviceDocument.update({ active: true });
                    })
                    .then(() => {
                        return res.json(staticDeviceData);
                    });
            } else {
                return res.status(400).json({ error: 'staticDevice already active' });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });   
}

// get inactive staticdevice
exports.getInactiveStaticDevices = (req, res) => {
    const activeStaticDeviceDocument = db
		.collection('activeStaticDevices')
		.where('userHandle', '==', req.user.userHandle)
		.where('staticDeviceId', '==', req.params.staticDeviceId)
		.where('active', '==', true)
		.limit(1);

    const staticDeviceDocument = db.doc(`/staticDevices/${req.params.staticDeviceId}`);
    let staticDeviceData;
    
    staticDeviceDocument
        .get()
        .then((doc) => {
            if (doc.exists) {
                staticDeviceData = doc.data();
                staticDeviceData.staticDeviceId = doc.id;
                return activeStaticDeviceDocument.get();
            } else {
                return res.status(404).json({ error: 'staticDevice not found' });
            }
        })
        .then((data) => {
            if (data.empty) {
                return res.status(400).json({ error: 'Device not active' });
            } else {
                return db
                    .doc(`/activeStaticDevices/${data.docs[0].id}`)
                    .delete()
                    .then(() => {
                        return staticDeviceDocument.update({ active: false });
                    })
                    .then(() => {
                        res.json(staticDeviceData);
                    });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });   
}












