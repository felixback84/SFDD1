// userDevices actions
import {
    // ui
    LOADING_UI,
    STOP_LOADING_UI,
    // userDevices
    GET_USER_DEVICES,
    LOADING_USER_DEVICES,
    STOP_LOADING_USER_DEVICES,
    // userDevice
    GET_USER_DEVICE,
} from '../types';


// axios 
import axios from 'axios';

// redux action to get one specific userDevice
export const getUserDevices = () => (dispatch) => {
    // events
    dispatch({ type: LOADING_UI });
    dispatch({ type: LOADING_USER_DEVICES });

    axios 
        .get(`/userdevices`)
        .then((res) => { 
            dispatch({
                type: GET_USER_DEVICES,
                payload: res.data
            });
            
            // events
            dispatch({ type: STOP_LOADING_UI });
            dispatch({ type: STOP_LOADING_USER_DEVICES });
        })
        .catch((err) => console.log(err));
}

// redux action to get one specific userDevice
export const getUserDevice = (userdeviceid) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    //dispatch({ type: LOADING_USER_DEVICES });
    axios
        .get(`/userdevices/${userdeviceid}`)
        .then((res) => { 
            dispatch({
                type: GET_USER_DEVICE,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => console.log(err));
}





