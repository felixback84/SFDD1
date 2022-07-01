// user actions
import {

    // ---> search products by category and tags
    GET_PRODUCTS_BY_CATEGORY_AND_TAGS,
    STOP_GET_PRODUCTS_BY_CATEGORY_AND_TAGS,

    // ---> search products by category and tags
    GET_PRODUCTS_BY_CATEGORIES_AND_TAGS,
    STOP_GET_PRODUCTS_BY_CATEGORIES_AND_TAGS,

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
    
    // MTS --> modeEight
    GET_DATA_FROM_USER_STATICS_PRODUCTS_CLOSER_TO_USER_DEVICE_BY_METERS,
    STOP_GET_DATA_FROM_USER_STATICS_PRODUCTS_CLOSER_TO_USER_DEVICE_BY_METERS,

    POST_USER_STATIC_PRODUCTS_SELECTED_BY_USERS_AFTER_MTS_RANGE_MATCH_IN_LIVEDATASETS_AND_TOP_5_PRODUCTS,
    STOP_POST_USER_STATIC_PRODUCTS_SELECTED_BY_USERS_AFTER_MTS_RANGE_MATCH_IN_LIVEDATASETS_AND_TOP_5_PRODUCTS
    
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

// ---> search products by categories and tags
export const searchStaticDevicesProductsByCategoriesAndTags = (data) => async (dispatch) => {
    // var
    let dataIn = await data
    console.log({dataIn})
    // run it
    try {
        let dataByCategoryAndTags = await axios
            .post(`/staticdevice/products/categories/tags/`,dataIn)
        const res = await dataByCategoryAndTags 
        console.log({res})
        dispatch({ 
            type: GET_PRODUCTS_BY_CATEGORIES_AND_TAGS,
            payload: res.data
        })
        dispatch({ type: STOP_GET_PRODUCTS_BY_CATEGORIES_AND_TAGS })
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
        })
        dispatch({ type: STOP_GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS })
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
    })  
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
                        })
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

// to get data from a specifics one db for top5Products (modeFour) --> static data
export const userDeviceSpecificTop5ProductSyncData = (thingId,arrIds) => (dispatch) => {

    // arrIds
    const arrListOfTags = arrIds
    // arrResults 
    const arrResults = []
    // vars to ask to db do
    const thingIdVal = thingId
    const userDeviceId = thingIdVal.split("-").slice(2);

    // map select ones
    let result = arrListOfTags.map((arrListOfTag) => {
        // print
        console.log(`arrListOfTag.top5ProductDocId: ${arrListOfTag.top5ProductDocId}`)
        // snapshot
        const ref = firebase.firestore()
        .doc(`/userDevices/${userDeviceId}/top5Products/${arrListOfTag.top5ProductDocId}`) 
        .get()
        .then((doc)=>{
            // push in arr
            arrResults.push({
                ...doc.data()
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    })
    // dispatchers
    dispatch({ 
        type: GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT,
        payload: arrResults
    })    
    dispatch({ type: STOP_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT });


}

// to get data from a specifics one db for top5Products (modeFour) --> dynamic data
export const userDeviceSpecificTop5ProductSyncDataLiveDB = (thingId,arrIds) => async (dispatch) => {

    console.log(`init live top5Product`)

    // vars to ask to db document
    const thingIdVal = thingId
    const idsVendors = arrIds
    const userDeviceId = thingIdVal.split("-").slice(2)

    // print init
    console.log(
        `hi from init of top5Products listener: idsVendors 
        - ${JSON.stringify(idsVendors)} -- thingIdVal - ${thingIdVal}`
    )

    // arrs
    let arrToFilter = []
    let arrResultFilter = [] 
    
    // ref db
    const dataRef = await firebase
        .firestore()
        .doc(`/userDevices/${userDeviceId}`) 
        .collection('top5Products')
        //.orderBy('meters','asc')

    // get the right docs
    const docToTrack = await dataRef
        .get() 
    
    // create arr to filter    
    docToTrack
        .forEach((doc)=>{
            arrToFilter.push({...doc.data()})
        })
    
    // filter with select ones
    arrToFilter.filter((doc)=>{
        idsVendors.forEach((idVendor)=>{
            if(doc.thingId === idVendor.thingIdToSearch){
                arrResultFilter.push(doc)
                // return arrResultFilter 
            }
        })
    })
    
    // update just the changes in all the list created for the modeOne
    const snapOnlyWithChanges = await dataRef
        .onSnapshot((querySnapshot)=>{
            // snap
            querySnapshot
                .docChanges()
                .forEach((change)=>{
                    // check if exists changes
                    if(change.type === 'modified'){
                        const customFilter = (arr,searchValue) => {
                            // loop
                            arr.forEach((item, index) => {
                                if(item.thingId === searchValue.doc.data().thingId){
                                    // data to replace
                                    const data = {
                                        ...change.doc.data()
                                    }
                                    // replace data in the right index
                                    arrResultFilter[index] = data
                                    // print
                                    console.log(`to reducer: ${JSON.stringify(arrResultFilter)}`)
                                    // dispatchers
                                    dispatch({ 
                                        type:GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT_LIVE, 
                                        payload:arrResultFilter
                                    })
                                    // events
                                    dispatch({ type:STOP_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT_LIVE })
                                } else {
                                    return
                                }
                            })
                        }
                        // run it
                        customFilter(arrResultFilter,change)   
                    }
                }) 
            },(err)=>{
                console.log(`Encountered error: ${err}`)
            }
        )
}

// search by meters & geoHashes staticDevices products --> before modeEight
export const searchByGeohashesAndMetersStaticDevicesProducts = ({category,coords,meters}) => async (dispatch) => {
    try {
        const dataTag = await 
        axios
            .get(`/userdevice/findstaticsProducts/category/${category}/lat/${coords.lat}/lng/${coords.lon}/mts/${meters}`)
            const res = await dataTag
            console.log(`res from top5Products search in mts range: ${res}`)
            dispatch({ 
                type: GET_DATA_FROM_USER_STATICS_PRODUCTS_CLOSER_TO_USER_DEVICE_BY_METERS,
                payload: res.data
            })
            dispatch({ type: STOP_GET_DATA_FROM_USER_STATICS_PRODUCTS_CLOSER_TO_USER_DEVICE_BY_METERS })
    } catch (error) {
        console.log(error)
    }
}

// post in liveDataSets selected products ids after mts range search and on top5Products
export const postListOfTop5ProductsInUserDeviceDoc = (data) => async (dispatch) => {
    try {
        const dataTag = await 
        axios
            .post(`/userdevice/postTop5Products/`,data)
            const res = await dataTag
            console.log(`res from top5Products creation after search in mts range: ${res}`)
            dispatch({ 
                type: POST_USER_STATIC_PRODUCTS_SELECTED_BY_USERS_AFTER_MTS_RANGE_MATCH_IN_LIVEDATASETS_AND_TOP_5_PRODUCTS,
                payload: res.data
            })
            dispatch({ type: STOP_POST_USER_STATIC_PRODUCTS_SELECTED_BY_USERS_AFTER_MTS_RANGE_MATCH_IN_LIVEDATASETS_AND_TOP_5_PRODUCTS })
    } catch (error) {
        console.log(error)
    }
}