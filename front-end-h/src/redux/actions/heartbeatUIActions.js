// user actions
import {
    LOADING_UI,
    STOP_LOADING_UI,
    GET_EVENTS_FROM_HEARTBEAT_THING,
    //POST_ACTIVE_COMMAND_HEARTBEAT_THING,
    //POST_INACTIVE_COMMAND_HEARTBEAT_THING,
    GET_TOP5_PRODUCTS_AND_MTS_BETWEEN_DEVICES_TO_PRODUCTS,
    LOADING_GET_EVENTS_FROM_HEARTBEAT_THING,
    //GET_TOP5COORDSMATCHES,
    SET_ERRORS
} from '../types';

// firebase client libs
import firebase from '../../fb/utilities/firebase'; 
// axios 
import axios from 'axios';

// declarate a function to get data from db
export const heartbeatThingSyncDataWithLiveDB = (thingId) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    // vars to ask to db do
    const thingIdVal = thingId
    const userDeviceId = thingIdVal.split("-").slice(2);

    // snapshot
    const doc = firebase
        .firestore().doc(`/userDevices/${userDeviceId}`) 
        .collection('liveDataSets').doc(thingId)
    const observer = doc.onSnapshot(docSnapshot => {
        const resultDB = docSnapshot.data();    
        // dispatch
        dispatch({ 
            type: GET_EVENTS_FROM_HEARTBEAT_THING,
            payload: resultDB
        });
        // products and meters
        // dispatch(
        //     productMeassures(
        //         resultDB.top5Products,
        //         resultDB.mtsBetweenDevicesToProducts
        //     )
        // );
        dispatch({ type: STOP_LOADING_UI });
    }, err => {
        console.log(`Encountered error: ${err}`);
    });
}

// function to post active command to things
export const heartbeatPostActiveCommand = (thingId, activeValue) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post(`/device/heartbeat/${thingId}/active`, activeValue)
        // .then((res) => {            
        //     dispatch({ 
        //         type: POST_ACTIVE_COMMAND_HEARTBEAT_THING,
        //         payload: res.data
        //     })
        // })
        .catch(err => {
            dispatch({ 
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}    

// function to post inactive command to things
export const heartbeatPostInactiveCommand = (thingId, inactiveValue) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post(`/device/heartbeat/${thingId}/inactive`, inactiveValue)
        // .then((res) => {            
        //     dispatch({ 
        //         type: POST_INACTIVE_COMMAND_HEARTBEAT_THING,
        //         payload: res.data
        //     })
        // })
        .catch(err => {
            dispatch({ 
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
} 

// function to conform the products response from to filds in db
export const productMeassures = (top5Products,mtsBetweenDevicesToProducts) => (dispatch) => {
    
    console.log("ji ji ji")
    // var to hold arr with products
    let itemJSx = []

    // loops
    for(let items in top5Products){
        // cheker
        if(top5Products.hasOwnProperty(items)){
            // print
            console.log(`items:${items}`)
            // map products
            top5Products[items].map((item)=>{
                // print
                console.log(`item:${JSON.stringify(item)}`)
                // push
                itemJSx.push(
                    item
                )
            })
        }
    }

    // var to hold results
    const allData = [] 
    
    // callback
    const findEqual = (JSx) => {
        // loop
        mtsBetweenDevicesToProducts.forEach((item) => {
            // checker
            if(JSx.thingId === item.thingId){
                allData.push({
                    coords:JSx.coords,
                    products:JSx.products,
                    thingId:JSx.thingId,
                    meters:item.meters
                })
                return allData
            }
        })    
    }
    // run find method to establish a relation between the two arrays 
    itemJSx.find(findEqual)

    let uniqueArray = []
    //to eliminate duplicates of coords
    const removeDuplicates = async (arr) => {
        // to string
        const jsonObject = arr.map(JSON.stringify);
        // find repeats
        const uniqueSet = new Set(jsonObject);
        // write arr
        uniqueArray = Array.from(uniqueSet).map(JSON.parse);  
        console.log(`uniqueArray:${uniqueArray}`)
        // return arr
        return uniqueArray
    }

    //run it & hold it to remove duplicates in coords
    removeDuplicates(allData).then((uniqueArray)=>{
        console.log(`uniqueArray:${uniqueArray}`)
        dispatch({
            type: GET_TOP5_PRODUCTS_AND_MTS_BETWEEN_DEVICES_TO_PRODUCTS,
            payload: uniqueArray 
        })
    })
    // .catch(err => {
    //     dispatch({ 
    //         type: SET_ERRORS,
    //         payload: err.response.data
    //     })
    // });
}

// function to find the top5Coords list
// export const getTop5CoordsMatches = (thingId) => (dispatch) => {
//     dispatch({ type: LOADING_UI });
//     axios
//         .get(`/device/heartbeat/${thingId}/top5coords`)
//         .then((res) => {            
//             dispatch({ 
//                 type: GET_TOP5COORDSMATCHES,
//                 payload: res.data
//             })
//         })
//         .catch(err => {
//             dispatch({ 
//                 type: SET_ERRORS,
//                 payload: err.response.data
//             })
//         });
// }

// function post a get the answer to make the matches

