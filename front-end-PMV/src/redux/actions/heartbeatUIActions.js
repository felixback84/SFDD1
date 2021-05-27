// user actions
import {
    LOADING_UI,
    STOP_LOADING_UI,
    //POST_ACTIVE_COMMAND_HEARTBEAT_THING,
    //POST_INACTIVE_COMMAND_HEARTBEAT_THING,
    //GET_TOP5_PRODUCTS_AND_MTS_BETWEEN_DEVICES_TO_PRODUCTS,
    LOADING_GET_EVENTS_FROM_HEARTBEAT_THING,
    GET_EVENTS_FROM_HEARTBEAT_THING,
    STOP_LOADING_GET_EVENTS_FROM_HEARTBEAT_THING,
    POST_TAGS_OF_PROFILE_TO_MATCH_BY_USER_IN_LIVEDATASETS,
    //GET_TOP5COORDSMATCHES,
    SET_ERRORS
} from '../types'; 

// firebase client libs
import firebase from '../../fb/utilities/firebase'; 
// axios 
import axios from 'axios';

// declarate a function to get data from db
export const heartbeatThingSyncDataWithLiveDB = (thingId) => (dispatch) => {
    // event
    dispatch({ type: LOADING_GET_EVENTS_FROM_HEARTBEAT_THING });

    // vars to ask to db do
    const thingIdVal = thingId
    const userDeviceId = thingIdVal.split("-").slice(2);
 
    // snapshot
    const doc = firebase
        .firestore().doc(`/userDevices/${userDeviceId}`) 
        .collection('liveDataSets').doc(thingId)
    const observer = doc.onSnapshot(docSnapshot => {
        const resultDB = docSnapshot.data();    
        // dispatch data
        dispatch({ 
            type: GET_EVENTS_FROM_HEARTBEAT_THING,
            payload: resultDB
        });
        // event
        dispatch({ type: STOP_LOADING_GET_EVENTS_FROM_HEARTBEAT_THING });
    }, err => {
        console.log(`Encountered error: ${err}`);
    });
}

// function to post active command to things
export const heartbeatPostActiveCommand = (thingId, activeValue) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post(`/device/heartbeat/${thingId}/active`, activeValue)
        // .then((res) => {            
        //     dispatch({ 
        //         type: POST_ACTIVE_COMMAND_HEARTBEAT_THING,
        //         payload: res.data
        //     })
        // })
        .catch(err => {
            dispatch({ 
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}    

// function to post inactive command to things
export const heartbeatPostInactiveCommand = (thingId, inactiveValue) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post(`/device/heartbeat/${thingId}/inactive`, inactiveValue)
        // .then((res) => {            
        //     dispatch({ 
        //         type: POST_INACTIVE_COMMAND_HEARTBEAT_THING,
        //         payload: res.data
        //     })
        // })
        .catch(err => {
            dispatch({ 
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
} 

// post tags selected by user
export const postTagsProfileToMatch = (objTagsData) => (dispatch) => {
    axios.post(`/userdevice/profileToSearch`,objTagsData)
        .then(res => {
            dispatch({
                type: POST_TAGS_OF_PROFILE_TO_MATCH_BY_USER_IN_LIVEDATASETS,
                payload: res.data
            }) 
        })
        .catch(err => console.log(err));
}






