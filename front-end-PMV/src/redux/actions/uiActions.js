// user actions
import {
    LOADING_UI,
    STOP_LOADING_UI,
    LOADING_GET_TAGS_FROM_DEVICE_CONFIG,
    GET_DATA_TAGS_FROM_ALL_STATICS_FOR_SEARCH_BOX_MODEONE,
    STOP_GET_TAGS_FROM_DEVICE_CONFIG,
    SET_ERRORS
} from '../types'; 

// firebase client libs
import firebase from '../../fb/utilities/firebase'; 
// axios 
// import axios from 'axios';

// get tags from device creation
export const getTagsFromDeviceConfig = (device) => (dispatch) => {
    // event
    dispatch({ type: LOADING_GET_TAGS_FROM_DEVICE_CONFIG});
    // arr to hold tags
    const arr = []
    // db
    const doc = firebase
        .firestore()
        .collection("statics")
        .where('nameOfDevice','==',device)
        .get()
        .then((data)=>{
            
            data.forEach((doc)=>{
                arr.push({
                    profileToSearch:doc.data().dataSets.profileToSearch
                })
            })
            // print
            console.log(`tags complete: ${JSON.stringify(arr[0].profileToSearch)}`)
            // dispatch data
            dispatch({ 
                type: GET_DATA_TAGS_FROM_ALL_STATICS_FOR_SEARCH_BOX_MODEONE,
                payload: arr[0].profileToSearch
            }); 
        })
        .catch((err)=>{
            console.log(err)
        })
        // event
        dispatch({ type: STOP_GET_TAGS_FROM_DEVICE_CONFIG});
        
}