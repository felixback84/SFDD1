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
exports.postProductsToStaticDevices = async (req, res) => {
    // product data var
    const productData = req.body.productData
    // geofire
    const geofire = require('geofire-common')
    // extract keys & values
    let outputTaxonomy = (obj) =>  {
        let arrKeys = []
        let arrValues = []
        // loop
        Object
            .entries(obj.taxonomy)
            .map(([key,value]) => { 
                arrKeys.push(key)
                arrValues.push(value)
            })
        // print
        console.log(`outputTaxonomy:${JSON.stringify(arrKeys)}-${JSON.stringify(arrValues)}`)
        return {
            arrKeys,
            arrValues
        }
    }
    
    // extract companyData
    const extractCompanyData = async (idProperty) => {
        // vars
        const outputList = []
        // extract userHandle
        const userHandle = idProperty.split("-").slice(0,1).toString()
        // db connection
        db
            .collection(`/users/${userHandle}/companyData`)
            .get()
            .then((snapshot) => {
                // check if exists
                if (snapshot.empty) {
                    console.log('No matching documents.')
                } else {
                    snapshot.forEach((doc) => {
                        outputList.push({
                            companyName:doc.data().companyName,
                            localPicUrl:doc.data().localPicUrl,
                        })
                    })
                    // print
                    console.log(`outputList:${JSON.stringify(outputList)}`)
                    return outputList
                }  
            })
            .then((data)=>{
                // obj
                const productDataToPost = {
                    name:productData.name,
                    tags:outputTaxonomy(productData).arrValues, // error here
                    categories:outputTaxonomy(productData).arrKeys,
                    staticDeviceProperty:productData.staticDeviceProperty,
                    description:productData.description,
                    familyOfDevices:productData.familyOfDevices,
                    imgUrl:productData.imgUrl,
                    price:productData.price,
                    createdAt:new Date().toISOString(),
                    // this fields depends of if what search products for it location
                    companyName:data[0].companyName,
                    coords:res.locals.coordsData.coords,
                    taxonomy:productData.taxonomy,
                }
                // print
                console.log(`productDataToPost:${JSON.stringify(productDataToPost)}`)
                // db save part
                db
                    .collection('products')
                    .add({...productDataToPost})
                    .then(()=>{
                        return res.json(productDataToPost)
                    })
                    .catch((err) => {
                        console.error(err);
                        res.status(500).json({ error: err.code })
                    })
            })
            .catch(err => {
                console.log('Error getting documents', err)
            })
    }  
    // run it
    await extractCompanyData(productData.staticDeviceProperty)
}