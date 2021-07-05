import {
    // userDevices
    LOADING_USER_DEVICES, 
    GET_USER_DEVICES,
    STOP_LOADING_USER_DEVICES,
    // userDevice 
    GET_USER_DEVICE,
} from '../types';



// initial state
const initialState = {
    // events
    loading: undefined,
    // data 
    userDevices:[{}],
    userDevice:{
        device:{
            imgUrl:[],
            dataSets:{}
        }
    },  
} 

// function to determine the type of action to set state
export default function(state = initialState, action){
    switch(action.type){

        // userDevices
        case LOADING_USER_DEVICES:
            return{
                ...state,
                loading: true
            }; 
        case GET_USER_DEVICES:
            return {
                ...state, 
                userDevices: action.payload,
                loading:false
            };
        case STOP_LOADING_USER_DEVICES:
            return{
                ...state,
                loading:false
            };

        // userDevice
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