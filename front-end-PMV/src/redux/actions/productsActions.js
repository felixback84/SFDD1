// user actions
import {

    GET_PRODUCTS_UX,
    STOP_GET_PRODUCTS_UX,
    
} from '../types'; 

// firebase client libs
import firebase from '../../fb/utilities/firebase'; 
// axios 
import axios from 'axios';

// get top5Products ux
export const userDeviceSpecificTop5ProductsSyncData = (docId) => async (dispatch) => {

    // var
    let thingId = docId
    // print
    console.log({thingId})
    // run it
    //try {
        const dataTag = await axios
            .get(`/staticdevice/products/${thingId}`)
            // res
            const res = await dataTag
            // print
            console.log({res})
            // dispatchers
            dispatch({ 
                type: GET_PRODUCTS_UX,
                payload: res.data
            })
            dispatch({ type: STOP_GET_PRODUCTS_UX })
    // } catch (error) {
    //     console.log(error)
    // }
}