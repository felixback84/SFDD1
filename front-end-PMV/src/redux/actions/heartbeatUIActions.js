// user actions
import {
    // ui
    LOADING_UI,
    STOP_LOADING_UI,
    // errors
    SET_ERRORS,
    // active command
    POST_ACTIVE_COMMAND_HEARTBEAT_THING,
    // inactive command
    POST_INACTIVE_COMMAND_HEARTBEAT_THING,
    // static data
    GET_EVENTS_FROM_HEARTBEAT_THING,
    STOP_LOADING_GET_EVENTS_FROM_HEARTBEAT_THING,
        // live
        GET_EVENTS_FROM_HEARTBEAT_THING_LIVE,
        STOP_LOADING_GET_EVENTS_FROM_HEARTBEAT_THING_LIVE,
    // seraching mode
    SET_HEARTBEAT_SEARCHING_MODE,
    // post tags by user
    POST_TAGS_OF_PROFILE_TO_MATCH_BY_USER_IN_LIVEDATASETS,
} from '../types'; 

// firebase client libs
import firebase from '../../fb/utilities/firebase'; 
// axios 
import axios from 'axios';

// get once data from liveDataSets (static data)
export const heartbeatThingSyncDataStatic = (thingId) => (dispatch) => {

    console.log(`init static heartbeat`)

    // vars to db
    const thingIdVal = thingId
    const userDeviceId = thingIdVal.split("-").slice(2)

    // db connection
    const doc = firebase 
        .firestore()
        .doc(`/userDevices/${userDeviceId}`) 
        .collection('liveDataSets')
        .doc(thingId)

    return doc
        .get()
        .then((doc)=>{
            const dataSelect = {
                ...doc.data()
            }
            // data dispatch
            dispatch({
                type: GET_EVENTS_FROM_HEARTBEAT_THING,
                payload: dataSelect
            });
            // event
            dispatch({ type: STOP_LOADING_GET_EVENTS_FROM_HEARTBEAT_THING });
        })
        .catch((err)=>{
            console.log(err)
        })    
}

// declarate a function to get data from db
export const heartbeatThingSyncDataLiveDB = (thingId) => (dispatch) => {

    console.log(`init live heartbeat`)

    // vars to ask to db do 
    const thingIdVal = thingId
    const userDeviceId = thingIdVal.split("-").slice(2);
 
    // snapshot
    const doc = firebase
        .firestore()
        .doc(`/userDevices/${userDeviceId}`) 
        .collection('liveDataSets')
        .doc(thingIdVal)
    
    // snap
    const observer = doc
        .onSnapshot((docSnapshot)=>{
            // print
            const resultDB = {
                coords: docSnapshot.data().coords,
                colorValue: docSnapshot.data().colorValue,
                motorSpeed: docSnapshot.data().motorSpeed,
            }
            // print
            console.log(`liveDataSetsDoc: ${JSON.stringify(resultDB)}`)
            // dispatch data
            dispatch({ 
                type: GET_EVENTS_FROM_HEARTBEAT_THING_LIVE,
                payload: resultDB
            });
            // event
            dispatch({ type: STOP_LOADING_GET_EVENTS_FROM_HEARTBEAT_THING_LIVE})
        }, err => {
            console.log(`Encountered error: ${err}`);
        })
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

// post searching mode
export const heartbeatPostSearchingMode = (objSearchingModeData) => (dispatch) => {
    // print
    console.log(`objSearchingModeData:${JSON.stringify(objSearchingModeData)}`)
    // axios
    axios.post(`/userdevice/heartbeat/searchingmode`,objSearchingModeData)
        .then((res) => {
            // dispatch({
            //     type: SET_HEARTBEAT_SEARCHING_MODE,
            //     payload: res.data
            // }) 
            console.log(`searching mode set:${JSON.stringify(res)}`)
        })
        .catch(err => console.log(err));
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







