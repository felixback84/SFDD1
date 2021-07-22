// user actions
import {
    // top5Tags --> mode one
    GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS,
    STOP_LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS,
        // live 
        GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS_LIVE,
        STOP_LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS_LIVE,

    // top5Tag --> mode two
    GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG,
    STOP_LOADING_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG,   
        // live
        GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG_LIVE,
        STOP_LOADING_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG_LIVE,

    ///// MTS    

    // seacrh geoHashes & meters
    GET_DATA_FROM_USER_STATICS_PRODUCTS_CLOSER_TO_USER_DEVICE_BY_METERS,  
    STOP_LOADING_GET_DATA_FROM_USER_STATICS_PRODUCTS_CLOSER_TO_USER_DEVICE_BY_METERS, 
    
    // post top5tags -- creation
    POST_TOP_5_TAGS_IN_USER_DEVICES_COLLECTION,
    STOP_LOADING_POST_TOP_5_TAGS_IN_USER_DEVICES_COLLECTION,

    // ux
    GET_TOP5TAG_UX,
    STOP_LOADING_GET_TOP5TAG_UX,
    
} from '../types'; 

// firebase client libs
import firebase from '../../fb/utilities/firebase'
// axios 
import axios from 'axios'

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
        dispatch({ type: STOP_LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS })
        
    })
    .catch((err)=>{
        console.log(err)
    })
}

// to get data from db for top5Tags (modeOne) --> dynamic data
export const userDeviceTop5TagsSyncDataLiveDB = (thingId) => (dispatch) => {

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

    // length of doc in collection
    const findLength = dataRef.get().then(snap => {
        return collectionLength = snap.size
    });
    console.log(`size:${collectionLength}`)

    // snapshot
    const snap = dataRef
        .onSnapshot((querySnapshot)=>{
            // print
            console.log(`snapshot`)
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
                            type: GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS_LIVE,
                            payload:arrSort
                        });
                        // events
                        dispatch({ type: STOP_LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS_LIVE })
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
export const userDeviceSpecificTop5TagSyncData = (thingId, docId,...arrIds) => (dispatch) => {
    // se puede eliminar de la lista total en el mapa los que el usuario seleccione
    // aunque ya hay metodo en servidor que soporta multiples querys

    // arrIds
    const arrListOfTags = [...arrIds]
    // arrResults 
    const arrResults = []
    // vars to ask to db do
    const thingIdVal = thingId
    const userDeviceId = thingIdVal.split("-").slice(2);
    // loop
    for(let arrListOfTag in arrListOfTags){
        // snapshot
        const data = firebase.firestore()
        .doc(`/userDevices/${userDeviceId}`) 
        .collection('top5Tags')
        .where('thingId','==',arrListOfTag) // ---> id doc
        .get()
        .then((doc)=>{
            arrResults.push([
                ...doc.data()
            ])
            return arrResults
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    // dispatch
    dispatch({ 
        type: GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG,
        payload: arrResults
    })    
    dispatch({ type: STOP_LOADING_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG });
}

// listen the top5tag (modeTwo) --> dynamic data
export const userDeviceTop5TagSyncDataLiveDB = (thingId) => (dispatch) => {

    console.log(`init live top5Tag`)

    // vars to ask to db do
    const thingIdVal = thingId
    const userDeviceId = thingIdVal.split("-").slice(2);
    // print init
    console.log(`hi from init of top5Tag listener`)
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

    // length of doc in collection
    const findLength = dataRef.get().then(snap => {
        return collectionLength = snap.size
    });
    console.log(`size:${collectionLength}`)

    // snapshot
    const snap = dataRef
        .onSnapshot((querySnapshot)=>{
            // print
            console.log(`snapshot`)
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
                            type: GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG_LIVE,
                            payload:arrSort
                        });
                        // events
                        dispatch({ type: STOP_LOADING_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG_LIVE })
                        // reset arr
                        arr = []
                        console.log(`arrEmpty:${arr}`)
                    }
                }
        },err => {
            console.log(`Encountered error: ${err}`);
        })   
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
            dispatch({ type: STOP_LOADING_GET_DATA_FROM_USER_STATICS_PRODUCTS_CLOSER_TO_USER_DEVICE_BY_METERS })
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
                dispatch({ type: STOP_LOADING_POST_TOP_5_TAGS_IN_USER_DEVICES_COLLECTION })
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
            dispatch({ type: STOP_LOADING_GET_TOP5TAG_UX })
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