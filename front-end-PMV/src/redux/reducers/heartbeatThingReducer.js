// user actions
import {
    // active command
    POST_ACTIVE_COMMAND_HEARTBEAT_THING,
    // inactive command
    POST_INACTIVE_COMMAND_HEARTBEAT_THING, 
    // static data
    LOADING_GET_EVENTS_FROM_HEARTBEAT_THING_ONCE,
    GET_EVENTS_FROM_HEARTBEAT_THING_ONCE,
    STOP_LOADING_GET_EVENTS_FROM_HEARTBEAT_THING_ONCE,
    // real time
    LOADING_GET_EVENTS_FROM_HEARTBEAT_THING_IN_REAL_TIME,
    GET_EVENTS_FROM_HEARTBEAT_THING_IN_REAL_TIME,
    STOP_LOADING_GET_EVENTS_FROM_HEARTBEAT_THING_IN_REAL_TIME,
    // searching mode
    SET_HEARTBEAT_SEARCHING_MODE, 
    // post tags by user
    POST_TAGS_OF_PROFILE_TO_MATCH_BY_USER_IN_LIVEDATASETS,
} from '../types';

// initial state
const initialState = {
    loading: undefined,
    thingLiveDataSetsListener:{
        colorValue:{},
        coords:{},
    },
    thingLiveDataSets:{
        searchingMode:[],
        colorValue:{},
        coords:{},
        idOfSpecificStaticDevices:[],
        profileToMatch:[],
        searchingMode:[]
    }
}; 

// function to determine the type of action to set state
export default function(state = initialState, action){
    switch(action.type){

        // static data
        // case LOADING_GET_EVENTS_FROM_HEARTBEAT_THING_ONCE:
        //     return{
        //         ...state, 
        //         loading: true
        //     };
        case GET_EVENTS_FROM_HEARTBEAT_THING_ONCE:
            return{
                ...state, 
                thingLiveDataSets: action.payload,
                loading: false
            };
        case STOP_LOADING_GET_EVENTS_FROM_HEARTBEAT_THING_ONCE:
            return{
                ...state, 
                loading: false
            };

        // in real time
        case LOADING_GET_EVENTS_FROM_HEARTBEAT_THING_IN_REAL_TIME:
            return{
                ...state, 
                loading: true
            };
        case GET_EVENTS_FROM_HEARTBEAT_THING_IN_REAL_TIME:
            return{
                ...state,
                thingLiveDataSetsListener: action.payload,
                loading: false,
            };
        case STOP_LOADING_GET_EVENTS_FROM_HEARTBEAT_THING_IN_REAL_TIME:
            return{
                ...state,
                loading: false 
            };    

        /////////////////////////////////////////////////// liveDataSets response 

        // active commmand
        case POST_ACTIVE_COMMAND_HEARTBEAT_THING:
            return{
                thing:{
                    response: action.payload
                }
            };    
            
        // innactive command
        case POST_INACTIVE_COMMAND_HEARTBEAT_THING:
            return{
                thing:{
                    response: action.payload
                }
            };
        
        // seraching mode
        // case SET_HEARTBEAT_SEARCHING_MODE:
        //     return {
        //         ...state,
        //         thingLiveDataSets:{
        //             searchingMode:[action.payload]
        //         }, 
        //         loading: false
        //     };     
        
        // post tags by user 
        case POST_TAGS_OF_PROFILE_TO_MATCH_BY_USER_IN_LIVEDATASETS:
            return {
                ...state,
                response:action.payload,
                loading: false
            };     
        default:
            return state;
    }
} 