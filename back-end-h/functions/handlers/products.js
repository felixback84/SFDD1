// firebase
const { db } = require('../utilities/admin');

// find porducts wich offer the vendors
exports.findProductsOfStaticDevices = async (req, res) => {
    // staticDeviceId
    const thingId = req.params.thingId
    // print
    console.log({thingId})
    // arr with results
    let arrProducts = []

    const getProductsArr = async (thingIdx,res) => {
        // print
        console.log(`thingIdx:${thingIdx}`)
        // db part
        let refDB = await db
            .collection('products')
            
        // db result
        let result = await refDB
        // el parametro está mal, se debe pasar algo asi --> bibidise-staticHeartbeat-2WUdDyX4NdeZrBt0deYC
            .where('staticDeviceProperty','==',thingIdx)
            .get()

        // loop
        for (product of result.docs) {
            // print
            console.log(`id doc: ${product.id}`)
            // push in the arr
            arrProducts.push({
                ...product.data()
            })
        }
        // print
        console.log(`products of vendors: ${JSON.stringify(arrProducts)}`)
        // res
        let responseArr = await arrProducts
        // send res to client
        return res.json(responseArr)
    } 

    // run it & catch it
    try {
        await getProductsArr(thingId,res)
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

// post products in statics
exports.postProductsToStaticDevices = (req, res) => {
    // product data var
    const productData = req.body.productData
    // geofire
    const geofire = require('geofire-common');
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
        geoHash:geofire.geohashForLocation([productData.coords.lat,productData.coords.lon]),
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