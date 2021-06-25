// userDevices actions
import {
    // ui
    LOADING_UI,
    STOP_LOADING_UI,
    // userDevices
    GET_USER_DEVICES,
    LOADING_USER_DEVICES,
    STOP_LOADING_USER_DEVICES,
    // userDevice
    GET_USER_DEVICE,
    // active userDevice
    GET_ACTIVE_USER_DEVICES,
    // inactive userDevice
    GET_INACTIVE_USER_DEVICES,
    // top5Tags
    GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS, 
    STOP_LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS,
        // top5Tags
        GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS_LIVE, 
        STOP_LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS_LIVE,
    // top5Tag
    GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG,
    // top5Products
    GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS,
    // top5Product
    GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT, 
} from '../types';

// firebase client libs
import firebase from '../../fb/utilities/firebase'; 
 
// axios 
import axios from 'axios';

// redux action to get one specific userDevice
export const getUserDevices = () => (dispatch) => {
    // events
    dispatch({ type: LOADING_UI });
    dispatch({ type: LOADING_USER_DEVICES });

    axios 
        .get(`/userdevices`)
        .then((res) => { 
            dispatch({
                type: GET_USER_DEVICES,
                payload: res.data
            });
            
            // events
            dispatch({ type: STOP_LOADING_UI });
            dispatch({ type: STOP_LOADING_USER_DEVICES });
        })
        .catch((err) => console.log(err));
}

// redux action to get one specific userDevice
export const getUserDevice = (userdeviceid) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    //dispatch({ type: LOADING_USER_DEVICES });
    axios
        .get(`/userdevices/${userdeviceid}`)
        .then((res) => { 
            dispatch({
                type: GET_USER_DEVICE,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => console.log(err));
}

// active userDevice
export const activeUserDevice = (userdeviceid) => (dispatch) => {
    axios.get(`/userdevices/${userdeviceid}/active`)
        .then(res => {
            dispatch({
                type: GET_ACTIVE_USER_DEVICES,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

// inactive userDevice
export const inactiveUserDevice = (userdeviceid) => (dispatch) => {
    axios.get(`/userdevices/${userdeviceid}/inactive`)
        .then(res => {
            dispatch({
                type: GET_INACTIVE_USER_DEVICES,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

///////////////////////////////////////////////////// firebase client connections
// to get data from db for top5Tags (modeOne) --> static data --> disabled
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
        dispatch({ type:STOP_LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS })
        
    })
    .catch((err)=>{
        console.err(err)
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
                        // just meters
                        // const meters = change.doc.data().meters
                        // return arr.push(meters)
                        // all data
                        const data = {...change.doc.data()}
                        return arr.push(data)
                    }
                })

                // checker if something change
                if(querySnapshot.docChanges().length != 0){
                    // check lengths
                    if(arr.length === collectionLength){
                        // find the lowest value in arr
                        // const minArr = Math.min(...arr.meters)
                        // sort the arr
                        let arrSort = arr.sort((a, b) => a.meters - b.meters)
                        // print
                        console.log(`minVal:${JSON.stringify(arrSort)}`)
                        // dispatch data
                        dispatch({ 
                            type: GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS_LIVE,
                            payload: arrSort
                        });
                        // events
                        dispatch({ type:STOP_LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS_LIVE })
                        // reset arr
                        arr = []
                        console.log(`arrEmpty:${arr}`)
                    }
                }
        })   
}

// declarate a function to get data from a specific db for top5Tags (modeTwo)
export const userDeviceSpecificTop5TagSyncData = (thingId, docId) => (dispatch) => {
    
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
        dispatch({ type: STOP_LOADING_UI });
    }, err => {
        console.log(`Encountered error: ${err}`);
    });
}

// declarate a function to get data from db for top5Products (modeThree)
export const userDeviceTop5ProductsSyncData = (thingId) => (dispatch) => {
    
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
        dispatch({ type: STOP_LOADING_UI });
    }, err => {
        console.log(`Encountered error: ${err}`);
    });
}

// declarate a function to get data from a specifics one db for top5Products (modeFour)
export const userDeviceSpecificTop5ProductSyncData = (thingId, docId) => (dispatch) => {

    // vars to ask to db do
    const thingIdVal = thingId
    const userDeviceId = thingIdVal.split("-").slice(2);

    // snapshot
    const data = firebase.firestore()
        .doc(`/userDevices/${userDeviceId}`) 
        .collection('top5Products')
        .doc(docId)
        .get()
    
    // push data
    const observer = data.then(doc => {
        const resultDB = doc.data(); 
        // dispatch
        dispatch({ 
            type: GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT,
            payload: resultDB
        });
        dispatch({ type: STOP_LOADING_UI });
    }, err => {
        console.log(`Encountered error: ${err}`);
    });
}


