// user actions
import {
    // ** db interaction
    // top5Tags --> mode one
    GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS,
    STOP_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS,
        // live 
        GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS_LIVE,
        STOP_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS_LIVE,

    // top5Tag --> mode two
    GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG,
    STOP_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG,   
        // live
        GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG_LIVE,
        STOP_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG_LIVE,

    // ** MTS    
    // seacrh geoHashes & meters
    GET_DATA_FROM_USER_STATICS_PRODUCTS_CLOSER_TO_USER_DEVICE_BY_METERS,  
    STOP_GET_DATA_FROM_USER_STATICS_PRODUCTS_CLOSER_TO_USER_DEVICE_BY_METERS, 
    
    // post top5tags -- creation
    POST_TOP_5_TAGS_IN_USER_DEVICES_COLLECTION,
    STOP_POST_TOP_5_TAGS_IN_USER_DEVICES_COLLECTION,

    // ** ux
    GET_TOP5TAG_UX,
    STOP_GET_TOP5TAG_UX,
    
} from '../types'; 

// firebase client libs
import firebase from '../../fb/utilities/firebase'
// axios 
import axios from 'axios'
import { forEach } from 'underscore';

///////////////////////////////////// searching modes ////////////////////////////////////
// to get data from db for top5Tags (modeOne) --> static data
export const userDeviceTop5TagsSyncDataStatic = (thingId) => (dispatch) => {

    console.log(`init static top5Tags`)

    // vars to ask to db do
    const thingIdVal = thingId
    const userDeviceId = thingIdVal.split("-").slice(2);

    // snapshot
    const dataRef = firebase
        .firestore()
        .doc(`/userDevices/${userDeviceId}`) 
        .collection('top5Tags')
        .orderBy('meters', 'asc')
        .get()
    
    // var to hold list
    let listOfTop5Tags = []

    // push data
    const dataArr = dataRef.then((data) => {
        // push in the arr
        data.forEach((doc)=>{
            listOfTop5Tags.push({
                ...doc.data(),
                top5TagId:doc.id
            })
        }) 
        // dispatch
        dispatch({ 
            type: GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS,
            payload: listOfTop5Tags
        });

        // events
        dispatch({ type: STOP_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS })
        
    })
    .catch((err)=>{
        console.log(err)
    })
}

// to get data from db for top5Tags (modeOne) --> dynamic data
export const userDeviceTop5TagsSyncDataLiveDB = (thingId) => (dispatch) => {

    // print init
    console.log(`init live top5Tags`)

    // vars to ask to db do
    const thingIdVal = thingId
    const userDeviceId = thingIdVal.split("-").slice(2);
    // print init
    console.log(`hi from init of top5Tags listener`)
    // var to hold the length of doc in collection
    let collectionLength = 0
    // arr
    let arr = [] 
    // ref db
    const dataRef = firebase
        .firestore()
        .doc(`/userDevices/${userDeviceId}`) 
        .collection('top5Tags')
        //.orderBy('meters','asc')

    // length of doc in collection ---> se debe hayar la longitud del array con onSnapshot
    const findLength = dataRef
        .get()
        .then((snap) => {
            return collectionLength = snap.size
        })
        .catch((err)=>{
            console.log(err)
        })
        
    // print
    console.log(`size:${collectionLength}`)

    // snapshot
    const snap = dataRef
        .onSnapshot((querySnapshot)=>{
            // print
            console.log(`snapshot top5Tags`)
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

                // checker if something change ---> erros with checker
                if(querySnapshot.docChanges().length != 0){
                    // check lengths
                    if(arr.length === collectionLength){
                        // sort the arr
                        let arrSort = arr.sort((a, b) => a.meters - b.meters)
                        // print
                        console.log(`minVal:${JSON.stringify(arrSort)}`)
                        // dispatch data
                        dispatch({ 
                            type: GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS_LIVE,
                            payload:arr
                        });
                        // events
                        dispatch({ type: STOP_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS_LIVE })
                        // reset arr
                        arr = []
                        console.log(`arrEmpty:${arr}`)
                    }
                }
        },err => {
            console.log(`Encountered error: ${err}`);
        })   
}

// declarate a function to get data from a specific db for top5Tags (modeTwo) ---- now more than one vendor
/// ----> to check
export const userDeviceSpecificTop5TagSyncDataStatic = (thingId, arrIds) => (dispatch) => {
    // arrIds
    const arrListOfTags = arrIds
    // arrResults 
    const arrResults = []
    // vars to ask to db doc
    const thingIdVal = thingId
    const userDeviceId = thingIdVal.split("-").slice(2)
    // loop
    let result = arrListOfTags.map((arrListOfTag) => {
        // print
        console.log(`arrListOfTag.top5TagDocId: ${arrListOfTag.top5TagDocId}`)
        // snapshot
        const ref = firebase.firestore()
        .doc(`/userDevices/${userDeviceId}/top5Tags/${arrListOfTag.top5TagDocId}`) 
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
        type: GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG,
        payload: arrResults
    })    
    dispatch({ type: STOP_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG });
}

// listen the top5tag (modeTwo) --> dynamic data
export const userDeviceSpecificTop5TagSyncDataLiveDB = (thingId, arrIds) => async (dispatch) => {

    // vars to ask to db document
    const thingIdVal = thingId
    const idsVendors = arrIds
    const userDeviceId = thingIdVal.split("-").slice(2)

    // print init
    console.log(
        `hi from init of top5Tag listener: idsVendors 
        - ${JSON.stringify(idsVendors)} -- thingIdVal - ${thingIdVal}`
    )
    // arrs
    let arrToFilter = []
    let arrResultFilter = [] 
    
    // ref db
    const dataRef = await firebase
        .firestore()
        .doc(`/userDevices/${userDeviceId}`) 
        .collection('top5Tags')
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
                                        type:GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG_LIVE,
                                        payload:arrResultFilter
                                    })
                                    // events
                                    dispatch({ type:STOP_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG_LIVE })
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

// search by meters & geoHashes
export const searchByGeohashesAndMetersStaticDevicesProducts = ({coords,meters}) => async (dispatch) => {
    try {
        const dataTag = await 
        axios
            .get(`/staticdevices/findstatics/lat/${coords.lat}/lng/${coords.lng}/mts/${meters}`)
            const res = await dataTag
            console.log({res})
            dispatch({ 
                type: GET_DATA_FROM_USER_STATICS_PRODUCTS_CLOSER_TO_USER_DEVICE_BY_METERS,
                payload: res.data
            })
            dispatch({ type: STOP_GET_DATA_FROM_USER_STATICS_PRODUCTS_CLOSER_TO_USER_DEVICE_BY_METERS })
    } catch (error) {
        console.log(error)
    }
}

// post top5Tags selected 
export const postListOfTop5TagsInUserDeviceDoc = (dataz) => async (dispatch) => {
    try {
        const data = {
            resultListSearch:{
                thingId: dataz.thingId,
                staticDevicesIdsArr: dataz.staticDevicesIdsArr
            }
        }

        const dataTag = await 
            axios
                .post(`/userdevice/create/top5tags`,data)
                const res = await dataTag
                console.log({res})
                dispatch({ 
                    type: POST_TOP_5_TAGS_IN_USER_DEVICES_COLLECTION,
                    payload: res.data
                })
                dispatch({ type: STOP_POST_TOP_5_TAGS_IN_USER_DEVICES_COLLECTION })
    } catch (error) {
        console.log(error)
    }
}
 
// get specific top5Tags - ux
export const findSpecificTop5Tag = (userDeviceId,top5TagId) => async (dispatch) => {
    
    try { 
        const dataTag = await 
        axios
            .get(`/userdevices/${userDeviceId}/top5tags/${top5TagId}`)
            // res
            const res = await dataTag
            // print
            console.log(`findSpecificTop5Tag res:${JSON.stringify(res)}`)
            // dispatchers
            dispatch({ 
                type: GET_TOP5TAG_UX,
                payload: res.data
            })
            dispatch({ type: STOP_GET_TOP5TAG_UX })
    } catch (error) {
        console.log(error)
    }

        // // .then((res) => {            
        // //     dispatch({ 
        // //         type: POST_ACTIVE_COMMAND_HEARTBEAT_THING,
        // //         payload: res.data
        // //     })
        // // })
        // .catch(err => {
        //     dispatch({ 
        //         type: SET_ERRORS,
        //         payload: err.response.data
        //     })
        // });
}

// pass top5TagId to the reducer
// export const saveTop5TagIdInReducer = (top5TagId) => (dispatch) => {
//     // top5TagId
//     const id = top5TagId
//     // dispatchers
//     dispatch({
//         type: SET_IN_REDUCER_TOP_5_TAG_ID,
//         top5TagArr: id
//     })
//     dispatch({ type: STOP_UI })
// }