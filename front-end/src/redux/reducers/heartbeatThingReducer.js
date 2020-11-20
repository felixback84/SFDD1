// user actions
import {
    LOADING_GET_EVENTS_FROM_HEARTBEAT_THING,
    GET_EVENTS_FROM_HEARTBEAT_THING
} from '../types';

// initial state
const initialState = {
    loading: false,
    thingLiveDataSets:{}
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
            };
        default:
            return state;
    }
} 