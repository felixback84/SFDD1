// user actions
import {
    LOADING_UI,
    STOP_LOADING_UI,
    GET_EVENTS_FROM_HILDA_THING,
    LOADING_GET_EVENTS_FROM_HILDA_THING
} from '../types';

// firebase client libs
import firebase from '../../fb/utilities/firebase'; 

// declarate a function to get data from db
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

