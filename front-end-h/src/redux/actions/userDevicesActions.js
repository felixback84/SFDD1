// userDevices actions
import {
    LOADING_UI,
    STOP_LOADING_UI,
    LOADING_USER_DEVICES,
    GET_USER_DEVICES,
    GET_USER_DEVICE,
    GET_ACTIVE_USER_DEVICES,
    GET_INACTIVE_USER_DEVICES
} from '../types';
 
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

///////////////////////////////////////////////////// firebase client connections
// declarate a function to get data from db fot top5Tags (modeOne)
export const heartbeatThingSyncDataWithLiveDB = (thingId) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    // vars to ask to db do
    const thingIdVal = thingId
    const userDeviceId = thingIdVal.split("-").slice(2);

    // snapshot
    const data = firebase.firestore()
        .doc(`/userDevices/${userDeviceId}`) 
        .collection('top5Tags')
        .get()
    
    // var to hold list
    let listOfTop5Tags = []

    // push data
    const observer = data.onSnapshot(dataSnapshot => {
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

// declarate a function to get data from a specific db fot top5Tags (modeTwo)
export const heartbeatThingSyncDataWithLiveDB = (thingId) => (dispatch) => {
    dispatch({ type: LOADING_UI });

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
    const observer = data.onSnapshot(docSnapshot => {
        const resultDB = docSnapshot.data(); 
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
export const heartbeatThingSyncDataWithLiveDB = (thingId) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    // vars to ask to db do
    const thingIdVal = thingId
    const userDeviceId = thingIdVal.split("-").slice(2);

    // snapshot
    const data = firebase.firestore()
        .doc(`/userDevices/${userDeviceId}`) 
        .collection('top5Products')
        .get()
    
    // var to hold list
    let listOfTop5Products = []

    // push data
    const observer = data.onSnapshot(dataSnapshot => {
        dataSnapshot.forEach((doc)=>{
            listOfTop5Products.push({
                ...doc.data()
            })
        })
        // dispatch
        dispatch({ 
            type: GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS,
            payload: listOfTop5Tags
        });
        dispatch({ type: STOP_LOADING_UI });
    }, err => {
        console.log(`Encountered error: ${err}`);
    });
}

