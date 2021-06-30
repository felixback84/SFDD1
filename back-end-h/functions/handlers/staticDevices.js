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
                        // now save the select info of .doc (device) of the collection
                        let selectInfoStatic = {
                            nameOfDevice: doc.data().nameOfDevice,
                            description: doc.data().description,
                            coverUrl: doc.data().coverUrl,
                            videoUrl: doc.data().videoUrl,
                            badgeUrl: doc.data().badgeUrl,
                            createdAt: doc.data().createdAt,
                            dataSets: doc.data().dataSets
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

///////////////////////////////////////////// SETTINGS TO THING FROM UX  //////////////////////////////////////////////////
// pass data of statics users means coords 
exports.postCoordsStaticDevices = (req, res) => {
    // geofire
    const geofire = require('geofire-common');
    // profile of dynamic
    let objWithCoordsOfStatic = req.body.objWithCoordsOfStatic;
    // db part
    // userDeviceId 
    const staticDeviceId = objWithCoordsOfStatic.thingId.split("-").slice(2);
    db
        .doc(`/staticDevices/${staticDeviceId}`)
        .collection('liveDataSets')
        .doc(objWithCoordsOfStatic.thingId)
        .update(
            { 
                thingId: objWithCoordsOfStatic.thingId,
                coords:{
                    lat:objWithCoordsOfStatic.coords.lat,
                    lon:objWithCoordsOfStatic.coords.lon,
                    hash: geofire.geohashForLocation([
                            objWithCoordsOfStatic.coords.lat,
                            objWithCoordsOfStatic.coords.lon
                        ])
                }
            }
        )
        .then(() => {
            console.log(objWithCoordsOfStatic)
            // res
            return res.json(objWithCoordsOfStatic);
        })            
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });   
}

// pass data of statics users means profile
exports.postProfileToSearchStaticDevices = (req, res) => {
    // profile of dynamic
    let objWithProfileToSearchOfStatic = req.body.objWithProfileToSearchOfStatic;
    // db part
    // userDeviceId 
    const staticDeviceId = objWithProfileToSearchOfStatic.thingId.split("-").slice(2);
    db
        .doc(`/staticDevices/${staticDeviceId}`)
        .collection('liveDataSets')
        .doc(objWithProfileToSearchOfStatic.thingId)
        .update({ profileToSearch: objWithProfileToSearchOfStatic.profileToSearch, })
        .then(() => {
            console.log(objWithProfileToSearchOfStatic)
            // res
            return res.json(objWithProfileToSearchOfStatic);
        })            
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });  
}

// post products in statics
exports.postProductsToStaticDevices = (req, res) => {
    // product data var
    const productData = req.body.productData
    // geofire
    const geofire = require('geofire-common');
    // obj
    const productDataToPost = {
        name:productData.name,
        tags:productData.tags,
        category:productData.category,
        staticDeviceProperty:productData.staticDeviceProperty,
        description:productData.description,
        familyOfDevices:productData.familyOfDevices,
        imgUrl:productData.imgUrl,
        price:productData.price,
        createdAt:new Date().toISOString(),
        geoHash:geofire.geohashForLocation([productData.coords.lat,productData.coords.lon]),
    }
    // db part
    db
        .collection('products')
        .add(productDataToPost)
        .then(()=>{
            return res.json(productDataToPost);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        }); 
}

// search of static devices according to the categories and tags it has
exports.searchStaticDevicesByCategoriesAndTags = (req, res) => {
    // var to hold results
    let resultsOfProductsInDB = []
    // db part
    db
        .collection('products')
        .where('category','==',req.params.category)
        .where('tags','==',req.params.tags)
        .get()
        .then((data)=>{
            // chack if exists data
            if (data.empty) {
                return res.status(400).json({ error: 'This product dosen´t exists' });
            } else {
                data.forEach((doc)=>{
                    // push data to an array
                    resultsOfProductsInDB.push({
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
                })
                // res
                return res.json(resultsOfProductsInDB);
            }
        })
        .catch(err => {
            res.status(500, err);
        })
}

// find porducts wich offer the vendors
exports.findProductsOfStaticDevices = async (req, res) => {
    // staticDeviceId
    const staticDeviceId = req.params.staticDeviceId
    // print
    console.log({staticDeviceId})
    // arr with results
    let arrProducts = []

    const run = async (staticDeviceId,res) => {

        // db part
        let refDB = await db
            .collection('products')
            
        // db result
        let result = await refDB
            .where('staticDeviceProperty','==',staticDeviceId)
            .get()

        // loop
        for (product of result.docs) {
            // print
            console.log(`id doc: ${product.id}`)
            // push in the arr
            arrProducts.push({
                ...product.data()
            })
        }
        // print
        console.log(`products of vendors: ${JSON.stringify(arrProducts)}`)
        // res
        let responseArr = await arrProducts
        // send res to client
        return res.json(responseArr)
    } 

    // run it & catch it
    try {
        await run(staticDeviceId,res)
    } catch (err) {
        console.log('Error getting documents', err)
    }
}







