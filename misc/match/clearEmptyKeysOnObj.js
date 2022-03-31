let dataProductToSearch = {
    taxonomy:{
        pets:"snake",
        dcHeros:"batman",
        luckyNumbers:[],
        fruits:[]
    }
}

// // vars withot empty props
// let finalObj = {}
// // clear obj of empty arrs
// for(let key in dataProductToSearch.taxonomy) {
//     console.log(key)
//     if(dataProductToSearch.taxonomy[key] === []) {
//         console.log(key + " is blank. Deleting it");
//         delete dataProductToSearch.taxonomy[key]
//         finalObj = dataProductToSearch.taxonomy
//     }
// }
// console.log({finalObj})

Object.entries(dataProductToSearch.taxonomy)
    .forEach(([key, value]) => value != "" && console.log(`${key}: ${value}`)) 