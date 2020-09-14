// user actions
import {
    LOADING_UI,
    STOP_LOADING_UI,
    LOADING_DATASETS,
    POST_DATASET,
    GET_DATASETS,
    GET_DATASET
} from '../types';

// axios
import axios from 'axios'; 

// get all data set for a property userDevice
export const getAllDataSetsUserDevice = (userdeviceid) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    //dispatch({ type: LOADING_DATASETS });
    axios
        .get(`/user/device/${userdeviceid}/datasets`)
        .then((res) => { 
            dispatch({
                type: GET_DATASETS,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => console.log(err));
}

// post one dataSet in a property
export const postInDataSetsUserDevice = (userdeviceid, dataSet) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    dispatch({ type: LOADING_DATASETS });
    axios
        .post(`/user/device/${userdeviceid}/dataset`, dataSet)
        .then((res) => { 
            dispatch({
                type: POST_DATASET,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => console.log(err));
}
