// user actions
import {
    
} from '../types'; 

// get the products of a specific vendor-static-staticDevice
export const findProductsOfStaticDevices = (staticDeviceId) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios
        .post(`/device/heartbeat/${thingId}/active`, activeValue)
        // .then((res) => {            
        //     dispatch({ 
        //         type: POST_ACTIVE_COMMAND_HEARTBEAT_THING,
        //         payload: res.data
        //     })
        // })
        .catch(err => {
            dispatch({ 
                type: SET_ERRORS,
                payload: err.response.data
            })
        });

}