import {
    LOADING_CHECKOUTS,
    POST_CHECKOUT,
    GET_CHECKOUTS,
    GET_CHECKOUT
} from '../types';

// initial state
const initialState = {
    loading: false,
    checkouts:[],
<<<<<<< HEAD
    checkout:{}
=======
    checkout:{},
    formsPayment:{
        paymentData:{
            address:{},
            cc:{}
        },
        firebaseCheckout:{
        }
    }
>>>>>>> dad0378... hi again
}

// function to determine the type of action to set state
export default function(state = initialState, action){
    switch(action.type){
        case LOADING_CHECKOUTS:
            return{
                ...state,
                loading: true
            }
        case POST_CHECKOUT:
            return{
                ...state,
                checkouts: [
                    action.payload,
                    ...state.checkouts
                ]
            }; 
        case GET_CHECKOUTS:
            return {
                ...state,
                loading: false, 
                checkouts: action.payload
                
            }
        case GET_CHECKOUT:
            return {
                ...state,
                loading: false, 
                checkout: action.payload
            }
        default:
            return state; 
    }    
}  