// adventures actions
import {
    LOADING_UI,
    STOP_LOADING_UI,
    LOADING_ADVENTURES,
    GET_ADVENTURES,
    GET_ADVENTURE,
    GET_LIKE_ADVENTURES,
    GET_UNLIKE_ADVENTURES,
    POST_ADVENTURE_COMMENT,
    SET_ERRORS,
    CLEAR_ERRORS
} from '../types';

// axios
import axios from 'axios';

// redux action to get all devices in the store
export const getAdventures = () => (dispatch) => {
    dispatch({ type: LOADING_UI });
    dispatch({ type: LOADING_ADVENTURES });
    axios 
        .get(`/adventures`)
        .then((res) => { 
            dispatch({
                type: GET_ADVENTURES,
                payload: res.data
            });
            //dispatch({ type: STOP_LOADING_USER_DEVICES});
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => console.log(err));
}

// redux action to get one specific adventure
export const getAdventure = (adventureid) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    //dispatch({ type: LOADING_USER_DEVICES });
    axios
        .get(`/adventures/${adventureid}`)
        .then((res) => { 
            dispatch({
                type: GET_ADVENTURE,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => console.log(err));
}

// like adventure
export const likeAdventure = (adventureid) => (dispatch) => {
    axios.get(`/adventure/${adventureid}/like`)
        .then(res => {
            dispatch({
                type: GET_LIKE_ADVENTURES,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

// unlike adventure
export const unlikeAdventure = (adventureid) => (dispatch) => {
    axios.get(`/adventure/${adventureid}/unlike`)
        .then(res => {
            dispatch({
                type: GET_UNLIKE_ADVENTURES,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
} 

// submit comment
export const postCommentAdventure = (adventureid, commentData) => (dispatch) => {
    axios.post(`/adventure/${adventureid}/comment`, commentData)
        .then(res => {
            dispatch({
                type: POST_ADVENTURE_COMMENT,
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