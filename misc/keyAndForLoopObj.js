// products
const dbData = {
    top5Products:{
        "garciala-staticHeartbeat-958MuU7EdvyC4yX8WhLB":[
            {
                coords:{
                    hash:"d2g667z2f7s1",
                    lat:4.635005,
                    lon:-74.070752,
                    nameOfPoint:"garcialaPosition"
                },
                products:{
                    category:"dcHeros",
                    staticDeviceProperty:"garciala-staticHeartbeat-958MuU7EdvyC4yX8WhLB",
                    imgUrl:"https://firebasestorage.googleapis.com/v0/b/sfdd-d8a16.appspot.com/o/products%2Fbatman.jpg?alt=media&token=6fa8ac8e-1e22-4c68-98f6-d3cf01cc4cb1",
                    familyOfDevices:"Heartbeat",
                    tags:"batman",
                    description:"whatever text here - garciala",
                    createdAt:"2021-03-19T18:50:43.772Z",
                    name:"batman - garciala",
                    price:1190,"productId":"6rLxIX4iuKpPqOFIoMGc"
                },
                thingId:"garciala-staticHeartbeat-958MuU7EdvyC4yX8WhLB"
            },
            {
                "coords":{
                    lat:4.635005,
                    hash:"d2g667z2f7s1",
                    nameOfPoint:"garcialaPosition",
                    lon:-74.070752
                },
                "products":{
                    category:"pets",
                    productId:"BQoHuIlIYZ2KnggiKaYx",
                    createdAt:"2021-03-19T19:04:06.670Z",
                    name:"hamster - garciala",
                    tags:"hamster",
                    description:"whatever text here - garciala",
                    price:12.3,
                    staticDeviceProperty:"garciala-staticHeartbeat-958MuU7EdvyC4yX8WhLB",
                    familyOfDevices:"Heartbeat",
                    imgUrl:"https://firebasestorage.googleapis.com/v0/b/sfdd-d8a16.appspot.com/o/products%2Fhamster.jpg?alt=media&token=7cd81f4a-2752-4cac-9be8-2e0b7a399bc2"
                },
                thingId:"garciala-staticHeartbeat-958MuU7EdvyC4yX8WhLB"
            }
        ],
        "bibidise-staticHeartbeat-2WUdDyX4NdeZrBt0deYC":[
            {
                thingId:"bibidise-staticHeartbeat-2WUdDyX4NdeZrBt0deYC",
                coords:{
                    nameOfPoint:"bibidisePosition",
                    lat:4.635157,
                    lon:-74.070602,
                    hash:"d2g667z3tzuh"
                },
                products:{
                    name:"batman - bibidise",
                    imgUrl:"https://firebasestorage.googleapis.com/v0/b/sfdd-d8a16.appspot.com/o/products%2Fbatman.jpg?alt=media&token=6fa8ac8e-1e22-4c68-98f6-d3cf01cc4cb1",
                    productId:"957Gw3bGoneov5aGg2Qj",
                    familyOfDevices:"Heartbeat",
                    price:1000,
                    category:"dcHeros",
                    tags:"batman",
                    description:"big guy with alcohol problems - bibidise",
                    createdAt:"2021-03-19T17:02:24.335Z",
                    staticDeviceProperty:"bibidise-staticHeartbeat-2WUdDyX4NdeZrBt0deYC"
                }
            }
        ],
        "jobsIdiot-staticHeartbeat-8d0flrPyLBkGJfgMvcJm":[
            {
                coords:{
                    nameOfPoint:"jobsIdiotPosition",
                    lat:4.634837,
                    lon:-74.070913,
                    hash:"d2g667xpyshp"
                },
                products:{
                    category:"pets",
                    price:70,
                    imgUrl:"https://firebasestorage.googleapis.com/v0/b/sfdd-d8a16.appspot.com/o/products%2Fsnake.jpg?alt=media&token=22b50b24-bd74-45ce-83fe-6fe14620d62e",
                    staticDeviceProperty:"jobsIdiot-staticHeartbeat-8d0flrPyLBkGJfgMvcJm",
                    tags:"snake",
                    description:"whatever text here - jobsIdiot",
                    productId:"2N8FVC8qpBItpWBhjL2f",
                    name:"snake - jobsIdiot",
                    familyOfDevices:"Heartbeat",
                    createdAt:"2021-03-19T18:41:16.080Z"
                },
                thingId:"jobsIdiot-staticHeartbeat-8d0flrPyLBkGJfgMvcJm"
            },
            {
                products:{
                    name:"spider - jobsIdiot",
                    tags:"spider",
                    familyOfDevices:"Heartbeat",
                    description:"whatever text here - jobsIdiot",
                    price:50,
                    category:"pets",
                    createdAt:"2021-03-19T18:42:17.201Z",
                    staticDeviceProperty:"jobsIdiot-staticHeartbeat-8d0flrPyLBkGJfgMvcJm",
                    productId:"Oun7l3Q7aBRkiZ3D9PtY",
                    imgUrl:"https://firebasestorage.googleapis.com/v0/b/sfdd-d8a16.appspot.com/o/products%2Fspider.jpg?alt=media&token=ca5ba1c3-6069-4650-8a37-4e9fa24f6ad3"
                },
                coords:{
                    lon:-74.070913,
                    hash:"d2g667xpyshp",
                    lat:4.634837,
                    nameOfPoint:"jobsIdiotPosition"
                },
                thingId:"jobsIdiot-staticHeartbeat-8d0flrPyLBkGJfgMvcJm"
            }
        ]
    }, 
    // coords
    coords:{
        lat:4.6345947,
        lon:-74.0704626,
        hash:"d2g667xw3p",
        nameOfPoint:"punto 6 - thing"
    },
    // thingId
    thingId:"CarlosTal84-Heartbeat-PT44TQIpPyLJXRBqXZAQ",
    //top5Coords:[1,2,3,4,5,6,7]
}

// search mode
let searchingMode = ["modeThree"]

// // conditinal obj --------> not filter yet
// let dataDB = {
//     thingId:dbData.thingId,
//     coords:dbData.coords,
//     ...(searchingMode[0] == "modeOne" || "modeTwo" && {top5Coords:dbData.top5Coords}),
//     ...(searchingMode[0] == "modeThree" && {top5Products:dbData.top5Products}),
// }
// // print
// console.log(`dataDB:${JSON.stringify(dataDB)}`)

// // method   
// const meassureOfMatchesInProducts = (inWait) => {
//     const dataEnter = inWait
//     // var to hold mtsBetweenDevices
//     let mtsBetweenDevicesToProducts = [];
//     // func
//     const checkDistance = (inWaitAfter) => {
//         let keysArr = Object.keys(inWaitAfter.top5Products)
//         // print
//         console.log(`keysArr:${keysArr}`)
//         // loop
//         keysArr.map((key)=>{
//             // print
//             console.log(`key:${key}`)
//             // loop
//             for(let i = 0; i < inWaitAfter.top5Products[key].length; i++){
//                 // print
//                 console.log(`key:${inWaitAfter.top5Products[key][i].coords}`)
//                 // logic to make the meassure part
//                 let R = 6371; // Radius of the earth in km
//                 let dLat = (inWaitAfter.top5Products[key][i].coords.lat - inWaitAfter.coords.lat) * Math.PI / 180;  
//                 let dLon = (inWaitAfter.top5Products[key][i].coords.lon - inWaitAfter.coords.lon) * Math.PI / 180; 
//                 let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//                     Math.cos(inWaitAfter.top5Products[key][i].coords.lat * Math.PI / 180) 
//                     * Math.cos(inWaitAfter.coords.lat* Math.PI / 180) 
//                     * Math.sin(dLon/2) * Math.sin(dLon/2); 
//                 let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//                 let d = R * c; // Distance in km
//                 let distanceInMeters = d * 1000; // Distance in m
//                 // print
//                 console.log(`distanceInMeters to each comparasion: ${distanceInMeters}`);
//                 // push data to mtsBetweenDevices vart
//                 mtsBetweenDevicesToProducts.push({
//                     meters: distanceInMeters,
//                     thingId: inWaitAfter.top5Products[key][i].thingId
//                 })
//             }
//         })           
//         // print
//         console.log(`Unorder yet mtsBetweenDevicesToProducts: ${JSON.stringify(mtsBetweenDevicesToProducts)}`)
//         // return results
//         return mtsBetweenDevicesToProducts
//     } 
//     // run it
//     checkDistance(dataEnter)
// }
// // run it
// meassureOfMatchesInProducts(dataDB)


const objFromDBToMeassureProcess = async (mode,doc) => {
    if(mode === "modeOne"){
        console.log(mode)
        return {
            thingId:doc.thingId,
            coords:doc.coords,
            top5Coords:doc.top5Coords,
        }
    } else if(mode === "modeTwo"){
        console.log(mode)
        return {
            thingId:doc.thingId,
            coords:doc.coords,
            top5Coords:doc.top5Coords,
        }
    } else if(mode === "modeThree"){
        console.log(mode)
        return {
            thingId:doc.thingId,
            coords:doc.coords,
            top5Products:doc.top5Products,
        }
    }
}

console.log(objFromDBToMeassureProcess(searchingMode[0],dbData))