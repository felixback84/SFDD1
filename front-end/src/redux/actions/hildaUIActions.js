// user actions
import {
    LOADING_UI,
    STOP_LOADING_UI,
    GET_EVENTS_FROM_HILDA_THING,
    LOADING_GET_EVENTS_FROM_HILDA_THING
} from '../types';

// axios
import axios from 'axios';

// firebase client libs
import firebase from '../../fb/utilities/firebase'; 

// declarate a function to get data from db liveDataSets
export const hildaThingSyncDataWithLiveDB = (thingId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    // vars to ask to db do
    const userDeviceId = thingId.split("-").slice(2);
    // snapshot
    const doc = firebase
        .firestore().doc(`/userDevices/${userDeviceId}`)
        .collection('liveDataSets').doc(thingId)
    const observer = doc.onSnapshot(docSnapshot => {
        const resultDB = docSnapshot.data();
        console.log(`Received doc snapshot: ${resultDB}}`);
        // dispatch
        dispatch({ 
            type: GET_EVENTS_FROM_HILDA_THING,
            payload: resultDB
        });
        dispatch({ type: STOP_LOADING_UI });
    }, err => {
        console.log(`Encountered error: ${err}`);
    });
}

// function to post active command to things
export const hildaPostActiveCommand = (thingId, activeValue) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post(`/device/hilda/${thingId}/active`, activeValue)
        .then((res) => {            
            
        })
        // .catch(err => {
        //     dispatch({ 
        //         type: SET_ERRORS,
        //         payload: err.response.data
        //     })
        // });
}    

// function to post inactive command to things
export const hildaPostInactiveCommand = (thingId, inactiveValue) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post(`/device/hilda/${thingId}/inactive`, inactiveValue)
        .then((res) => {            
            
        })
        // .catch(err => {
        //     dispatch({ 
        //         type: SET_ERRORS,
        //         payload: err.response.data
        //     })
        // });
} 

// function to post motor speed command to things
export const hildaPostMotorSpeedCommand = (thingId, speedValue) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post(`/device/hilda/${thingId}/motorSpeed`, speedValue)
        .then((res) => {            
            
        })
        // .catch(err => {
        //     dispatch({ 
        //         type: SET_ERRORS,
        //         payload: err.response.data
        //     })
        // });
} 

// function to post color command with the data to device
export const hildaPostColorCommand = (thingId, colorValue) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post(`/device/hilda/${thingId}/color`, colorValue)
        .then((res) => {            
            
        })
        // .catch(err => {
        //     dispatch({ 
        //         type: SET_ERRORS,
        //         payload: err.response.data
        //     })
        // });
}

