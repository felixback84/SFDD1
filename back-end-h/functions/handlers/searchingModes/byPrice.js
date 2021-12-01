// firebase
const { db } = require('../../utilities/admin')

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
                    return ((x-min)*(x-max) <= 0);
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

// save in db all data from response of search in price range
exports.postListOfProductsToFindByPriceRange = (req,res) => {
    // receive list of products
    let listOfProducts = req.body.listOfProducts
    // userDeviceId
    let userDeviceId = req.body.userDeviceId
    // DB save
    listOfProducts.forEach(async (item)=>{
        // print
        console.log(`Pre DB Item: ${JSON.stringify(item)}`)
        // db conection
        await db
            .collection(`/userDevices/${userDeviceId}/top5Products`)
            .add({
                ...item     
            })
            .then(()=>{
                res.json("data in db")
            })
            .catch(err => {
                res.status(500, err)
            })
    }) 
}

