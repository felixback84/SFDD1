// user actions
import {
    LOADING_UI,
    STOP_LOADING_UI,
    GET_EVENTS_FROM_HILDA_THING,
    LOADING_GET_EVENTS_FROM_HILDA_THING
} from '../types';

 // dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

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
        //console.log(`Received doc snapshot: ${resultDB}}`);
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

// declarate a function to get data from db liveDataSets
export const chartCounterOffActiveTimes = async (userDeviceId) => {
    //dispatch({ type: LOADING_UI });
    // query filter
    const doc = await firebase
        .firestore()
        .doc(`/userDevices/${userDeviceId}`)
        .collection('dataSets')
        .orderBy('createdAt', 'desc')
        .where('active', '==', 'true')
        .get()
    // var to hold equal values
    let equalValues = [];
    // counter
    let counter = 0;
    // for each of the result of the query
    doc.forEach(doc => {
        let dayJs = dayjs(doc.data().createdAt).fromNow();
        // print
        console.log(`Result of dayjs: ${dayJs}`);
        // push data to array
        equalValues.push(
            dayJs
        )
        counter ++;
    });  
    // print
    console.log(`Result of equalValues: ${equalValues}`);

    //function to find repeat values
    let findDuplicates = (arr) => arr.filter((item, index) => arr.indexOf(item) != index);
    // run it
    let newUniques = findDuplicates(equalValues);

    // loop
    // let counter;
    // for(let item  of newUniques){
    //     counter = 0;
    //     counter ++;
    // }
    // print
    console.log(`result of function with firebase: ${counter} - ${newUniques}`);

    // dispatch
    // dispatch({  
    //     type: GET_EVENTS_FROM_HILDA_THING,
    //     payload: resultDB
    // });
}

