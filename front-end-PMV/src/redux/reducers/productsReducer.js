// user actions
import { 
    GET_PRODUCTS_UX,
    STOP_GET_PRODUCTS_UX,
} from '../types'

// initial state
const initialState = {
    loading: undefined,
    top5ProductsUx:[],
};
 
// function to determine the type of action to set state
export default function(state = initialState, action){
    switch(action.type){            
        // top5Product
        case GET_PRODUCTS_UX:
            return {
                ...state,
                top5ProductsUx: action.payload,
                loading: false
            };     
        // top5Product
        case STOP_GET_PRODUCTS_UX:
            return {
                ...state,
                loading: false
            };    
            
        default:
            return state; 
    }    
}    
