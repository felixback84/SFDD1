// user actions
import { 

    // ** db interaction
    // static data
    GET_EVENTS_FROM_HEARTBEAT_THING,
    STOP_GET_EVENTS_FROM_HEARTBEAT_THING,
        // real time
        GET_EVENTS_FROM_HEARTBEAT_THING_LIVE,
        STOP_GET_EVENTS_FROM_HEARTBEAT_THING_LIVE,
    // searching mode
    SET_HEARTBEAT_SEARCHING_MODE, 
    STOP_SET_HEARTBEAT_SEARCHING_MODE, 
    // post tags by user
    POST_TAGS_OF_PROFILE_TO_MATCH_BY_USER_IN_LIVEDATASETS,
    STOP_POST_TAGS_OF_PROFILE_TO_MATCH_BY_USER_IN_LIVEDATASETS,
    // post item in list of specifics static devices to search by user devices
    POST_LIST_OF_STATIC_DEVICES_TO_SEARCH_IN_LIVEDATASETS,
    STOP_POST_LIST_OF_STATIC_DEVICES_TO_SEARCH_IN_LIVEDATASETS,
    // update (erase - unselect) item in list of specifics static devices to search by user devices
    DELETE_ITEM_IN_LIST_OF_STATIC_DEVICES_TO_SEARCH_IN_LIVEDATASETS,
    STOP_DELETE_ITEM_IN_LIST_OF_STATIC_DEVICES_TO_SEARCH_IN_LIVEDATASETS,
    // post item in list of specifics products of static devices to search by user devices
    POST_LIST_OF_PRODUCTS_OF_STATIC_DEVICES_TO_SEARCH_IN_LIVEDATASETS,
    STOP_POST_LIST_OF_PRODUCTS_OF_STATIC_DEVICES_TO_SEARCH_IN_LIVEDATASETS,
    
    // ** thing interaction
    // active command
    POST_ACTIVE_COMMAND_HEARTBEAT_THING,
    // inactive command
    POST_INACTIVE_COMMAND_HEARTBEAT_THING,
} from '../types';
 
// initial state
const initialState = {
    // state of data
    loading:undefined,
    // server response
    responses: undefined, // to erase soon
    responsesToUILDS: undefined, 
    responsesWithDataLDS: undefined,

    // static data
    thingLiveDataSets:{
        colorValue:{},
        coords:{},
        idOfSpecificStaticDevices:[{}],
        idOfSpecificProducts:[{}],
        searchingMode:[],
        profileToMatch:{},
    },
        // live data
        thingLiveDataSetsListener:{
            colorValue:{},
            coords:{},
            idOfSpecificStaticDevices:[{}],
            idOfSpecificProducts:[{}],
            searchingMode:[],
            profileToMatch:{},
        },
}; 

// function to determine the type of action to set state
export default function(state = initialState, action){
    switch(action.type){
        // ** db intearction
        // static data
        case GET_EVENTS_FROM_HEARTBEAT_THING:
            return{
                ...state, 
                thingLiveDataSets: action.payload,
                // loading: false
            };
        case STOP_GET_EVENTS_FROM_HEARTBEAT_THING:
            return{
                ...state, 
                loading: false
            };

            // live
            case GET_EVENTS_FROM_HEARTBEAT_THING_LIVE:
                return{
                    ...state,
                    thingLiveDataSetsListener: action.payload,
                    // loading: false,
                };
            case STOP_GET_EVENTS_FROM_HEARTBEAT_THING_LIVE:
                return{
                    ...state,
                    loading: false 
                };    

        // searching mode ---> without response from server yet
        case SET_HEARTBEAT_SEARCHING_MODE:
            return {
                ...state,
                responsesToUILDS:action.payload, 
                // loading: false
            };     
        case STOP_SET_HEARTBEAT_SEARCHING_MODE:
            return {
                ...state,
                loading: false
            };     
        
        // post tags by user 
        case POST_TAGS_OF_PROFILE_TO_MATCH_BY_USER_IN_LIVEDATASETS:
            return {
                ...state,
                responsesToUILDS:action.payload,
            };     
        case STOP_POST_TAGS_OF_PROFILE_TO_MATCH_BY_USER_IN_LIVEDATASETS:
            return {
                ...state,
                loading: false
            };   

        // post item in list of specifics static devices to search by user devices
        case POST_LIST_OF_STATIC_DEVICES_TO_SEARCH_IN_LIVEDATASETS:
            return {
                ...state,
                responses:action.payload,
                loading: false
            }; 
        case STOP_POST_LIST_OF_STATIC_DEVICES_TO_SEARCH_IN_LIVEDATASETS:
            return {
                ...state,
                loading: false
            }; 

        // update (erase - unselect) item in list of specifics static devices to search by user devices
        case DELETE_ITEM_IN_LIST_OF_STATIC_DEVICES_TO_SEARCH_IN_LIVEDATASETS:
            return {
                ...state,
                responses:action.payload,
                loading: false
            };
        case STOP_DELETE_ITEM_IN_LIST_OF_STATIC_DEVICES_TO_SEARCH_IN_LIVEDATASETS:
            return {
                ...state,
                loading: false
            };

        // post item in list of specifics static devices to search by user devices
        case POST_LIST_OF_PRODUCTS_OF_STATIC_DEVICES_TO_SEARCH_IN_LIVEDATASETS:
            return {
                ...state,
                responses:action.payload,
                loading: false
            }; 
        case STOP_POST_LIST_OF_PRODUCTS_OF_STATIC_DEVICES_TO_SEARCH_IN_LIVEDATASETS:
            return {
                ...state,
                loading: false
            }; 

        

        // ** thing interaction 
        // active commmand
        case POST_ACTIVE_COMMAND_HEARTBEAT_THING:
            return{
                thing:{
                    responses: action.payload
                }
            };    
            
        // innactive command
        case POST_INACTIVE_COMMAND_HEARTBEAT_THING:
            return{
                thing:{
                    responses: action.payload
                }
            };
        default:
            return state;
    }
} 