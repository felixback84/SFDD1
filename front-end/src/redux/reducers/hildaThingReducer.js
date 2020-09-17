// user actions
import {
    LOADING_GET_EVENTS_FROM_HILDA_THING,
    GET_EVENTS_FROM_HILDA_THING
} from '../types';

// initial state
const initialState = { 
    loading: false,
    thingData:{colorValue:{}}
};

// function to determine the type of action to set state
export default function(state = initialState, action){
    switch(action.type){
        case LOADING_GET_EVENTS_FROM_HILDA_THING:
            return{
                ...state,
                loading: true
            };
        case GET_EVENTS_FROM_HILDA_THING:
            return{
                ...state,
                thingData: action.payload,
            };
        default:
            return state;
    }
} 