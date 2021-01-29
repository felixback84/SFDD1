// user actions
import {
    LOADING_UI,
    STOP_LOADING_UI,
    GET_EVENTS_FROM_HEARTBEAT_THING,
    //POST_ACTIVE_COMMAND_HEARTBEAT_THING,
    //POST_INACTIVE_COMMAND_HEARTBEAT_THING,
    LOADING_GET_EVENTS_FROM_HEARTBEAT_THING,
    GET_TOP5COORDSMATCHES,
    SET_ERRORS
} from '../types';

// firebase client libs
import firebase from '../../fb/utilities/firebase'; 
// axios 
import axios from 'axios';

// declarate a function to get data from db
export const heartbeatThingSyncDataWithLiveDB = (thingId) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    // vars to ask to db do
    const thingIdVal = thingId
    const userDeviceId = thingIdVal.split("-").slice(2);

    // snapshot
    const doc = firebase
        .firestore().doc(`/userDevices/${userDeviceId}`) 
        .collection('liveDataSets').doc(thingId)
    const observer = doc.onSnapshot(docSnapshot => {
        const resultDB = docSnapshot.data();    
        // dispatch
        dispatch({ 
            type: GET_EVENTS_FROM_HEARTBEAT_THING,
            payload: resultDB
        });
        dispatch({ type: STOP_LOADING_UI });
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

// function to find the top5Coords list
// export const getTop5CoordsMatches = (thingId) => (dispatch) => {
//     dispatch({ type: LOADING_UI });
//     axios
//         .get(`/device/heartbeat/${thingId}/top5coords`)
//         .then((res) => {            
//             dispatch({ 
//                 type: GET_TOP5COORDSMATCHES,
//                 payload: res.data
//             })
//         })
//         .catch(err => {
//             dispatch({ 
//                 type: SET_ERRORS,
//                 payload: err.response.data
//             })
//         });
// }

// function post a get the answer to make the matches

