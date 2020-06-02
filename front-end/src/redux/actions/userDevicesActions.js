// userDevices actions
import {
    LOADING_UI,
    STOP_LOADING_UI,
    LOADING_USER_DEVICES,
    GET_USER_DEVICES,
    GET_USER_DEVICE,
    GET_ACTIVE_USER_DEVICES,
    GET_INACTIVE_USER_DEVICES
} from '../types';
 
// axios
import axios from 'axios';

// redux action to get one specific userDevice
export const getUserDevices = () => (dispatch) => {
    dispatch({ type: LOADING_UI });
    dispatch({ type: LOADING_USER_DEVICES });
    axios
        .get(`/userdevices`)
        .then((res) => { 
            dispatch({
                type: GET_USER_DEVICES,
                payload: res.data
            });
            //dispatch({ type: STOP_LOADING_USER_DEVICES});
            dispatch({ type: STOP_LOADING_UI });
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

// active userDevice
export const activeUserDevice = (userdeviceid) => (dispatch) => {
    axios.get(`/userdevices/${userdeviceid}/active`)
        .then(res => {
            dispatch({
                type: GET_ACTIVE_USER_DEVICES,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

// inactive userDevice
export const inactiveUserDevice = (userdeviceid) => (dispatch) => {
    axios.get(`/userdevices/${userdeviceid}/inactive`)
        .then(res => {
            dispatch({
                type: GET_INACTIVE_USER_DEVICES,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}