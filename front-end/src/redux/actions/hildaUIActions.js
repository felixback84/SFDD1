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

// function to send active command to things
export const hildaPostActiveCommand = (thingId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post(`/device/hilda/${thingId}/active`)
        .then((res) => {            
            
        })
        .catch(err => {
            dispatch({ 
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}    

// function to send inactive command to things
export const hildaPostInactiveCommand = (thingId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post(`/device/hilda/${thingId}/inactive`)
        .then((res) => {            
            
        })
        .catch(err => {
            dispatch({ 
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
} 

// function to send color command with the data to device
export const hildaPostColorCommand = (thingId, colorValues) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post(`/device/hilda/${thingId}/color`, colorValues)
        // .then((res) => {            
            
        // })
        // .catch(err => {
        //     dispatch({ 
        //         type: SET_ERRORS,
        //         payload: err.response.data
        //     })
        // });
}

