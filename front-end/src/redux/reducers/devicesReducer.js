 // user actions
 import {
    LOADING_DEVICES,
    GET_DEVICES,
    GET_DEVICE,
    GET_LIKE_DEVICES,
    GET_UNLIKE_DEVICES,
    POST_DEVICE_COMMENT,
} from '../types';

// initial state
const initialState = {
    devices: [],
    device: {imgUrl:[], comments:[]},
    loading: false
};

// function to determine the type of action to set state
export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DEVICES:
            return{
                ...state,
                loading: true
            };
        case GET_DEVICES:
            return{
                ...state,
                devices: action.payload,
                loading: false  
            };
        case GET_DEVICE: 
            return{
                ...state,
                device: action.payload
            }       
        case GET_LIKE_DEVICES:
        case GET_UNLIKE_DEVICES:
            let commentsStill = state.device.comments;
            let index = state.devices.findIndex(
                (device) => device.deviceId === action.payload.deviceId
            );
            state.devices[index] = action.payload;
            if (state.device.deviceId === action.payload.deviceId) {
                state.device = action.payload;
                state.device.comments = commentsStill;
                
            }
            return {
                ...state,
            }; 
        case POST_DEVICE_COMMENT:
            return {
                ...state,
                device: {
                    ...state.device,
                    comments: [
                        action.payload, 
                        ...state.device.comments
                    ]
                }
            };  
        default:
            return state;
    }
} 