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
                    ...doc.data()
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
                const productPriceSet = item.price
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
            //loop to save docs in db
            arrCategoryWithPricesSet.forEach(async (arrCategoryWithPriceSet) => {
                // db part
                await db
                    .doc(`/userDevices/${userDeviceId}`)
                    .collection('top5Prices') 
                    .add({ ...arrCategoryWithPriceSet })
            })
        })
        // res to client
        .then(() => (res.json({arrCategoryWithPricesSet})))            
        .catch((err) => {
            console.error(err)
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
                    ...doc.data()
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
                const productPriceSet = item.price
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
            //loop to save docs in db
            arrTagWithPricesSet.forEach(async (arrTagWithPriceSet) => {
                // db part
                await db
                    .doc(`/userDevices/${userDeviceId}`)
                    .collection('top5Prices') 
                    .add({ ...arrTagWithPriceSet })
            })
        })
        // res to client
        .then(() => (res.json({arrTagWithPricesSet})))            
        .catch((err) => {
            console.error(err)
        }) 
        .catch(err => {
            res.status(500, err)
        })

}

