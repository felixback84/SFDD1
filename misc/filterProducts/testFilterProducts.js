// list of products
const resultsOfMatchOfProducts = [
    {
        productsId:"2N8FVC8qpBItpWBhjL2f",
        staticDeviceProperty:"jobsIdiot-staticHeartbeat-8d0flrPyLBkGJfgMvcJm"
    },
    {
        productsId:"6rLxIX4iuKpPqOFIoMGc",
        staticDeviceProperty:"garciala-staticHeartbeat-958MuU7EdvyC4yX8WhLB"
    },
    {
        productsId:"BQoHuIlIYZ2KnggiKaYx",
        staticDeviceProperty:"garciala-staticHeartbeat-958MuU7EdvyC4yX8WhLB"
    },
    {
        productsId:"Oun7l3Q7aBRkiZ3D9PtY",
        staticDeviceProperty:"garciala-staticHeartbeat-958MuU7EdvyC4yX8WhLB"
    },
    {
        productsId:"957Gw3bGoneov5aGg2Qj",
        staticDeviceProperty:"bibidise-staticHeartbeat-2WUdDyX4NdeZrBt0deYC"
    }
]

// data structure in disorder
const resultOfCoords = [
    {coords:{"hash":"d2g667xpyshp","lon":-74.070913,"lat":4.634837,"nameOfPoint":"jobsIdiotPosition"},
    thingId:"jobsIdiot-staticHeartbeat-8d0flrPyLBkGJfgMvcJm"},
    {coords:{"lon":-74.070752,"nameOfPoint":"garcialaPosition","hash":"d2g667z2f7s1","lat":4.635005},
    thingId:"garciala-staticHeartbeat-958MuU7EdvyC4yX8WhLB"},
    {coords:{"nameOfPoint":"garcialaPosition","lon":-74.070752,"lat":4.635005,"hash":"d2g667z2f7s1"},
    thingId:"garciala-staticHeartbeat-958MuU7EdvyC4yX8WhLB"},
    {coords:{"lon":-74.070752,"hash":"d2g667z2f7s1","lat":4.635005,"nameOfPoint":"garcialaPosition"},
    thingId:"garciala-staticHeartbeat-958MuU7EdvyC4yX8WhLB"},
    {coords:{"lat":4.635157,"lon":-74.070602,"nameOfPoint":"bibidisePosition","hash":"d2g667z3tzuh"},
    thingId:"bibidise-staticHeartbeat-2WUdDyX4NdeZrBt0deYC"}
]
// to hold the order obj
let arrWithCoordsKeysInOrder = []
// to map the unorder obj
resultOfCoords.map((resultOfCoord)=>{
    // vars
    let sortedCoordsKeys = {} 
    let keysOfCoords = []
    // loop to extract keys
    for (key in resultOfCoord.coords) {
        if (resultOfCoord.coords.hasOwnProperty(key)) {
            keysOfCoords.push(key);
        }
    }
    // print
    console.log(`sort a:${keysOfCoords.sort()}`)
    // loop to make obj in order
    for (key = 0; key < keysOfCoords.length; key++) {
        sortedCoordsKeys[keysOfCoords[key]] = resultOfCoord.coords[keysOfCoords[key]];
    }
    // to push the the final list
    arrWithCoordsKeysInOrder.push({
        coords:sortedCoordsKeys,
        thingId:resultOfCoord.thingId
    })
    // return sorted obj
    return arrWithCoordsKeysInOrder;
})
// print
console.log(`arrWithCoordsKeysInOrder:${JSON.stringify(arrWithCoordsKeysInOrder)}`)
// output after order data structure
// [
//     {"coords":{"hash":"d2g667xpyshp","lat":4.634837,"lon":-74.070913,"nameOfPoint":"jobsIdiotPosition"},
//     "thingId":"jobsIdiot-staticHeartbeat-8d0flrPyLBkGJfgMvcJm"},
//     {"coords":{"hash":"d2g667z2f7s1","lat":4.635005,"lon":-74.070752,"nameOfPoint":"garcialaPosition"},
//     "thingId":"garciala-staticHeartbeat-958MuU7EdvyC4yX8WhLB"},
//     {"coords":{"hash":"d2g667z2f7s1","lat":4.635005,"lon":-74.070752,"nameOfPoint":"garcialaPosition"},
//     "thingId":"garciala-staticHeartbeat-958MuU7EdvyC4yX8WhLB"},
//     {"coords":{"hash":"d2g667z2f7s1","lat":4.635005,"lon":-74.070752,"nameOfPoint":"garcialaPosition"},
//     "thingId":"garciala-staticHeartbeat-958MuU7EdvyC4yX8WhLB"},
//     {"coords":{"hash":"d2g667z3tzuh","lat":4.635157,"lon":-74.070602,"nameOfPoint":"bibidisePosition"},
//     "thingId":"bibidise-staticHeartbeat-2WUdDyX4NdeZrBt0deYC"}
// ]

// to push all result
const all = []

// to eliminate duplicates of coords
function removeDuplicates(arr) {
    const jsonObject = arr.map(JSON.stringify);
    const uniqueSet = new Set(jsonObject);
    const uniqueArray = Array.from(uniqueSet).map(JSON.parse);   
    return uniqueArray
}

// run it to remove duplicates in coords
const listUniqueObjCoords = removeDuplicates(arrWithCoordsKeysInOrder)
// print
console.log(`listUniqueObjCoords:${JSON.stringify(listUniqueObjCoords)}`)

// output after order data structure
// [{"coords":{"hash":"d2g667xpyshp","lat":4.634837,"lon":-74.070913,"nameOfPoint":"jobsIdiotPosition"},
// "thingId":"jobsIdiot-staticHeartbeat-8d0flrPyLBkGJfgMvcJm"},
// {"coords":{"hash":"d2g667z2f7s1","lat":4.635005,"lon":-74.070752,"nameOfPoint":"garcialaPosition"},
// "thingId":"garciala-staticHeartbeat-958MuU7EdvyC4yX8WhLB"},
// {"coords":{"hash":"d2g667z3tzuh","lat":4.635157,"lon":-74.070602,"nameOfPoint":"bibidisePosition"},
// "thingId":"bibidise-staticHeartbeat-2WUdDyX4NdeZrBt0deYC"}]

// to find equals and create obj with the specific data
const findEqual = (resultOfCoord) => {
    resultsOfMatchOfProducts.forEach((item) => {
        if(resultOfCoord.thingId === item.staticDeviceProperty){
            all.push({
                coords:resultOfCoord.coords,
                products:item,
                thingId:resultOfCoord.thingId
            })
        }
        return all
    })    
    // print
    console.log(`all:${JSON.stringify(all)}`)
}

// run find method to establish a relation between the two arrays (coords & products)
listUniqueObjCoords.find(findEqual)

// complete output in order 
// [
//     {"coords":{"hash":"d2g667xpyshp","lat":4.634837,"lon":-74.070913,"nameOfPoint":"jobsIdiotPosition"},
//     "products":{"productsId":"2N8FVC8qpBItpWBhjL2f","staticDeviceProperty":"jobsIdiot-staticHeartbeat-8d0flrPyLBkGJfgMvcJm"},
//     "thingId":"jobsIdiot-staticHeartbeat-8d0flrPyLBkGJfgMvcJm"},
//     {"coords":{"hash":"d2g667z2f7s1","lat":4.635005,"lon":-74.070752,"nameOfPoint":"garcialaPosition"},
//     "products":{"productsId":"6rLxIX4iuKpPqOFIoMGc","staticDeviceProperty":"garciala-staticHeartbeat-958MuU7EdvyC4yX8WhLB"},
//     "thingId":"garciala-staticHeartbeat-958MuU7EdvyC4yX8WhLB"},
//     {"coords":{"hash":"d2g667z2f7s1","lat":4.635005,"lon":-74.070752,"nameOfPoint":"garcialaPosition"},
//     "products":{"productsId":"BQoHuIlIYZ2KnggiKaYx","staticDeviceProperty":"garciala-staticHeartbeat-958MuU7EdvyC4yX8WhLB"},
//     "thingId":"garciala-staticHeartbeat-958MuU7EdvyC4yX8WhLB"},
//     {"coords":{"hash":"d2g667z2f7s1","lat":4.635005,"lon":-74.070752,"nameOfPoint":"garcialaPosition"},
//     "products":{"productsId":"Oun7l3Q7aBRkiZ3D9PtY","staticDeviceProperty":"garciala-staticHeartbeat-958MuU7EdvyC4yX8WhLB"},
//     "thingId":"garciala-staticHeartbeat-958MuU7EdvyC4yX8WhLB"},
//     {"coords":{"hash":"d2g667z3tzuh","lat":4.635157,"lon":-74.070602,"nameOfPoint":"bibidisePosition"},
//     "products":{"productsId":"957Gw3bGoneov5aGg2Qj","staticDeviceProperty":"bibidise-staticHeartbeat-2WUdDyX4NdeZrBt0deYC"},
//     "thingId":"bibidise-staticHeartbeat-2WUdDyX4NdeZrBt0deYC"}
// ]

let _ = require('underscore');
let groups = _.groupBy(all,"thingId")
console.log(`groups:${groups}`)


// const groupBy = (items, key) => items.reduce(
//     (result, item) => ({
//         ...result,
//         [item[key]]: [
//         ...(result[item[key]] || []),
//         item,
//         ],
//     }), 
//     {},
// );
// const group = groupBy(all,all=>all.thingId)
// console.log(group)

// // conform res by groups
// function groupBy(list, keyGetter) {
//     //const map = new Map();
//     const arr = new Array();
//     list.forEach((item) => {
//         const key = keyGetter(item);
//         //const collection = map.get(key);
//         const collection = arr.get(key);
//         if (!collection) {
//             //map.set(key, [item]);
//             arr.set(key, [item]);
//         } else {
//             collection.push(item);
//         }
//     });
//     //return map;
//     return arr;
// }
// // run it & hold
// const grouped =  groupBy(all, all=>all.thingId)
// // print
// console.log(grouped)

// // conform res
// const finalRes = (arr) => {
//     // to hold res
//     let response = []
//     // maps
//     arr.map((arrOneItem)=>{
//         let thingIdOne = arrOneItem.coords.thingId
//         //let thingIdTwo = undefined
//         arr.map((arrTwoItem)=>{
//             //thingIdTwo = arrTwoItem.coords.thingId
//             if(thingIdOne === arrTwoItem.coords.thingId){
//                 console.log(true)
//             } else {
//                 console.log(false)
//             }
//         })
//     })
//     // print
//     // console.log(`respose:${JSON.stringify(response)}`)
// }
// // run it
// finalRes(all)


