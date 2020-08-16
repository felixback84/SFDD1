// user actions
import {
    LOADING_GET_EVENTS_FROM_HALO_THING,
    GET_EVENTS_FROM_HALO_THING
} from '../types';

// initial state
const initialState = {
    loading: false,
    data:{}
};

// function to determine the type of action to set state
export default function(state = initialState, action){
    switch(action.type){
        case LOADING_GET_EVENTS_FROM_HALO_THING:
            return{
                ...state,
                loading: true
            };
        case GET_EVENTS_FROM_HALO_THING:
            return{
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
} 