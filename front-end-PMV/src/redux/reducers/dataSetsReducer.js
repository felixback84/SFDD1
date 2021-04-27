 // user actions
 import {
    LOADING_DATASETS,
    GET_DATASETS,
    GET_DATASET,
    POST_DATASET
} from '../types';

// initial state
const initialState = {
    dataSets: [],
    dataSet: {},
    loading: false
};

// function to determine the type of action to set state
export default function(state = initialState, action){
    switch(action.type){
        
        default:
            return state;  
        case LOADING_DATASETS:    
            return{
                ...state,
                loading: true,
            }
        case GET_DATASETS:
            return{
                ...state,
                dataSets: action.payload,
                loading: false
            }
        case GET_DATASET:
            return{
                ...state,
                dataSet: action.payload,
                loading: false
            }
        case POST_DATASET:    
            return{
                dataSets:[
                    action.payload,
                    ...state.dataSets
                ]
            }
    }
} 
