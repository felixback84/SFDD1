// user actions
import {
    LOADING_UI,
    STOP_LOADING_UI,
    LOADING_USER_ADVENTURES,
    GET_USER_ADVENTURES,
    GET_USER_ADVENTURE,
    GET_ACTIVE_USER_ADVENTURES,
    GET_INACTIVE_USER_ADVENTURES
} from '../types';

// axios
import axios from 'axios';

// redux action to get one specific userDevice
export const getUserAdventures = () => (dispatch) => {
    dispatch({ type: LOADING_UI });
    dispatch({ type: LOADING_USER_ADVENTURES });
    axios
        .get(`/useradventures`)
        .then((res) => { 
            dispatch({
                type: GET_USER_ADVENTURES,
                payload: res.data
            });
            //dispatch({ type: STOP_LOADING_USER_DEVICES});
            dispatch({ type: STOP_LOADING_UI });
        })  
        .catch((err) => console.log(err));
}

// redux action to get one specific userDevice
export const getUserAdventure = (useradventureid) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    //dispatch({ type: LOADING_USER_DEVICES });
    axios
        .get(`/useradventures/${useradventureid}`)
        .then((res) => { 
            dispatch({
                type: GET_USER_ADVENTURE,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => console.log(err));
}

// active userAdventure
export const activeUserAdventure = (useradventureid) => (dispatch) => {
    axios.get(`/useradventures/${useradventureid}/active`)
        .then(res => {
            dispatch({
                type: GET_ACTIVE_USER_ADVENTURES,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

// inactive userAdventure
export const inactiveUserAdventure = (useradventureid) => (dispatch) => {
    axios.get(`/useradventures/${useradventureid}/inactive`)
        .then(res => {
            dispatch({
                type: GET_INACTIVE_USER_ADVENTURES,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}