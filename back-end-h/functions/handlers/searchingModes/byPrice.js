// firebase
const { db } = require('../../utilities/admin')

exports.findStaticsProductsInSpecificPriceRange = async (req,res) => {
    
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
            res.status(500, err);
        })
}

