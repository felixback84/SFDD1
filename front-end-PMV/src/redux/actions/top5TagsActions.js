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
                ...doc.data()
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
export const userDeviceSpecificTop5TagSyncData = (thingId, docId) => (dispatch) => {
    // se puede eliminar de la lista total en el mapa los que el usuario seleccione
    // aunque ya hay metodo en servidor que soporta multiples querys

    // vars to ask to db do
    const thingIdVal = thingId
    const userDeviceId = thingIdVal.split("-").slice(2);

    // snapshot
    const data = firebase.firestore()
        .doc(`/userDevices/${userDeviceId}`) 
        .collection('top5Tags')
        .doc(docId)
        .get()
    
    // push data
    const observer = data.then(doc => {
        
        const resultDB = doc.data(); 
        // dispatch
        dispatch({ 
            type: GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG,
            payload: resultDB
        });
        dispatch({ type: STOP_LOADING_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG });
    }, err => {
        console.log(`Encountered error: ${err}`);
    });
}

// listen the 
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

// get the products of a specific vendor-static-staticDevice - UX
export const findSpecificTop5Tag = (userDeviceId,top5tagId) => async (dispatch) => {
    
    try {
        const dataTag = await 
        axios
            .get(`/userdevices/${userDeviceId}/top5tags/${top5tagId}`)
            const res = await dataTag
            console.log({res})
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