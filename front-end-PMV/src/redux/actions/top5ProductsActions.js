// user actions
import {

    // ---> search products by category and tags
    GET_PRODUCTS_BY_CATEGORY_AND_TAGS,
    STOP_GET_PRODUCTS_BY_CATEGORY_AND_TAGS,

    // ---> post list of products to find
    POST_LIST_OF_PRODUCTS_OF_STATIC_DEVICES_TO_FIND,
    STOP_POST_LIST_OF_PRODUCTS_OF_STATIC_DEVICES_TO_FIND,
    
    // top5Products --> mode three
    GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS,
    STOP_GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS,

        // live
        GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS_LIVE,
        STOP_GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS_LIVE,

    // top5Product --> mode four
    GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT,
    STOP_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT,

        // live
        GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT_LIVE,
        STOP_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT_LIVE,
    
} from '../types'

// firebase client libs
import firebase from '../../fb/utilities/firebase'
// axios 
import axios from 'axios'

// ---> search products by category and tags
export const searchStaticDevicesProductsByCategoryAndTags = (data) => async (dispatch) => {
    // var
    let dataIn = await data
    console.log({dataIn})
    // run it
    try {
        let dataByCategoryAndTags = await axios
            .post(`/staticdevice/products/category/tags/`,dataIn)
        const res = await dataByCategoryAndTags 
        console.log({res})
        dispatch({ 
            type: GET_PRODUCTS_BY_CATEGORY_AND_TAGS,
            payload: res.data
        })
        dispatch({ type: STOP_GET_PRODUCTS_BY_CATEGORY_AND_TAGS })
    } catch (error) {
        console.log(error)
    }
}

// ---> post list of products to find
export const postListOfProductsOfStaticDevicesToFind = (data) => async (dispatch) => {
    // var
    let dataToSend = data
    
    try { 
        let dataTag = axios
            .post(`/userdevice/postlistofproducts`,dataToSend)
        const res = await dataTag
        console.log({res})
        dispatch({ 
            type: POST_LIST_OF_PRODUCTS_OF_STATIC_DEVICES_TO_FIND,
            payload: res.data
        })
        dispatch({ type: STOP_POST_LIST_OF_PRODUCTS_OF_STATIC_DEVICES_TO_FIND })
    } catch (error) {
        console.log(error)
    }
}

// declarate a function to get data from db for top5Products (modeThree) --> static data
// data of selected products
export const userDeviceTop5ProductsSyncDataStatic = (thingId) => (dispatch) => {
    
    // vars to ask to db do
    const thingIdVal = thingId
    const userDeviceId = thingIdVal.split("-").slice(2);

    // snapshot
    const data = firebase.firestore()
        .doc(`/userDevices/${userDeviceId}`) 
        .collection('top5Products')
        .orderBy('meters', 'asc')
        .get()
    
    // var to hold list
    let listOfTop5Products = []

    // push data
    const observer = data.then(dataSnapshot => {
        dataSnapshot.forEach((doc)=>{
            listOfTop5Products.push({
                ...doc.data()
            })
        })
        // dispatch
        dispatch({ 
            type: GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS,
            payload: listOfTop5Products
        });
        dispatch({ type: STOP_GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS });
    }, err => {
        console.log(`Encountered error: ${err}`);
    });
}

// to get data from db for top5Products (modeThree) --> dynamic data
export const userDeviceTop5ProductsSyncDataLiveDB = (thingId) => (dispatch) => {
    
    // print
    console.log(`init live top5Products`)

    // vars to ask to db do
    const thingIdVal = thingId
    const userDeviceId = thingIdVal.split("-").slice(2);
    // print init
    console.log(`hi from init of top5Productss listener`)
    // var to hold the length of doc in collection
    let collectionLength = 0
    // arr
    let arr = []
    // ref db
    const dataRef = firebase
        .firestore()
        .doc(`/userDevices/${userDeviceId}`) 
        .collection('top5Products')
        //.orderBy('meters','asc')

    // length of doc in collection
    const findLength = dataRef.get().then(snap => {
        return collectionLength = snap.size
    });
    console.log(`size:${collectionLength}`)
 
    // snapshot
    const snap = dataRef
        .onSnapshot((querySnapshot)=>{
            // print
            console.log(`snapshot products`)
            // snap
            const tagsMeters = querySnapshot
                .docChanges()
                .map((change)=>{
                    if(change.type === 'modified'){
                        // all data
                        const data = {...change.doc.data()}
                        return arr.push(data)
                    }
                })

                // checker if something change
                if(querySnapshot.docChanges().length != 0){
                    // check lengths
                    if(arr.length === collectionLength){
                        // sort the arr
                        let arrSort = arr.sort((a, b) => a.meters - b.meters)
                        // print
                        console.log(`minVal:${JSON.stringify(arrSort)}`)
                        // dispatch data
                        dispatch({ 
                            type: GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS_LIVE,
                            payload:arrSort
                        });
                        // events
                        dispatch({ type: STOP_GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS_LIVE })
                        // reset arr
                        arr = []
                        console.log(`arrEmpty:${arr}`)
                    }
                }
        },err => {
            console.log(`Encountered error: ${err}`);
        })   
}

// declarate a function to get data from a specifics one db for top5Products (modeFour) --> static data
// --> to check
// export const userDeviceSpecificTop5ProductSyncData = (thingId, docId, [...arrIds]) => (dispatch) => {

//     // arrIds
//     const arrListOfTags = [...arrIds]
//     // arrResults 
//     const arrResults = []
//     // vars to ask to db do
//     const thingIdVal = thingId
//     const userDeviceId = thingIdVal.split("-").slice(2);

//     // loop
//     for(let arrListOfTag in arrListOfTags){
//         // snapshot
//         const data = firebase.firestore()
//             .doc(`/userDevices/${userDeviceId}`) 
//             .collection('top5Products')
//             .where('thingId','==',arrListOfTag) // ---> id doc
//             .get()
//             .then((doc)=>{
//                 arrResults.push([
//                     ...doc.data()
//                 ])
//                 return arrResults
//             })
//             .catch((err)=>{
//                 console.log(err)
//             })
//     }
    
//     // push data
//     const observer = data.then(doc => {
//         const resultDB = doc.data(); 
//         // dispatch
//         dispatch({ 
//             type: GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT,
//             payload: resultDB
//         });
//         dispatch({ type: STOP_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT });
//     }, err => {
//         console.log(`Encountered error: ${err}`);
//     });
// }

// declarate a function to get data from a specifics one db for top5Products (modeFour) --> dynamic data
// export const userDeviceSpecificTop5ProductSyncDataLiveDB = () => (dispatch) => {

//     console.log(`init live top5Product`)

//     // vars to ask to db do
//     const thingIdVal = thingId
//     const userDeviceId = thingIdVal.split("-").slice(2);
//     // print init
//     console.log(`hi from init of top5Tag listener`)
//     // var to hold the length of doc in collection
//     let collectionLength = 0
//     // arr
//     let arr = []
//     // ref db
//     const dataRef = firebase
//         .firestore()
//         .doc(`/userDevices/${userDeviceId}`) 
//         .collection('top5Products')
//         //.orderBy('meters','asc')

//     // length of doc in collection
//     const findLength = dataRef.get().then(snap => {
//         return collectionLength = snap.size
//     });
//     console.log(`size:${collectionLength}`)

//     // snapshot
//     const snap = dataRef
//         .onSnapshot((querySnapshot)=>{
//             // print
//             console.log(`snapshot`)
//             // snap
//             const tagsMeters = querySnapshot
//                 .docChanges()
//                 .map((change)=>{
//                     if(change.type === 'modified'){
//                         // all data
//                         const data = {...change.doc.data()}
//                         return arr.push(data)
//                     }
//                 })

//                 // checker if something change
//                 if(querySnapshot.docChanges().length != 0){
//                     // check lengths
//                     if(arr.length === collectionLength){
//                         // sort the arr
//                         let arrSort = arr.sort((a, b) => a.meters - b.meters)
//                         // print
//                         console.log(`minVal:${JSON.stringify(arrSort)}`)
//                         // dispatch data
//                         dispatch({ 
//                             type: GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT_LIVE,
//                             payload:arrSort
//                         });
//                         // events
//                         dispatch({ type: STOP_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT_LIVE })
//                         // reset arr
//                         arr = []
//                         console.log(`arrEmpty:${arr}`)
//                     }
//                 }
//         },err => {
//             console.log(`Encountered error: ${err}`);
//         }) 
// }

