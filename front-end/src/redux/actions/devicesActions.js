// devices actions
import {
    LOADING_UI,
    STOP_LOADING_UI,
    LOADING_DEVICES, 
    GET_DEVICES, 
    GET_DEVICE, 
    GET_LIKE_DEVICES, 
    GET_UNLIKE_DEVICES, 
    POST_DEVICE_COMMENT,
    SET_ERRORS,
    CLEAR_ERRORS 
} from '../types';

// axios
import axios from 'axios';

// redux action to get all devices in the store
export const getDevices = () => (dispatch) => {
    dispatch({ type: LOADING_UI });
    dispatch({ type: LOADING_DEVICES });
    axios
        .get(`/devices`)
        .then((res) => { 
            dispatch({
                type: GET_DEVICES,
                payload: res.data
            });
            //dispatch({ type: STOP_LOADING_USER_DEVICES});
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => console.log(err));
}

// redux action to get one specific device
export const getDevice = (deviceid) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    //dispatch({ type: LOADING_USER_DEVICES });
    axios
        .get(`/devices/${deviceid}`)
        .then((res) => { 
            dispatch({
                type: GET_DEVICE,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => console.log(err));
}

// like device
export const likeDevice = (deviceid) => (dispatch) => {
    axios.get(`/device/${deviceid}/like`)
        .then(res => {
            dispatch({
                type: GET_LIKE_DEVICES,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

// unlike device
export const unlikeDevice = (deviceid) => (dispatch) => {
    axios.get(`/device/${deviceid}/unlike`)
        .then(res => {
            dispatch({
                type: GET_UNLIKE_DEVICES,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

// submit comment
export const postCommentDevice = (deviceid, commentData) => (dispatch) => {
    axios.post(`/device/${deviceid}/comment`, commentData)
        .then(res => {
            dispatch({
                type: POST_DEVICE_COMMENT,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
}

// clear errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}