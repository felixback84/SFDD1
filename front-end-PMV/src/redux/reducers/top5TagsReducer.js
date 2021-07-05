import {
    // top5Tags --> mode one
    GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS,
    STOP_LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS,
        // live 
        GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS_LIVE,
        STOP_LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS_LIVE,

    // top5Tag --> mode two
    GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG,
    STOP_LOADING_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG,
        // live
        GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG_LIVE,
        STOP_LOADING_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG_LIVE,
    
    // ux
    GET_TOP5TAG_UX,
    STOP_LOADING_GET_TOP5TAG_UX,
} from '../types'; 

// initial state
const initialState = {
    // events
    loading: undefined,
    
    // mode one
    top5Tags:[],
    top5TagsListener:[],

    // mode two
    top5Tag:{},
    top5TagListener:[],
    
    // ux
    top5TagUx:{}
}

// function to determine the type of action to set state
export default function(state = initialState, action){
    switch(action.type){
    // top5Tags ---> mode one
    // static data 
    case GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS:
        return {
            ...state,
            top5Tags: action.payload,
            //loading: false 
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
            top5TagsListener: action.payload,
            //loading: false 
        };
    case STOP_LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS_LIVE:
        return{
            ...state,
            loading: false
        };

    // top5Tag  ---> mode two
    // static
    case GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG:
        return {
            ...state,
            top5Tag: action.payload,
            loading: false
        };
    
    case STOP_LOADING_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG:
        return {
            ...state,
            loading: false
        };
    
    // live
    case GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG_LIVE:
        return {
            ...state,
            top5TagListener: action.payload,
            loading: false
        };
    
    case STOP_LOADING_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG_LIVE:
        return {
            ...state,
            loading: false
        };

    // ux
    case GET_TOP5TAG_UX:
        return {
            ...state,
            top5TagUx: action.payload,
            loading: false
    
        };
    case STOP_LOADING_GET_TOP5TAG_UX:
        return {
            ...state,
            loading: false
        };

        default:
            return state; 
    }    
}    

