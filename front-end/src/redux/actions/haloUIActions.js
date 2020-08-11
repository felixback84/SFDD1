// user actions
import {
    LOADING_UI,
    STOP_LOADING_UI,
    GET_ON_OFF_FROM_HALO_THING
} from '../types';

// axios
import axios from 'axios';

export const getOnOffFromHaloDevice = (userdeviceid) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    //dispatch({ type: LOADING_ON_OFF_FROM_HALO_DEVICE });
    axios
        .get(`/userDevices/iotCore/${userdeviceid}/on-off`)
        .then((res) => { 
            dispatch({
                type: GET_ON_OFF_FROM_HALO_THING, 
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => console.log(err));
}

