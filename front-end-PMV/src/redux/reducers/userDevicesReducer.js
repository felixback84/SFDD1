import {
    LOADING_USER_DEVICES, 
    GET_USER_DEVICES,
    GET_USER_DEVICE,
    GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS,
    GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG,
    GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS,
    GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT
} from '../types';

// initial state
const initialState = {
    userDevices:[],
    userDevice:{
        device:{
            imgUrl:[],
            dataSets:{}
        }
    }, 
    top5Tags:[],
    top5Tag:{},
    top5Products:[],
    top5Product:{},
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
        case GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS:
            return {
                ...state,
                top5Tags: action.payload,
                loading: false
            };
        case GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG:
            return {
                ...state,
                top5Tag: action.payload,
                loading: false
            };
        case GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS:
            return {
                ...state,
                top5Products: action.payload,
                loading: false
            };        
        case GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT:
            return {
                ...state,
                onMode:true,
                top5Product: action.payload,
                loading: false
            };        
        default:
            return state; 
    }    
}    