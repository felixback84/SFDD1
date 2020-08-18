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
export const haloThingSyncDataWithDB = (thingId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    //.collection('liveDataSets').doc(thingId);
    // snapshot
    const doc = firebase
        .firestore().doc(`/userDevices/8n4ohAo247H1W5SsxY9s`)
        .collection('liveDataSets').doc(thingId)
    const observer = doc.onSnapshot(docSnapshot => {
        const resultDB = docSnapshot.data();
        console.log(`Received doc snapshot: ${resultDB}}`);
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

