// firebase
const { db } = require('../../utilities/admin');

// search of static devices according to the categories and tags it has
exports.searchStaticDevicesProductsByCategoriesAndTags = (req, res) => {
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

// post list of products in top5Products
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
                                thingId:resultOfCoord.thingId,
                                meters:0
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
                allData.forEach((item)=>{
                    console.log('hi')
                    db
                    .doc(`/userDevices/${userDeviceId}`)
                    .collection('top5Products')
                    .add({
                        ...item
                    })
                    .catch(err => {
                        res.status(500, err);
                    })
                })  
            })
            .catch(err => {
                res.status(500, err);
            })
    }
    // run it to begin
    await toMakelistOfCoords()
}

///////////////////////////////////////////////////////////////////////////////////// meassure modeTypes
// method to make the meassurment with the list of selected products
exports.meassureOfMatchesInProducts = async (inWait) => {
    const dataEnter = inWait
    // print
    console.log(`dataEnter:${JSON.stringify(dataEnter)}`)
    // var to hold mtsBetweenDevices    
    let mtsBetweenDevicesToProducts = [];
    // func
    async function checkDistance(inWaitAfter){
        console.log(`checking checkDistance for all porduct selections`)
        // loop
        for(let i = 0; i < inWaitAfter.top5Products.length; i++){
            // print
            console.log(`key:${inWaitAfter.top5Products[i].coords}`)
            // logic to make the meassure part
            let R = 6371; // Radius of the earth in km
            let dLat = (inWaitAfter.top5Products[i].coords.lat - inWaitAfter.coords.lat) * Math.PI / 180;  
            let dLon = (inWaitAfter.top5Products[i].coords.lon - inWaitAfter.coords.lon) * Math.PI / 180; 
            let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(inWaitAfter.top5Products[i].coords.lat * Math.PI / 180) 
                * Math.cos(inWaitAfter.coords.lat* Math.PI / 180) 
                * Math.sin(dLon/2) * Math.sin(dLon/2); 
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            let d = R * c; // Distance in km
            let distanceInMeters = d * 1000; // Distance in m
            // print
            console.log(`distanceInMeters to each comparasion: ${distanceInMeters}`);
            // push data to mtsBetweenDevices vart
            mtsBetweenDevicesToProducts.push({
                meters: distanceInMeters,
                thingId: inWaitAfter.top5Products[i].thingId
            })
            // return mtsBetweenDevices
            let userDeviceId = inWaitAfter.thingId.split("-").slice(2).toString();
            // db save mts results part
            const docRef = db
                .doc(`/userDevices/${userDeviceId}`)
                .collection('top5Products')
                .doc(inWaitAfter.top5Products[i].docId)
            // update meters
            await docRef
                .update({
                    meters:distanceInMeters
                })
        }
        // print
        console.log(`Unorder yet mtsBetweenDevicesToProducts: ${JSON.stringify(mtsBetweenDevicesToProducts)}`)
        // return results
        return mtsBetweenDevicesToProducts
    } 
    // run it
    await checkDistance(dataEnter) 
    // import    
    const {
        metersRangeMatchColor,
    } = require('./utilsForThings');    
    // run it
    await metersRangeMatchColor(mtsBetweenDevicesToProducts, dataEnter.thingId);
}