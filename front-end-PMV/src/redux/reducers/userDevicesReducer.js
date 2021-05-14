import {
    // events
    LOADING_USER_DEVICES, 
    STOP_LOADING_USER_DEVICES,
    LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS,
    STOP_LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS,
    // data
    GET_USER_DEVICES,
    GET_USER_DEVICE,
    GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS,
    GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG,
    GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS,
    GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT
} from '../types';

// initial state
const initialState = {
    // events
    loading: false,
    // data
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
}

// function to determine the type of action to set state
export default function(state = initialState, action){
    switch(action.type){
        // events
        case LOADING_USER_DEVICES:
            return{
                ...state,
                loading: true
            };
        case STOP_LOADING_USER_DEVICES:
            return{
                ...state,
                loading: false
            };
        case LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS:
            return{
                ...state,
                loading: true
            };
        case STOP_LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS:
            return{
                ...state,
                loading: false
            };
        // data
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