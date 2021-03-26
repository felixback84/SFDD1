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
                                thingId:resultOfCoord.thingId
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
                // underscore lib
                let _ = require('underscore');
                // make groups
                let groups = _.groupBy(allData,"thingId")
                // print
                console.log(`groups:${JSON.stringify(groups)}`)
                // return
                return groups
            })
            .then((data)=>{
                // db part to save data
                db
                    .doc(`/userDevices/${userDeviceId}`)
                    .collection('liveDataSets')
                    .doc('CarlosTal84-Heartbeat-PT44TQIpPyLJXRBqXZAQ')
                    .update({
                        top5Products:data
                    })
                    .catch(err => {
                        res.status(500, err);
                    })
            })
            .catch(err => {
                res.status(500, err);
            })
    }
    // run it to begin
    await toMakelistOfCoords()
}

// method to make the meassuremnt with the list of coincidence in products
exports.meassureOfMatchesInProducts = async (req, res) => {
    console.log("hi")
}


