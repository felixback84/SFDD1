// adventures actions
import {
    LOADING_UI,
    STOP_LOADING_UI,
    LOADING_ADVENTURES,
    GET_ADVENTURES,
    GET_ADVENTURE,
    GET_LIKE_ADVENTURES,
    GET_UNLIKE_ADVENTURES,
    POST_ADVENTURE_COMMENT
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