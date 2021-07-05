// firebase
const { db } = require('../../utilities/admin');

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
                    matchingDocs.push(doc);
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
            // write in db
        })
    })
    .catch(err => {
        console.log(err)
    })
}

// get products with geohash
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