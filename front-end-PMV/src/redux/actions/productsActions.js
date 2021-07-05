// user actions
import {

    GET_PRODUCTS_UX,
    STOP_LOADING_GET_PRODUCTS_UX,
    
} from '../types'; 

// firebase client libs
import firebase from '../../fb/utilities/firebase'; 
// axios 
import axios from 'axios';

// get top5Products ux
export const userDeviceSpecificTop5ProductSyncData = (docId) => (dispatch) => {

    // var
    let staticDeviceId = docId
    
    try {
        const dataTag = await 
        axios
            .get(`/staticdevice/products/${staticDeviceId}`)
            const res = await dataTag
            console.log({res})
            dispatch({ 
                type: GET_PRODUCTS_UX,
                payload: res.data
            })
            dispatch({ type: STOP_LOADING_GET_PRODUCTS_UX })
    } catch (error) {
        console.log(error)
    }
}