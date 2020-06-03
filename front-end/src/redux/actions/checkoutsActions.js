// user actions
import {
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

// redux action to set billing address in device store
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

