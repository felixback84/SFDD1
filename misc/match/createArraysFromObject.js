let productData = {
    taxonomy:{
        pets:"rabbit",
        dcHeros:"batman"
    }
}

let outputTaxonomy = (obj) =>  {
    // extract keys & values
    let arrKeys = []
    let arrValues = []
    // loop
    Object
        .entries(obj.taxonomy)
        .map(([key, value]) => {
            //({key,value})
            arrKeys.push(key)
            arrValues.push(value)
        })
    // print
    console.log(`outputTaxonomy:${JSON.stringify(arrKeys)}-${JSON.stringify(arrValues)}`)
    return{arrKeys,arrValues}
}
console.log(outputTaxonomy(productData).arrValues)


