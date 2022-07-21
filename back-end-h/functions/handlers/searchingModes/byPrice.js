// firebase
const { db, admin } = require('../../utilities/admin')

// modeNine
// get products in one categoy with a specific price range
exports.findStaticsProductsWithCategoryInSpecificPriceRange = async (req,res) => {

    // params 
    const category = req.params.category
    const startPrice = req.params.startPrice
    const endPrice = req.params.endPrice 
    const userDeviceId = req.params.userDeviceId
    
    // results
    let arrCategory = []
    let arrCategoryWithPricesSet = []
    
    // db part
    const dbCon = await db
        .collection('products')
        .where('categories','array-contains',category)
                
    return dbCon 
        .get()
        .then((snapshot)=>{
            // loop
            snapshot.forEach((doc) => {
                // print
                console.log(`data pre price range match: ${doc.data().price}`)
                // arr push
                arrCategory.push({
                    product:{
                        ...doc.data(),
                        productId:doc.id,
                    }
                })
            })
            return arrCategory
        })
        .then(async(arrCategory)=>{
            // print
            console.log(`data to filter: ${JSON.stringify(arrCategory)}`)
            // filter
            arrCategory.filter(async(item)=>{
                // price product
                const productPriceSet = item.product.price
                // range
                const inRange = (x, min, max) => {
                    return ((x-min)*(x-max) <= 0)
                }
                // check the price range base
                if(inRange(productPriceSet,startPrice,endPrice)){
                    // print
                    console.log(`filter item product per price: ${JSON.stringify(item)}`)
                    // push
                    arrCategoryWithPricesSet.push({
                        ...item
                    })
                } else {
                    console.log("shittttt")
                }
            })
        })
        .then(async()=>{ 
            // extract companyData
            const extractCompanyDataAndPassExtraDataAndSaveInDbInTop5Prices = async (listOfProducts) => {
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
                // promise with data
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
                        console.log(`resultsOfMatchOfProducts after push company data: ${JSON.stringify(arrCategoryWithPricesSet)}`)
                        return arrCategoryWithPricesSet
                    })
                    .then((data) => (res.json(data))) 
                    .catch(err => {
                        res.status(500, err)
                    })
            } 
            // run it
            const pass1 = await extractCompanyDataAndPassExtraDataAndSaveInDbInTop5Prices(arrCategoryWithPricesSet)
        })          
        .catch(err => {
            res.status(500, err)
        })
}

// save in db all data from response of search in price range
exports.postListOfProductsToFindByPriceRange = async (req,res) => {
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

// modeTen
// get products in one tag with a specific price range
exports.findStaticsProductsWithTagInSpecificPriceRange = async (req,res) =>{

    // params
    const tag = req.params.tag
    const startPrice = req.params.startPrice
    const endPrice = req.params.endPrice
    const userDeviceId = req.params.userDeviceId

    // results
    let arrTag = []
    let arrTagWithPricesSet = []
    
    // db part
    const dbCon = await db
        .collection('products')
        .where('tags','array-contains',tag)
                
    return dbCon 
        .get()
        .then((snapshot)=>{
            // loop
            snapshot.forEach((doc) => {
                // print
                console.log(`data pre price range match: ${doc.data().price}`)
                // arr push
                arrTag.push({
                    product:{
                        ...doc.data(),
                        productId:document.id,
                    }
                })
            })
            return arrTag
        })
        .then(async(arrTag)=>{
            // print
            console.log(`data to filter: ${JSON.stringify(arrTag)}`)
            // filter
            arrTag.filter(async(item)=>{
                // price product
                const productPriceSet = item.product.price
                // range
                const inRange = (x, min, max) => {
                    return ((x-min)*(x-max) <= 0);
                }
                // check the price range base
                if(inRange(productPriceSet,startPrice,endPrice)){
                    // print
                    console.log(`filter item product per price: ${JSON.stringify(item)}`)
                    // push
                    arrTagWithPricesSet.push({
                        ...item
                    })
                } else {
                    console.log("shittttt")
                }
            })
        })
        .then(async()=>{ 
            // extract companyData
            const extractCompanyDataAndPassExtraDataAndSaveInDbInTop5Prices = async (listOfProducts) => {
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
                // promise with data
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
                        console.log(`resultsOfMatchOfProducts after push company data: ${JSON.stringify(arrTagWithPricesSet)}`)
                        return arrTagWithPricesSet
                    })
                    
                    .then((data) => (res.json(data))) 
                    .catch(err => {
                        res.status(500, err)
                    })
            } 
            // run it
            const pass1 = await extractCompanyDataAndPassExtraDataAndSaveInDbInTop5Prices(arrTagWithPricesSet)
        })           
        .catch(err => {
            res.status(500, err)
        })
}

