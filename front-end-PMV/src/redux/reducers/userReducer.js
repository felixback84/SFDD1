 // user actions
import {
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    SET_USER,
    GET_ACTIVE_USER_DEVICES,
    GET_INACTIVE_USER_DEVICES,
    GET_LIKE_DEVICES, 
    GET_UNLIKE_DEVICES,

    MARK_DEVICE_NOTIFICATIONS_READ
} from '../types';

// initial state
const initialState = {
    authenticated: false,
    loading: false,
    credentials: {}, 
    activeUserDevices: [],
    likes: [],
    notifications: []
}; 

// function to determine the type of action to set state
export default function(state = initialState, action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return{
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case LOADING_USER: 
            return {
                ...state,
                loading: true
            }; 
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };  
        case GET_ACTIVE_USER_DEVICES:
            return {
                ...state,
                activeUserDevices: [ 
                    ...state.activeUserDevices,
                    {
                        userHandle: state.credentials.userHandle,
                        userDeviceId: action.payload.userDeviceId
                    }
                ]
            }; 
        case GET_INACTIVE_USER_DEVICES:
            return {
                ...state,
                activeUserDevices: state.activeUserDevices.filter(
                    activeUserDevice => activeUserDevice.userDeviceId !== action.payload.userDeviceId
                )
            }  
        case GET_LIKE_DEVICES:
            return{
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.userHandle,
                        deviceId: action.payload.deviceId,
                        type: 'devices'
                    }
                ]
            }
        case GET_UNLIKE_DEVICES:    
            return {
                ...state,
                likes: state.likes.filter(
                    like => like.deviceId !== action.payload.deviceId
                )
            }  
        case MARK_DEVICE_NOTIFICATIONS_READ:
            state.notifications.forEach((notification) => (notification.read = true));
            return {
                ...state
            }     
        default:
            return state;  
    }
} 