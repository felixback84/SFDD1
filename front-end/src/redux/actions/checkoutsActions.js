// user actions
import {
    LOADING_UI,
    STOP_LOADING_UI,
    SET_SHIPPING_ADDRESS_CHECKOUT,
    LOADING_CHECKOUTS,
    POST_CHECKOUT,
    GET_CHECKOUTS,
    GET_CHECKOUT
} from '../types';

// axios
import axios from 'axios';

// redux action to set billing address in device store
export const setAddressShipping = (userAdressData) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    dispatch({
        type: SET_SHIPPING_ADDRESS_CHECKOUT,
        paymentData: userAdressData
    });
    dispatch({ type: STOP_LOADING_UI });
}