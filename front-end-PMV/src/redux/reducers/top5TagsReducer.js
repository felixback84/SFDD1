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

    // geoHashes & meters
    GET_DATA_FROM_USER_STATICS_PRODUCTS_CLOSER_TO_USER_DEVICE_BY_METERS,  
    STOP_LOADING_GET_DATA_FROM_USER_STATICS_PRODUCTS_CLOSER_TO_USER_DEVICE_BY_METERS, 

    // post top5tags -- creation
    POST_TOP_5_TAGS_IN_USER_DEVICES_COLLECTION,
    STOP_LOADING_POST_TOP_5_TAGS_IN_USER_DEVICES_COLLECTION,

    // ux
    GET_TOP5TAG_UX,
    STOP_LOADING_GET_TOP5TAG_UX,
} from '../types'; 

// initial state
const initialState = {
    // events
    loading: undefined,

    // res
    responses: undefined, 
    
    // mode one
    top5Tags:[],
        top5TagsListener:[],

    // mode two
    top5Tag:{},
        top5TagListener:[],
    
    // search by geohashes and meters 
    // top5Tags:[],
    //     top5TagsListener:[],
    
    // ux
    top5TagUx:{
        coords:{},
        userCredentials:{},
        matchDataResults:{}
    }
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


    // search geoHashes & meters
    case GET_DATA_FROM_USER_STATICS_PRODUCTS_CLOSER_TO_USER_DEVICE_BY_METERS:
        return{
            top5Tags: action.payload,
            loadings: false
        }

    case STOP_LOADING_GET_DATA_FROM_USER_STATICS_PRODUCTS_CLOSER_TO_USER_DEVICE_BY_METERS:     
        return{
            ...state,
            loading: false        
        }

    // post top5tags -- creation
    case POST_TOP_5_TAGS_IN_USER_DEVICES_COLLECTION:
        return{
            responses: action.payload,
            loadings: false
    }
    case STOP_LOADING_POST_TOP_5_TAGS_IN_USER_DEVICES_COLLECTION:     
        return{
            ...state,
            loading: false        
        }


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

