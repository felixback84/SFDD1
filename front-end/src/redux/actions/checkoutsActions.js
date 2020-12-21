// user actions
import {
    CLEAR_ERRORS,
    SET_ERRORS,
    LOADING_UI,
    STOP_LOADING_UI,
    SET_SHIPPING_ADDRESS_CHECKOUT,
    SET_BILLING_ADDRESS_CHECKOUT,
    SET_CREDIT_CARD,
    LOADING_CHECKOUTS,
    POST_CHECKOUT,
    GET_CHECKOUTS,
    GET_CHECKOUT
} from '../types';

// axios
import axios from 'axios';

// redux action to set shipping address in device store
export const setAddressShipping = (userAdressShippingData) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    dispatch({
        type: SET_SHIPPING_ADDRESS_CHECKOUT,
        paymentData: {
            shippingAddress:userAdressShippingData
        }
    });
    dispatch({ type: STOP_LOADING_UI });
}

// redux action to set billing address in device store
export const setAddressBilling = (userAdressBillingData) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    dispatch({
        type: SET_BILLING_ADDRESS_CHECKOUT,
        paymentData: {
            billingAddress:userAdressBillingData
        }
    });
    dispatch({ type: STOP_LOADING_UI });
}

// redux action to set credit card in device store
export const setCreditCard = (userCreditCardData) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    dispatch({
        type: SET_CREDIT_CARD,
        paymentData: {
            cc:userCreditCardData
        }
    });
    dispatch({ type: STOP_LOADING_UI });
}

// redux action to post checkout to device
export const postDataCheckOutDevice = (deviceId, userData) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post(`/user/checkout/device/${deviceId}`, userData)
        .then((res) => {   
            console.log('hi action reducer');  
            console.log(res.data); 

            //dispatch({ type: CLEAR_ERRORS });
        
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
    dispatch({ type: STOP_LOADING_UI });    
}

// redux action to post checkout to adventure
export const postDataCheckOutAdventure = (adventureId, userData) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post(`/user/checkout/device/${adventureId}`, userData)
        .then((res) => {   
            console.log('hi action reducer');  
            console.log(res.data); 

            //dispatch({ type: CLEAR_ERRORS });
        
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
    dispatch({ type: STOP_LOADING_UI });    
}

// get all checkouts
export const getAllCheckouts = () => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .get('/user/checkouts')
        .then((res) => {    
            // print res 
            console.log(res.data); 
            dispatch({
                type: GET_CHECKOUTS,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => console.log(err));
}    

