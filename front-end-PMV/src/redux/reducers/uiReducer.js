//types of actions
import { 
    LOADING_GET_TAGS_FROM_DEVICE_CONFIG,
    GET_DATA_TAGS_FROM_ALL_STATICS_FOR_SEARCH_BOX_MODEONE,
    STOP_GET_TAGS_FROM_DEVICE_CONFIG,
    
    SET_ERRORS,   
    CLEAR_ERRORS, 
    LOADING_UI, 
    STOP_LOADING_UI
} from '../types';
 
// initial state
const initialState = {
    loading: false,
    // to search box mode one
    staticDevicesTags: {
        dcHeros:[],
        fruits:[],
        pets:[],
        luckyNumbers:[]
    },
    errors: null
};

// function to determine the type of action to set state
export default function(state = initialState, action){
switch(action.type){

    case SET_ERRORS: 
        return{
            ...state,
            loading: false,
            errors: action.payload
        };
    case CLEAR_ERRORS:
        return{
            ...state,
            loading: false,
            errors: null
        };
    case LOADING_UI:
        return {
            ...state,
            loading: true 
        };
    case STOP_LOADING_UI:
        return{
            ...state,
            loading:false
        }   

    case LOADING_GET_TAGS_FROM_DEVICE_CONFIG:
        return {
            ...state,
            loading: true 
        };   
    case GET_DATA_TAGS_FROM_ALL_STATICS_FOR_SEARCH_BOX_MODEONE:
        return{
            ...state,
            staticDevicesTags:action.payload,
            loading:false
        }
    case STOP_GET_TAGS_FROM_DEVICE_CONFIG:
        return {
            ...state,
            loading: false 
        };   

    default:
        return state;           
}
}