// user actions
import {
    LOADING_GET_EVENTS_FROM_HILDA_THING,
    GET_EVENTS_FROM_HILDA_THING,
    POST_ACTIVE_COMMAND_HILDA_THING,
    POST_INACTIVE_COMMAND_HILDA_THING,
    POST_COLOR_COMMAND_HILDA_THING,
    POST_MOTOR_SPEED_COMMAND_HILDA_THING,
    GET_DATA_TO_CHART_OF_ACTIVE_TIMES_EACH_DAY
} from '../types';

// initial state
const initialState = { 
    loading: false,
    thingLiveDataSets:{
        colorValue:{}
    },
    thing:{
        colorValue:{},
    },
    charts:{}
};

// function to determine the type of action to set state
export default function(state = initialState, action){
    switch(action.type){
        case LOADING_GET_EVENTS_FROM_HILDA_THING:
            return{
                ...state,
                loading: true
            };
        /////////////////////////////////////////////////// liveDataSets response     
        case GET_EVENTS_FROM_HILDA_THING:
            return{
                ...state,
                thingLiveDataSets: action.payload,
            };
        /////////////////////////////////////////////////// commands response     
        case POST_ACTIVE_COMMAND_HILDA_THING:
            return{
                thing:{
                    active: action.payload
                }
            };    
        case POST_INACTIVE_COMMAND_HILDA_THING:
            return{
                thing:{
                    active: action.payload
                }
            };    
        case POST_COLOR_COMMAND_HILDA_THING:
            return{
                thing:{
                    colorValue: action.payload
                }    
            }; 
        case POST_MOTOR_SPEED_COMMAND_HILDA_THING:
            return{
                thing:{
                    motorSpeed: action.payload
                }    
            };   
        /////////////////////////////////////////////////// charts    
        case GET_DATA_TO_CHART_OF_ACTIVE_TIMES_EACH_DAY:
            return{
                charts:{
                    counter: action.payload.counter,
                    newUniques: action.payload.newUniques
                }    
            };        
        default:
            return state;
    }
} 