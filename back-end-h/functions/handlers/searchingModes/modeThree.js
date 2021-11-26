// firebase
const { db } = require('../../utilities/admin');

// search of static devices according to one category and tags it has ---> dont work by now
// exports.searchStaticDevicesProductsByCategoryAndTag = (req, res) => {

//     // var to hold results
//     let resultsOfProductsInDB = []
//     // db part
//     db
//     .collection('products')
//     .where('categories','array-contains',req.params.category)
//     .where('tags','array-contains',req.params.tag)
//     .get()
//     .then((data)=>{
//         // chack if exists data
//         if (data.empty) {
//             return res.status(400).json({ error: 'This product dosen´t exists' });
//         } else {
//             data.forEach((doc)=>{
//                 // push data to an array
//                 resultsOfProductsInDB.push({
//                     name:doc.data().name,
//                     tags:doc.data().tags,
//                     category:doc.data().category,
//                     staticDeviceProperty:doc.data().staticDeviceProperty,
//                     description:doc.data().description,
//                     familyOfDevices:doc.data().familyOfDevices,
//                     imgUrl:doc.data().imgUrl,
//                     price:doc.data().price,
//                     createdAt:doc.data().createdAt,
//                     productId:doc.id,
//                     taxonomy:doc.data().taxonomy
//                 })
//             })
//             // res
//             return res.json(resultsOfProductsInDB);
//         }
//     })
//     .catch(err => {
//         res.status(500, err);
//     })
// }

// search of static devices according to one category and multiple tags it has
exports.searchStaticDevicesProductsByCategoryAndTags = async (req, res) => {
    // /
    let _ = require('underscore')
    // data from client
    let dataProductToSearch = req.body.dataProductToSearch
    // print
    console.log({dataProductToSearch})
    // var to hold results
    let resultsOfProductsInDB = []
    // db part
    let docs = await db
    .collection('products')
    .where('categories','array-contains',dataProductToSearch.categories)
    .get()
    .then((data)=>{
        // chack if exists data
        if (data.empty) {
            return res.status(400).json({ error: 'Any product in this category' });
        } else {
            data.forEach((doc)=>{   
                // loop
                if(_.intersection(doc.data().tags,dataProductToSearch.tags).length != 0){
                    resultsOfProductsInDB.push({
                        name:doc.data().name,
                        tags:doc.data().tags,
                        categories:doc.data().categories,
                        staticDeviceProperty:doc.data().staticDeviceProperty,
                        description:doc.data().description,
                        familyOfDevices:doc.data().familyOfDevices,
                        imgUrl:doc.data().imgUrl,
                        price:doc.data().price,
                        createdAt:doc.data().createdAt,
                        productId:doc.id,
                        taxonomy:doc.data().taxonomy
                    })
                } else {
                    console.log("error in filter of tags")
                } 
            })
            // res
            return res.json(resultsOfProductsInDB);
        }
    })
    .catch(err => {
        res.status(500, err);
    })
}

// search of static devices according to multiple categories and multiple tags it has
exports.searchStaticDevicesProductsByCategoriesAndTags = async (req, res) => {
    // /
    let _ = require('underscore')
    // data from client
    let dataProductToSearch = req.body.dataProductToSearch
    // print
    console.log({dataProductToSearch})
    // var to hold results
    let resultsOfProductsInDB = []
    // db part
    let docs = await db
    .collection('products')
    .get()
    .then((data)=>{
        // chack if exists data
        if (data.empty) {
            return res.status(400).json({ error: 'Any product in this category' });
        } else {
            data.forEach((doc)=>{   
                if(_.isEqual(doc.data().taxonomy,dataProductToSearch.taxonomy)){
                    resultsOfProductsInDB.push({
                        name:doc.data().name,
                        tags:doc.data().tags,
                        categories:doc.data().categories,
                        staticDeviceProperty:doc.data().staticDeviceProperty,
                        description:doc.data().description,
                        familyOfDevices:doc.data().familyOfDevices,
                        imgUrl:doc.data().imgUrl,
                        price:doc.data().price,
                        createdAt:doc.data().createdAt,
                        productId:doc.id,
                        taxonomy:doc.data().taxonomy
                    })
                } else {
                    console.log("error in filter of tags")
                }
            })
            // res
            return res.json(resultsOfProductsInDB)
        }
    })
    .catch(err => {
        res.status(500, err)
    })
}

// post list of products in top5Products
exports.postListOfProductsToFind = async (req, res) => {
    // receive list of products
    let listOfProducts = req.body.listOfProducts
    // userDeviceId
    let userDeviceId = req.body.userDeviceId
    // coords of products
    let coords = {}
    // var to hold results for products
    let resultsOfMatchOfProducts = []
    // find those products on the collection 
    const toMakelistOfProducts = async (listOfProductsFromClient) => {
        // loop
        for(let i = 0; i < listOfProductsFromClient.length; i++){
            // dp liveDataSets part
            await db
                .doc(`/products/${listOfProductsFromClient[i].productsId}`)
                .get()
                .then((doc)=>{                    
                    // push on arr
                    resultsOfMatchOfProducts.push({
                        coords:doc.data().coords,
                        product:{
                            name:doc.data().name,
                            tags:doc.data().tags,
                            categories:doc.data().categories,
                            staticDeviceProperty:doc.data().staticDeviceProperty,
                            description:doc.data().description,
                            familyOfDevices:doc.data().familyOfDevices,
                            imgUrl:doc.data().imgUrl,
                            price:doc.data().price,
                            createdAt:doc.data().createdAt,
                            productId:doc.id,
                            taxonomy:doc.data().taxonomy,
                            companyName:doc.data().companyName,
                        }
                    })  
                })
                .catch(err => {
                    res.status(500, err)
                })
        }   
        // print
        console.log(`resultsOfMatchOfProducts:${JSON.stringify(resultsOfMatchOfProducts)}`)
        return resultsOfMatchOfProducts
    }   

    // extract companyData
    const extractCompanyData = async (listOfProducts) => {
        // vars
        const outputList = []
        const promises = []
        // loop
        listOfProducts.forEach((productItem)=>{
            // print item
            console.log("Current item: " + productItem)
            // extract userHandle
            const userHandle = productItem.product.staticDeviceProperty.split("-").slice(0,1).toString()
            // db connection
            let promise = db
                .collection(`/users/${userHandle}/companyData`)
                .get()
                .then(snapshot => {
                    // check if exists
                    if (snapshot.empty) {
                        console.log('No matching documents.')
                    } else {
                        snapshot.forEach(doc => {
                            outputList.push({
                                companyName:doc.data().companyName,
                                localPicUrl:doc.data().localPicUrl,
                            })
                        })
                        return
                    }
                })
                .catch(err => {
                    console.log('Error getting documents', err)
                })
                // promise push
                promises.push(promise)
        })

        Promise
            .all(promises)
            .then(() => {
                return outputList
            })
            .then(()=>{
                // var to hold userHandle
                let companyName = ""
                // loop
                listOfProducts.forEach((productItem)=>{
                    // userHandle
                    companyName = productItem.product.companyName
                    // second obj loop
                    outputList.forEach((outputItem)=>{
                        // check to push in the right item
                        if(companyName === outputItem.companyName){
                            console.log("hi sun")
                            // passing the rest of data to the final obj
                            productItem.companyData = outputItem
                            productItem.meters = 0
                            productItem.thingId = productItem.product.staticDeviceProperty
                        }else{
                            console.log("hi moon")
                        }
                    })
                })
                // print
                console.log(`resultsOfMatchOfProducts after push company data: ${JSON.stringify(resultsOfMatchOfProducts)}`)
                return resultsOfMatchOfProducts
            })
            .then(async (data)=>{
                // DB save
                data.forEach(async (item)=>{
                    // print
                    console.log(`Pre DB Item: ${JSON.stringify(item)}`)
                    // db conection
                    await db
                        .collection(`/userDevices/${userDeviceId}/top5Products`)
                        .add({
                            ...item     
                        })
                        .catch(err => {
                            res.status(500, err)
                        })
                }) 
            })
            .catch(err => {
                res.status(500, err)
            })
    }  
    // run it
    const pass = await toMakelistOfProducts(listOfProducts)
    const resp = await pass
    const pass1 = await extractCompanyData(await resp)
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
        console.log(`checking checkDistance for all product selections`)
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
    await metersRangeMatchColor(mtsBetweenDevicesToProducts, dataEnter.thingId)
}
