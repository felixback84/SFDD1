// user actions
import {
    // ui
    LOADING_UI,
    STOP_LOADING_UI,
    // errors
    SET_ERRORS,

    // ** db interaction
    // collect data from user devices - static data
    GET_EVENTS_FROM_HEARTBEAT_THING,
    STOP_GET_EVENTS_FROM_HEARTBEAT_THING,
        // live
        GET_EVENTS_FROM_HEARTBEAT_THING_LIVE,
        STOP_GET_EVENTS_FROM_HEARTBEAT_THING_LIVE,

    // serching mode set
    SET_HEARTBEAT_SEARCHING_MODE,
    STOP_SET_HEARTBEAT_SEARCHING_MODE,
    // post tags by user
    POST_TAGS_OF_PROFILE_TO_MATCH_BY_USER_IN_LIVEDATASETS,
    STOP_POST_TAGS_OF_PROFILE_TO_MATCH_BY_USER_IN_LIVEDATASETS,
    // post item in list of specifics static devices to search by user devices
    POST_LIST_OF_STATIC_DEVICES_TO_SEARCH_IN_LIVEDATASETS,
    STOP_POST_LIST_OF_STATIC_DEVICES_TO_SEARCH_IN_LIVEDATASETS,
    // update (DELETE - unselect) item in list of specifics static devices to search by user devices
    DELETE_ITEM_IN_LIST_OF_STATIC_DEVICES_TO_SEARCH_IN_LIVEDATASETS,
    STOP_DELETE_ITEM_IN_LIST_OF_STATIC_DEVICES_TO_SEARCH_IN_LIVEDATASETS,
    
    // ** thing interaction
    // active command
    POST_ACTIVE_COMMAND_HEARTBEAT_THING,
    // inactive command
    POST_INACTIVE_COMMAND_HEARTBEAT_THING,
} from '../types'; 

// firebase client libs
import firebase from '../../fb/utilities/firebase'; 
// axios 
import axios from 'axios';

// ** interaction with db
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
            // dispatchers
            dispatch({
                type: GET_EVENTS_FROM_HEARTBEAT_THING,
                payload: dataSelect
            });
            // event
            dispatch({ type: STOP_GET_EVENTS_FROM_HEARTBEAT_THING });
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
                searchingMode: docSnapshot.data().searchingMode,
                idOfSpecificStaticDevices: docSnapshot.data().idOfSpecificStaticDevices
            }
            // print
            console.log(`liveDataSetsDoc: ${JSON.stringify(resultDB)}`)
            // dispatchers
            dispatch({ 
                type: GET_EVENTS_FROM_HEARTBEAT_THING_LIVE,
                payload: resultDB
            });
            // event
            dispatch({ type: STOP_GET_EVENTS_FROM_HEARTBEAT_THING_LIVE})
        }, err => {
            console.log(`Encountered error: ${err}`);
        })
}

// post searching mode
export const heartbeatPostSearchingMode = (objSearchingModeData) => (dispatch) => {
    // print
    console.log(`objSearchingModeData:${JSON.stringify(objSearchingModeData)}`)
    // axios
    axios.post(`/userdevice/heartbeat/searchingmode`,objSearchingModeData)
        .then((res) => {
            // print
            console.log(`searching mode set:${JSON.stringify(res)}`)
            // dispatchers
            dispatch({
                type: SET_HEARTBEAT_SEARCHING_MODE,
                payload: res.data
            }) 
            dispatch({
                type: STOP_SET_HEARTBEAT_SEARCHING_MODE,
            }) 
        })
        .catch(err => console.log(err));
}

// post tags selected by user
export const postTagsProfileToMatch = (objTagsData) => (dispatch) => {
    axios.post(`/userdevice/profileToSearch`,objTagsData)
        .then(res => {
            // dispatchers
            dispatch({
                type: POST_TAGS_OF_PROFILE_TO_MATCH_BY_USER_IN_LIVEDATASETS,
                payload: res.data
            }) 
            dispatch({
                type: STOP_POST_TAGS_OF_PROFILE_TO_MATCH_BY_USER_IN_LIVEDATASETS,
            }) 
        })
        .catch(err => console.log(err));
}

// to post an item in liveDataSets in the list of staticDevices - vendors - statics to find
export const selectStaticDevicesToSearch = (data) => (dispatch) => {
    axios.post('/userdevice/selectStaticDevicesToSearch', data)
        .then(res => {
            // dispatchers
            dispatch({
                type: POST_LIST_OF_STATIC_DEVICES_TO_SEARCH_IN_LIVEDATASETS,
                payload: res.data
            }) 
            dispatch({
                type: STOP_POST_LIST_OF_STATIC_DEVICES_TO_SEARCH_IN_LIVEDATASETS
            }) 
        })
        .catch(err => console.log(err))
        return true
}

// to DELETE in liveDataSets one item of the list of staticDevices - vendors - statics to find
export const unSelectStaticDevicesToSearch = (data) => (dispatch) => {
    axios.post('/userdevice/deselectStaticDevicesToSearch', data)
        .then(res => {
            // dispatchers
            dispatch({
                type: DELETE_ITEM_IN_LIST_OF_STATIC_DEVICES_TO_SEARCH_IN_LIVEDATASETS,
                payload: res.data
            }) 
            dispatch({
                type: STOP_DELETE_ITEM_IN_LIST_OF_STATIC_DEVICES_TO_SEARCH_IN_LIVEDATASETS
            }) 
        })
        .catch(err => console.log(err));
}


// ** interaction with thing
// function to post active command to things
export const heartbeatPostActiveCommand = (thingId, activeValue) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post(`/device/heartbeat/${thingId}/active`, activeValue)
        .then((res) => {  
            // dispatch          
            dispatch({ 
                type: POST_ACTIVE_COMMAND_HEARTBEAT_THING,
                payload: res.data
            })
        })
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
        .then((res) => {            
            // dispatch
            dispatch({ 
                type: POST_INACTIVE_COMMAND_HEARTBEAT_THING,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({ 
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
} 








