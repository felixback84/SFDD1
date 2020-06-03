import {
    SET_SHIPPING_ADDRESS_CHECKOUT,
    SET_BILLING_ADDRESS_CHECKOUT,
    SET_PAYMENT_METHOD_CHECKOUT,
    LOADING_CHECKOUTS,
    POST_CHECKOUT,
    GET_CHECKOUTS,
    GET_CHECKOUT
} from '../types';

// initial state
const initialState = {
    loading: false,
    checkouts:[],
    checkout:{},
    paymentData:{
        shippingAddress:{},
        billingAddress:{},
        cc:{}
    }
    // firebaseCheckout:{
        
    // }
    
}

// function to determine the type of action to set state
export default function(state = initialState, action){
    switch(action.type){
        case LOADING_CHECKOUTS:
            return{
                ...state,
                loading: true
            }
        case SET_SHIPPING_ADDRESS_CHECKOUT:
            return{
                ...state,
                paymentData:action.paymentData
            }
        case SET_BILLING_ADDRESS_CHECKOUT:
            let shippingAddress = state.paymentData.shippingAddress;
            state.paymentData.shippingAddress = shippingAddress;
            return{
                ...state,
                paymentData: {
                    shippingAddress:shippingAddress,
                    billingAddress:action.paymentData.billingAddress
                }
            }
            
        case SET_PAYMENT_METHOD_CHECKOUT:
            return{

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