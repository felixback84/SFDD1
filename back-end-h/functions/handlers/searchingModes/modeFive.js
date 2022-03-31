// firebase
const { db } = require('../../utilities/admin')

// search of static devices according to multiple categories and multiple tags it has
exports.searchStaticDevicesProductsByCategoriesAndTags = async (req, res) => {
    // /
    let _ = require('underscore')
    // data from client
    let dataProductToSearch = req.body.dataProductToSearch
    // print
    // console.log({dataProductToSearch})
    // var to hold results
    let resultsOfProductsInDB = []
    
    // vars withot empty props
    let finalObj = {}
    // clear obj of empty arrs
    Object.entries(dataProductToSearch.taxonomy)
    .forEach(([key, value]) => value != "" ? 
        (finalObj[key] = value):(console.log("empty key"))
    ) 

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
                    // console.log(`is equal: ${_.isEqual(doc.data().taxonomy,finalObj)}`)
                    if(_.isEqual(doc.data().taxonomy,finalObj)){
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
                            taxonomy:doc.data().taxonomy,
                            companyName:doc.data().companyName
                        })
                    } else {
                        console.log("error in filter of tags")
                    }
                    return resultsOfProductsInDB
                })
                
                console.log(JSON.stringify(await resultsOfProductsInDB))
                return res.json(await resultsOfProductsInDB)
            }
            
        })
        .catch(err => {
            res.status(500, err)
        })
        
}