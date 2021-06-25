import {
    // userDevices
    LOADING_USER_DEVICES, 
    GET_USER_DEVICES,
    STOP_LOADING_USER_DEVICES,
    // userDevice 
    GET_USER_DEVICE,
    // top5Tags
    GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS,
    STOP_LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS,
        // live 
        GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS_LIVE,
        STOP_LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS_LIVE,
    // top5Tag
    GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG,
    // top5Products
    GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS,
    // top5Product
    GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT,
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

    top5Tags:[],
    top5Tag:{},

    top5Products:[],
    top5Product:{},
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

        // static data 
        case GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS:
            return {
                ...state,
                top5Tags: action.payload,
                loading: false 
            };
        case STOP_LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS:
            return{
                ...state,
                loading: false
            };    

        // live    
        case GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS_LIVE:
            return {
                ...state,
                //top5Tags: ()=>(state.top5Tags[0].meters = action.payload),
                top5Tags: action.payload,
                loading: false 
            };
        case STOP_LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS_LIVE:
            return{
                ...state,
                loading: false
            };

        
        // top5Tag 
        case GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG:
            return {
                ...state,
                top5Tag: action.payload,
                loading: false
            };

        // top5Products
        case GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS:
            return {
                ...state,
                top5Products: action.payload,
                loading: false
            };      

        // top5Product
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