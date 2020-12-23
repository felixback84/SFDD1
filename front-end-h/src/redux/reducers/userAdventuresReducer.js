import {
    LOADING_USER_ADVENTURES, 
    GET_USER_ADVENTURES,
    GET_USER_ADVENTURE
} from '../types';


// initial state
const initialState = {
    loading: false,
    userAdventures:[],
    userAdventure:{
        adventure:{
            device:{
                
            },
            imgUrl:[],
            tags:[]
        }
    }
}

// function to determine the type of action to set state
export default function(state = initialState, action){
    switch(action.type){
        case LOADING_USER_ADVENTURES:
            return{
                ...state,
                loading: true
            }
        case GET_USER_ADVENTURES:
            return {
                ...state,
                loading: false, 
                userAdventures: action.payload
            }
        case GET_USER_ADVENTURE:
            return {
                ...state,
                loading: false, 
                userAdventure: action.payload
                
            }
        default:
            return state; 
    }    
}  