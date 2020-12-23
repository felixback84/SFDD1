// user actions
import {
    LOADING_UI,
    STOP_LOADING_UI,
    GET_EVENTS_FROM_HALO_THING,
    LOADING_GET_EVENTS_FROM_HALO_THING
} from '../types';

// firebase client libs
import firebase from '../../fb/utilities/firebase'; 

// declarate a function to get data from db
export const haloThingSyncDataWithLiveDB = (thingId) => (dispatch) => {
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
            type: GET_EVENTS_FROM_HALO_THING,
            payload: resultDB
        });
        dispatch({ type: STOP_LOADING_UI });
    }, err => {
        console.log(`Encountered error: ${err}`);
    });
}

