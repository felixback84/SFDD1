// firebase
const { admin, db } = require('../../utilities/admin');
const {
    deleteAllDocsInTop5TagsCollectionOfUserDeviceId
} = require('../utilsForThings')

// ** modeSeven
// to find wich statics are close to me (dynamic,userDevice) by geohash only for app
exports.findStaticsInSpecificMtsRange = (req,res) => {
    // geofire
    const geofire = require('geofire-common');
    // var to hold arr with coords
    const center = [parseFloat(req.params.lat),parseFloat(req.params.lng)]
    // var to hold mts range
    const radiusInM = req.params.mts
    // list of statics
    const bounds = geofire.geohashQueryBounds(center, radiusInM);
    const promises = [];
    // pass the limits
    for (const bound of bounds) { 
        const query = db.collectionGroup('liveDataSets')
            .where('nameOfDevice','==','staticHeartbeat')
            .orderBy('coords.hash')
            .startAt(bound[0])
            .endAt(bound[1]);
        // push data in promises list
        promises.push(query.get().catch(err => {
            console.log(err)
        }));
    } 
    // Collect all the query results together into a single list
    Promise
        .all(promises)
        .then((snapshots) => {
        // matchings docs
        const matchingDocs = [];
        // loops
        for (const snap of snapshots) {
            for (const doc of snap.docs){
                // print
                console.log(`doc:${JSON.stringify(doc.data())}`)
                // coords vars
                const lat = doc.data().coords.lat
                const lng = doc.data().coords.lon
                // We have to filter out a few false positives due to GeoHash accuracy, but most will match
                const distanceInKm = geofire.distanceBetween([lat, lng], center);
                const distanceInM = distanceInKm * 1000;
                // checker distances in range
                if (distanceInM <= radiusInM) {
                    matchingDocs.push(
                        {
                            profileToSearch:doc.data().profileToSearch,
                            meters:distanceInM,
                            coords:doc.data().coords,
                            thingId:doc.data().thingId
                        }
                    );
                }
            }
        }
        // res
        res.json(matchingDocs)
        // return docs
        return matchingDocs;
    })
    .then((matchingDocs) => {
        matchingDocs.forEach((doc)=>{
            // Process the matching documents
            console.log(`doc final:${JSON.stringify(doc.data())}`)
        })
    })
    .catch(err => {
        console.log(err)
    })
}

// top post staticDevices list results (selection) of after top5tags search ---> after above
exports.postTop5TagsInUserDeviceId = async (req,res) => {

    // to save data in db
    let recSelection = async (mts,thingId,staticDevicesId,docRef) => {
        // to deal with arr 
        const FieldValue = admin.firestore.FieldValue
        // empty obj to fill
        let selectData = {}
        // print
        console.log("part db save")
        // db part to extract statics
        const docsStaticDevices = await db
            .doc(`/staticDevices/${staticDevicesId.split("-").slice(2)}/liveDataSets/${staticDevicesId}`)
            .get()
            .then((doc)=>{
                selectData = {
                    coords: doc.data().coords,
                    profileToSearch: doc.data().profileToSearch,
                    meters: mts,
                    thingId:staticDevicesId,
                }
            })
            .then(async()=>{
                const userData = await db
                    .collection('users')
                    .doc(staticDevicesId.split("-").slice(0,1).toString()) // static users
                    .get()
                    .then((doc)=>{
                        selectData.userCredentials = {
                            email:doc.data().email,
                            companyName: doc.data().companyName,
                            bio: doc.data().bio,
                            imgUrl: doc.data().imgUrl,
                            lastname: doc.data().lastname,
                            names: doc.data().names,
                            type: doc.data().type,
                            userHandle: doc.data().userHandle
                        } 
                    })
                    console.log("part 5 - extract userCredentials")
            })
            .then(async()=>{
                console.log("part 6 - add data to db")
                docRef
                    .add({
                        ...selectData
                    })
                    .then((doc) => {
                        
                        // obj to update arr
                        const newTop5Tag = [{
                            thingIdToSearch:staticDevicesId,
                            top5TagDocId:doc.id
                        }]
                        // print
                        console.log(`final data in top5Tags for the userDevice: ${JSON.stringify(selectData)}`)
                        // liveDataSets update 
                        let infoInLiveDataSets = db
                            .doc(`/userDevices/${thingId.split("-").slice(2)}/liveDataSets/${thingId}`)
                        // update
                        infoInLiveDataSets
                            .update({           
                                idOfSpecificStaticDevices: FieldValue.arrayUnion(...newTop5Tag)
                            })
                            .then(()=>{
                                res.json("staticDevice marked")
                            })
                            .catch(err => {
                                res.status(500, err)
                            })
                        // res to client
                        res.json(selectData)
                    })            
                    .catch((err) => {
                        console.error(err)
                    })
            })
            .catch((err) => {
                console.error(err)
            })   
    }

    // fill the date of the first req to know if is necessary erase the last
    let espCounter = req.body.espCounter
    // print
    console.log({espCounter})
    // only to the first req
    console.log("part 1")
    // vars with ids
    let thingId = req.body.resultListSearch.thingId,
        staticDevicesId = req.body.resultListSearch.staticDevicesId,
        meters = req.body.resultListSearch.meters,
        // userDeviceId 
        userDeviceId = thingId.split("-").slice(2),
        // userHandle
        userHandle = thingId.split("-").slice(0,1).toString();
    // print 
    console.log(`${thingId} - ${staticDevicesId} - ${userDeviceId} - ${userHandle}`)
    // db part
    let docRef = await db
        .doc(`/userDevices/${userDeviceId}`)
        .collection('top5Tags')

    // check if is the first record to make
    if(espCounter === 0){
        return docRef
            .get()
            .then(async (data)=>{
                // check if already exists a top5Tags docs list
                if(data.empty){
                    // print 
                    console.log(`part 1a - ${espCounter}`)
                    // run it 
                    recSelection(meters,thingId,staticDevicesId,docRef)
                    // print
                    console.log("part 2")
                } else {
                    // check before erase the date. Less than time range
                    await deleteAllDocsInTop5TagsCollectionOfUserDeviceId(
                        db,`/userDevices/${userDeviceId}/top5Tags`
                    )
                    // run it 
                    recSelection(meters,thingId,staticDevicesId,docRef)   
                }
                // deletion of any old record in top5Tags that expire
                console.log(espCounter != 0 && req.body.newDate > initialDate + 20000)
            })
            .catch((err) => {
                console.error(err)
            })
    } else if(espCounter > 0){
        // run it 
        recSelection(meters,thingId,staticDevicesId,docRef)
        console.log("part 3a")
    }
}

// ** modeEight
// get products with geohash & filters
exports.findStaticsProductsInSpecificMtsRange = async (req,res) => {
    // geofire
    const geofire = require('geofire-common')
    // var to hold arr with coords
    const center = [parseFloat(req.params.lat),parseFloat(req.params.lng)]
    // var to hold mts range
    const radiusInM = req.params.mts
    // list of statics
    const bounds = geofire.geohashQueryBounds(center, radiusInM)
    const promises = []
    // pass the limits
    for (const bound of bounds) {
        const query = await db
            .collection('products')         
            .where('categories','array-contains',req.params.category)
            .orderBy('coords.hash')
            .startAt(bound[0])
            .endAt(bound[1]);
        // push data in promises list
        promises.push(query.get().catch(err => {
            console.log(err)
        }))
    }

    // vars to hold all data of the matchings docs
    const matchingDocs = []
    let counter = 0
    // Collect all the query results together into a single list
    Promise.all(promises)
        .then(async(snapshots) => {
            // just meassure coords of product and user position
            const hiMeassure = async (document) => {
                // coords from doc
                let coords = document.data().coords
                // print
                console.log(`data with coords:${JSON.stringify(coords)}`)
                // distance meassure
                const distanceInKm = await geofire.distanceBetween(
                    [parseFloat(coords.lat),
                    parseFloat(coords.lon)],
                    center
                )
                // km to mts
                const distanceInM = distanceInKm * 1000
                // print
                console.log(`distanceInKm:${JSON.stringify(distanceInM)}`)
                // checker distances in range
                if(distanceInM <= radiusInM){
                    // push data in arr
                    matchingDocs.push({
                        product:{
                            ...document.data(),
                            productId:document.id,
                        },
                        meters:distanceInM,
                    })
                } else {
                    console.log(`hi there not item after distance filter`)
                }  
            }
            // looping loop
            for(const snap of snapshots){
                for(const doc of snap.docs){
                    // run it
                    await hiMeassure(doc)
                }
            } 
            return matchingDocs
        })  
        .then(async(matchingDocs)=>{
            // extract companyData
            const extractCompanyDataAndPassExtraData = async (matchingDocs) => {
                // loop over result of matching docs
                for(let doc of matchingDocs){
                    // vars
                    let outputObjFromCompanyData = {}
                    // extract userHandle
                    const userHandle = doc.product.staticDeviceProperty.split("-").slice(0,1).toString()
                    // db connection
                    db
                        .collection(`/users/${userHandle}/companyData`)
                        .get()
                        .then(snapshot => {
                            // check if exists
                            if (snapshot.empty) {
                                console.log('No matching documents.')
                            } else {
                                snapshot.forEach(doc => {
                                    outputObjFromCompanyData = {
                                        companyName:doc.data().companyName,
                                        localPicUrl:doc.data().localPicUrl,
                                    }
                                })
                            }
                        })
                        .then(()=>{
                            // userHandle
                            let companyName = doc.product.companyName
                            // check to push in the right item
                            if(companyName === outputObjFromCompanyData.companyName){
                                counter++
                                console.log("hi sun")
                                // pass data
                                doc.companyData = outputObjFromCompanyData 
                                // check the res to send
                                if(matchingDocs.length === counter){
                                    res.json(matchingDocs)
                                }
                            }else{
                                console.log("hi moon") 
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        }) 
                }
            }
            // run it
            await extractCompanyDataAndPassExtraData(matchingDocs)
        })
        .catch(err => {
            console.log(err)
        }) 
}

// top post staticDevices products list results (selection) of after top5Products search ---> after above
exports.postTop5ProductsInUserDeviceId = async (req,res) => {
    // data from client
    const dataFromClient = req.body.resultListSearch
    // thingId
    const thingId = req.body.thingId
    // counter
    let espCounter = req.body.espCounter
    // update fields in liveDataSets userDeviceId
    const liveDataSetsUpdate = async (dataFromClient,thingId) => {
        // obj to update arr
        const newTop5Product = [{
            thingIdToSearch:dataFromClient.product.staticDeviceProperty,
            top5ProductDocId:dataFromClient.product.productId
        }]
        // to deal with arr 
        const FieldValue = admin.firestore.FieldValue
        // db part
        let liveDataSetsForUserDeviceId = await db.
            doc(`/userDevices/${thingId.split("-").slice(2).toString()}/liveDataSets/${thingId}`)
                .update({           
                    idOfSpecificProducts: FieldValue.arrayUnion(...newTop5Product)
                })
                .then(()=>{
                    console.log("staticDevice product marked")
                })
                .catch((err) => {
                    console.error(err)
                }) 
    }
    // loop
    for(let doc of dataFromClient){
        // run it 
        await liveDataSetsUpdate(doc,thingId)
    }
    // create docs with top5Products
    const top5ProductsCreationList = (dataFromClient,thingId) => {
        let counter = 0
        // db part
        for(let doc of dataFromClient){
            const dbData = db
                .doc(`/userDevices/${thingId.split("-").slice(2).toString()}`)
                .collection('top5Products')
                .add({...doc})
                .then(()=>{
                    console.log("product saved in db")
                    counter++
                    // check to send res
                    if(dataFromClient.length === counter){
                        res.json("products now in db")
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    // to run top5ProductsCreationList
    const checker = async (thingId) => {
        // userDeviceId
        const userDeviceId = thingId.split("-").slice(2)
        // check if is the first record to make
        if(espCounter === 0){
            // db part top5Products
            let docRef = await db
                .doc(`/userDevices/${userDeviceId}`)
                .collection('top5Products')
                .get()
                .then(async(data)=>{
                    // check if already exists a top5Tags docs list
                    if(data.empty){
                        // print 
                        console.log(`part 1a - ${espCounter}`)
                        // run it
                        top5ProductsCreationList(dataFromClient,thingId)
                        // print
                        console.log("part 2")
                    } else {
                        // check before erase the date. Less than time range
                        await deleteAllDocsInTop5TagsCollectionOfUserDeviceId(
                            db,`/userDevices/${userDeviceId}/top5Tags`
                        )
                        // run it
                        top5ProductsCreationList(dataFromClient,thingId)  
                    }
                    // deletion of any old record in top5Tags that expire
                    console.log(espCounter != 0 && req.body.newDate > initialDate + 20000)
                })
                .catch((err) => {
                    console.error(err)
                })
        } else if(espCounter > 0){
            console.log("part 3a")
            // run it
            top5ProductsCreationList(dataFromClient,thingId)
        }
    }
    // run it
    await checker(thingId)
}