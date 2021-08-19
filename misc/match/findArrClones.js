// _
let _ = require('underscore');


const arr1 = [
    {
        name:"carlos",
        age:"24",
        date:new Date().getTime()
    },
    {
        name:"camilo",
        age:"26",
        date:new Date().getTime()
    },
    {
        name:"carla",
        age:"21",
        date:new Date().getTime()
    },
    {
        name:"carlota",
        age:"20",
        date:new Date().getTime()
    },
]

const arr2 = [


    {
        name:"carlos",
        age:"29",
        date:new Date().getTime()
    },  
    {
        name:"camilo",
        age:"19",
        date:new Date().getTime()
    },
    {
        name:"carla",
        age:"20",
        date:new Date().getTime()
    },
    {
        name:"carlota",
        age:"26",
        date:new Date().getTime()
    },


    {
        name:"camila",
        age:"29",
        date:new Date().getTime()
    },
    {
        name:"camile",
        age:"24",
        date:new Date().getTime()
    },
    {
        name:"karla",
        age:"28",
        date:new Date().getTime()
    },
    {
        name:"karime",
        age:"26",
        date:new Date().getTime()
    },
    {
        name:"karlo",
        age:"21",
        date:new Date().getTime()
    },
    {
        name:"katerine",
        age:"21",
        date:new Date().getTime()
    },
]
// mix
// let arr = arr1.concat(arr2)
// filter with undescore
// let uniqueList = _.uniq(arr, function (item) {
//     console.log(`items updates: ${item.name}`)
//     return item.name
// })

// let uniqueList = _.difference(arr1,arr2)
// console.log(uniqueList)

const filter = (arr,ids) => {
    let arrFinal = []
    let arrAll = arr
    ids.map((id)=>{
        arrAll.filter((arrItem)=>{
            arrItem.name === id.name ? 
                (arrFinal.push({...arrItem}))
                    : (console.log("no match"))

        })
    })
    console.log({arrFinal})        
}

filter(arr1,arr2)


