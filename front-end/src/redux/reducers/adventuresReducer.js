 // user actions
 import {
    LOADING_ADVENTURES,
    GET_ADVENTURES,
    GET_ADVENTURE,
    GET_LIKE_ADVENTURES,
    GET_UNLIKE_ADVENTURES,
    POST_ADVENTURE_COMMENT
} from '../types';

// initial state
const initialState = {
    adventures: [],
    adventure: {},
    loading: false
};

// function to determine the type of action to set state
export default function(state = initialState, action){
    switch(action.type){
        case LOADING_ADVENTURES:
            return{
                ...state,
                loading: true
            };
        case GET_ADVENTURES:
            return{
                ...state,
                adventures: action.payload,
                loading: false  
            };
        case GET_ADVENTURE: 
            return{
                ...state,
                adventure: action.payload
            }       
        case GET_LIKE_ADVENTURES:
        case GET_UNLIKE_ADVENTURES:
            let index = state.adventures.findIndex(
                (adventure) => adventure.adventureId === action.payload.adventureId
            );
            state.adventures[index] = action.payload;
            if (state.adventure.adventureId === action.payload.adventureId) {
                state.adventure = action.payload;
            }
            return {
                ...state
            }; 
        case POST_ADVENTURE_COMMENT:
            return {
                ...state,
                adventure: {
                    ...state.adventure,
                    comments: [
                        action.payload, 
                        ...state.adventure.comments
                    ]
                }
            };  
        default:
            return state;
    }
} 