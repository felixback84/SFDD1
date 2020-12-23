import {
    LOADING_USER_DEVICES, 
    GET_USER_DEVICES,
    GET_USER_DEVICE
} from '../types';

// let userDevice;
// initial state
const initialState = {
    userDevices:[],
    userDevice:{
        device:{
            imgUrl:[],
            dataSets:{}
        }
    },
    loading: false
}

// function to determine the type of action to set state
export default function(state = initialState, action){
    switch(action.type){
        case LOADING_USER_DEVICES:
            return{
                ...state,
                loading: true
            };
        case GET_USER_DEVICES:
            return {
                ...state,
                userDevices: action.payload,
                loading: false
                
            };
        case GET_USER_DEVICE:
            return {
                ...state,
                userDevice: action.payload,
                loading: false
            };
        default:
            return state; 
    }    
}    