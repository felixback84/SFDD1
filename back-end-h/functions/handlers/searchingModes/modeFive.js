// firebase
const { db } = require('../../utilities/admin')

// search of static devices according to multiple categories and multiple tags it has  ---> modeFive
exports.searchStaticDevicesProductsByCategoriesAndTags = async (req, res) => {
    // /
    let _ = require('underscore')
    // data from client
    let dataProductToSearch = req.body.dataProductToSearch
    // userDeviceId
    let userDeviceId = req.body.userDeviceId
    // print
    console.log(`${userDeviceId} - ${dataProductToSearch}`)
    // var to hold results
    let resultsOfProductsInDB = []
    // vars withot empty props
    let finalObj = {}
    // clear obj of empty arrs
    Object.entries(dataProductToSearch.taxonomy)
        .forEach(([key, value]) => value != "" ? 
            (finalObj[key] = value):(console.log("empty key"))
        ) 
    // to pick products with tax match
    const toMakelistOfProducts = async (taxo) => {
        // db part
        let docs = await db
            .collection('products')
            .get()
            .then(async (data)=>{
                // chack if exists data
                if (data.empty) {
                    return res.status(400).json({ error: 'Any product in this category' });
                } else {
                    data.forEach(async (doc)=>{   
                        // check coincidence
                        if(_.isEqual(doc.data().taxonomy,taxo)){
                            resultsOfProductsInDB.push({
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
                        } else {
                            console.log("no match with this filter of tags")
                        }
                    })
                    // print
                    console.log(JSON.stringify(await resultsOfProductsInDB))
                    return resultsOfProductsInDB
                }
            })
            .catch(err => {
                res.status(500, err)
            })
    }
    
    // extract companyData
    const extractCompanyDataAndPassExtraDataAndSaveInDbInTop5Products = async (listOfProducts) => {
        // loop
        listOfProducts.forEach(async (productItem)=>{
            // print item
            console.log("Current item: " + JSON.stringify(productItem))
            // extract userHandle
            const userHandle = productItem.product.staticDeviceProperty.split("-").slice(0,1).toString()
            console.log({userHandle})
            // db connection
            let promise = await db
                .collection(`/users/${userHandle}/companyData`)
                .get()
                .then(async (snapshot) => {
                    // check if exists
                    if (snapshot.empty) {
                        console.log('No matching documents.')
                    } else {
                        snapshot.forEach(async (doc) => {
                            console.log(`companyName:${doc.data().companyName}`)
                            // check match to pass new data
                            if(productItem.product.companyName === doc.data().companyName){
                                console.log("hi sun")
                                // passing the rest of data to the final obj
                                productItem.companyData = {
                                    companyName:doc.data().companyName,
                                    localPicUrl:doc.data().localPicUrl,
                                }
                                productItem.meters = 0
                                productItem.thingId = productItem.product.staticDeviceProperty
                            }else{
                                console.log("hi moon")
                            }
                            // print
                            console.log(
                                `resultsOfMatchOfProducts after push company data: 
                                ${JSON.stringify(resultsOfProductsInDB)}`
                            )
                            // DB save
                            await db
                                .collection(`/userDevices/${userDeviceId}/top5Products`)
                                .add({
                                    ...productItem   
                                })
                                .catch(err => {
                                    res.status(500, err)
                            })
                        })
                    }
                })
                .catch(err => {
                    console.log('Error getting documents', err)
                })
            
        })      
    }  

    // run it
    try{
        const pass = await toMakelistOfProducts(finalObj)
        const pass1 = await extractCompanyDataAndPassExtraDataAndSaveInDbInTop5Products(await resultsOfProductsInDB)
    } catch(e){
        console.log(e)
    } throw ("something went wrong")
}