let _ = require('underscore')

const dataProductToSearch = {
    taxonomy:{
        dcHeros:"batman",
        pets:"hamster"
    }
}

const productsData = [
    {
        name:"bird - ctoIdiot - newArr",
        staticDeviceProperty:"ctoIdiot-staticHeartbeat-9TQ3jPMiKU2GTxr3ywaq",
        description:"whatever text here - ctoIdiot",
        familyOfDevices:"Heartbeat",
        imgUrl:"https://firebasestorage.googleapis.com/v0/b/sfdd-d8a16.appspot.com/o/products%2Fbird.jpg?alt=media&token=9ae86b7c-3261-42e5-a161-c426d84da026",
        price:18.0,
        tags:["superman"],
        categories:["dcHeros",],
        taxonomy:{
            dcHeros:"superman"
        },
    },
    {
        name:"bird - ctoIdiot - newArr1",
        staticDeviceProperty:"ctoIdiot-staticHeartbeat-9TQ3jPMiKU2GTxr3ywaq",
        description:"whatever text here - ctoIdiot",
        familyOfDevices:"Heartbeat",
        imgUrl:"https://firebasestorage.googleapis.com/v0/b/sfdd-d8a16.appspot.com/o/products%2Fbird.jpg?alt=media&token=9ae86b7c-3261-42e5-a161-c426d84da026",
        price:19.1,
        tags:["batman"],
        categories:["dcHeros",],
        taxonomy:{
            dcHeros:"batman"
        },
    },
    {
        name:"bird - ctoIdiot - newArr2",
        staticDeviceProperty:"ctoIdiot-staticHeartbeat-9TQ3jPMiKU2GTxr3ywaq",
        description:"whatever text here - ctoIdiot",
        familyOfDevices:"Heartbeat",
        imgUrl:"https://firebasestorage.googleapis.com/v0/b/sfdd-d8a16.appspot.com/o/products%2Fbird.jpg?alt=media&token=9ae86b7c-3261-42e5-a161-c426d84da026",
        price:20.2,
        tags:["spider"],
        categories:["pets"],
        taxonomy:{
            pets:"spider"
        },
    },
    {
        name:"bird - ctoIdiot - newArr3",
        staticDeviceProperty:"ctoIdiot-staticHeartbeat-9TQ3jPMiKU2GTxr3ywaq",
        description:"whatever text here - ctoIdiot",
        familyOfDevices:"Heartbeat",
        imgUrl:"https://firebasestorage.googleapis.com/v0/b/sfdd-d8a16.appspot.com/o/products%2Fbird.jpg?alt=media&token=9ae86b7c-3261-42e5-a161-c426d84da026",
        price:21.3,
        tags:["batman","spider"],
        categories:["dcHeros","pets"],
        taxonomy:{
            dcHeros:"batman",
            pets:"hamster"
        },
    },
]

let resultsOfProductsInDB = []

// loop
productsData.forEach((item)=>{
    if(_.isEqual(dataProductToSearch.taxonomy,item.taxonomy)){
        resultsOfProductsInDB.push({
            name:item.name,
            categories:item.categories,
            tags:item.tags,
            staticDeviceProperty:item.staticDeviceProperty,
            description:item.description,
            familyOfDevices:item.familyOfDevices,
            imgUrl:item.imgUrl,
            price:item.price,
            taxonomy:item.taxonomy
        })
    }else{
        console.log("not equal after filter tags in taxo")
    }
})

console.log({resultsOfProductsInDB})