// userDevices actions
import {
    LOADING_UI,
    STOP_LOADING_UI,
    LOADING_USER_DEVICES,
    GET_USER_DEVICES,
    GET_USER_DEVICE,
    GET_ACTIVE_USER_DEVICES,
    GET_INACTIVE_USER_DEVICES,
    SET_HEARTBEAT_SEARCHING_MODE,
    GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS,
    GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG,
    GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS,
    GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT
} from '../types';

// firebase client libs
import firebase from '../../fb/utilities/firebase'; 
 
// axios
import axios from 'axios';

// redux action to get one specific userDevice
export const getUserDevices = () => (dispatch) => {
    dispatch({ type: LOADING_UI });
    dispatch({ type: LOADING_USER_DEVICES });
    axios
        .get(`/userdevices`)
        .then((res) => { 
            dispatch({
                type: GET_USER_DEVICES,
                payload: res.data
            });
            //dispatch({ type: STOP_LOADING_USER_DEVICES});
            dispatch({ type: STOP_LOADING_UI });
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

// post searching mode
export const heartbeatPostSearchingMode = (objSearchingModeData) => (dispatch) => {
    axios.post(`/userdevice/heartbeat/searchingmode`,objSearchingModeData)
        .then(res => {
            dispatch({
                type: SET_HEARTBEAT_SEARCHING_MODE,
                payload: res.data
            }) 
        })
        .catch(err => console.log(err));
}

///////////////////////////////////////////////////// firebase client connections
// declarate a function to get data from db for top5Tags (modeOne)
export const userDeviceTop5TagsSyncData = (thingId) => (dispatch) => {

    // vars to ask to db do
    const thingIdVal = thingId
    const userDeviceId = thingIdVal.split("-").slice(2);
 
    // snapshot
    const data = firebase
        .firestore()
        .doc(`/userDevices/${userDeviceId}`) 
        .collection('top5Tags')
        .orderBy('meters', 'asc')
        .get()
    
    // var to hold list
    let listOfTop5Tags = []
 
    // push data
    const observer = data.then((dataSnapshot) => {
        dataSnapshot.forEach((doc)=>{
            listOfTop5Tags.push({
                ...doc.data()
            })
        })
        // dispatch
        dispatch({ 
            type: GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS,
            payload: listOfTop5Tags
        });
        dispatch({ type: STOP_LOADING_UI });
    }, err => {
        console.log(`Encountered error: ${err}`);
    });
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

// declarate a function to get data from db fot top5Tags (modeThree)
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

// declarate a function to get data from a specific one db for top5Products (modeFour)
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

