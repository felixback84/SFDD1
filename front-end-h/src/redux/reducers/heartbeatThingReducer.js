// user actions
import {
    LOADING_GET_EVENTS_FROM_HEARTBEAT_THING,
    GET_EVENTS_FROM_HEARTBEAT_THING,
    GET_TOP5_PRODUCTS_AND_MTS_BETWEEN_DEVICES_TO_PRODUCTS
    //POST_ACTIVE_COMMAND_HEARTBEAT_THING,
    //POST_INACTIVE_COMMAND_HEARTBEAT_THING 
} from '../types';

// initial state
const initialState = {
    loading: false,
    thingLiveDataSets:{
        coords:{}, 
        colorValue:{}, 
        profileToMatch:{}, 
        top5Coords:[], 
        top5Products:{},
        mtsBetweenDevices:[], 
        mtsBetweenDevicesToProducts:[],
        searchingMode:[],
    },
    top5ProductsAndMtsBetweenDevicesToProducts:[],
};

// function to determine the type of action to set state
export default function(state = initialState, action){
    switch(action.type){
        case LOADING_GET_EVENTS_FROM_HEARTBEAT_THING:
            return{
                ...state,
                loading: true
            };
        /////////////////////////////////////////////////// liveDataSets response 
        case GET_EVENTS_FROM_HEARTBEAT_THING:
            return{
                ...state,
                thingLiveDataSets: action.payload,
                loading: false,
                //load: true
            };
        case GET_TOP5_PRODUCTS_AND_MTS_BETWEEN_DEVICES_TO_PRODUCTS:
            return{
                ...state,
                top5ProductsAndMtsBetweenDevicesToProducts: action.payload
            }    
        // case POST_ACTIVE_COMMAND_HEARTBEAT_THING:
        //     return{
        //         thing:{
        //             active: action.payload
        //         }
        //     };    
        // case POST_INACTIVE_COMMAND_HEARTBEAT_THING:
        //     return{
        //         thing:{
        //             active: action.payload
        //         }
        //     };
        // case GET_TOP5COORDSMATCHES:
        //     return{
        //         thing:{
        //             top5Coord: action.payload
        //         }
        //     };
        default:
            return state;
    }
} 