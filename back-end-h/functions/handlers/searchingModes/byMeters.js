/*
    modeSeven and modeEight
*/

// firebase
const { db } = require('../../utilities/admin');
const {
    deleteAllDocsInTop5TagsCollectionOfUserDeviceId
} = require('../utilsForThings')


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

// top post staticDevices list results of top5tags search
exports.postTop5TagsInUserDeviceId = async (req,res) => {

    // to save data in db
    let rec = async (mts,staticDevicesId,docRef) => {
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
                    thingId,
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
                    .then(() => {
                        // print
                        console.log(`final data in top5Tags for the userDevice: ${JSON.stringify(selectData)}`)
                        // res
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
    console.log({espCounter})
    // to hold the date of the first record
    // date and counter
    // let initialDate = req.body.initialDate
    // console.log({initialDate})
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
            //.collection('top5Tags')
            .get()
            .then(async (data)=>{
                // check if already exists a top5Tags docs list
                if(data.empty){
                    // print 
                    console.log(`part 1a - ${espCounter}`)
                    // run it 
                    rec(meters,staticDevicesId,docRef)
                    // print
                    console.log("part 2")
                } else {
                    // check before erase the date. Less than time range
                    await deleteAllDocsInTop5TagsCollectionOfUserDeviceId(
                        db,`/userDevices/${userDeviceId}/top5Tags`
                    )
                    // run it 
                    rec(meters,staticDevicesId,docRef)   
                }
                // deletion of any old record in top5Tags that expire
                console.log(espCounter != 0 && req.body.newDate > initialDate + 20000)
            })
            .catch((err) => {
                console.error(err)
            })
    } 
    // continue with the process to erase all docs in top5Tags
    // else if(espCounter > 0 && req.body.newDate > initialDate + 20000){
    //     deleteAllDocsInTop5TagsCollectionOfUserDeviceId(db,`/userDevices/${userDeviceId}/top5Tags`)
    //     console.log("part 3")
    // } 
    // continue with the process to add new docs in the list of top5Tags
    // else if(espCounter > 0 && req.body.newDate < initialDate + 20000) {
    else if(espCounter > 0){
        // run it 
        rec(meters,staticDevicesId,docRef)
        console.log("part 3a")
    }
}

// get products with geohash & filters
exports.findStaticsProductsInSpecificMtsRange = async (req,res) => {
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
        const query = db
            .collection('products')
            .where('category','==',req.params.category)
            .orderBy('geoHash')
            .startAt(bound[0])
            .endAt(bound[1]);
        // push data in promises list
        promises.push(query.get().catch(err => {
            console.log(err)
        }));
    }

    // vars to hold matchings docs
    const matchingDocs = [];
    const listOfItems = []
    
    // Collect all the query results together into a single list
    Promise.all(promises)
        .then(async(snapshots) => {
            // func
            async function dbFunc(document){
                // run it
                let staticDeviceProperty = document.data().staticDeviceProperty
                // print
                console.log(`staticDeviceProperty:${staticDeviceProperty}`)
                // db part to get coords of products
                let item = db
                    .doc(`/staticDevices/${staticDeviceProperty.split("-").slice(2).toString()}`)
                    .collection('liveDataSets')
                    .where('thingId','==',staticDeviceProperty)
                    .get()
                    .then((data)=>{
                        data.forEach((doc)=>{
                            coords = doc.data().coords
                        })
                        console.log(`coords in db process:${JSON.stringify(coords)}`)
                        return coords
                    })
                    .then((data)=>{
                        console.log(`data with coords:${JSON.stringify(data)}`)
                        const distanceInKm = geofire.distanceBetween([parseFloat(data.lat),parseFloat(data.lon)], center);
                        console.log(`distanceInKm:${JSON.stringify(distanceInKm)}`)
                        const distanceInM = distanceInKm * 1000;
                        // checker distances in range
                        if(distanceInM <= radiusInM){
                            // push data in arr
                            matchingDocs.push(document.data())
                            // print
                            console.log(`hi there is item after distance filter`)
                            return
                        } else {
                            console.log(`hi there not item after distance filter`)
                        }    
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    // push item in list
                    listOfItems.push(item)
            }

            // loops
            for(const snap of snapshots){
                for(const doc of snap.docs){
                    // run it
                    await dbFunc(doc)
                }
            } 
            // final process with promise
            Promise.all(listOfItems)
                .then(()=>{
                    return matchingDocs
                })
                .then((matchingDocs)=>{
                    console.log(`data:${matchingDocs} - ${matchingDocs.length}`)     
                    res.json(matchingDocs)
                })
                .catch(err => {
                    console.log(err)
                }) 
        })  
}