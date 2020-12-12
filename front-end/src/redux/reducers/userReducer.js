 // user actions
import {
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    SET_USER,
    GET_ACTIVE_USER_DEVICES,
    GET_INACTIVE_USER_DEVICES,
    GET_ACTIVE_USER_ADVENTURES,
    GET_INACTIVE_USER_ADVENTURES,
    GET_LIKE_DEVICES, 
    GET_UNLIKE_DEVICES,
    GET_LIKE_ADVENTURES,
    GET_UNLIKE_ADVENTURES
} from '../types';

// initial state
const initialState = {
    authenticated: false,
    loading: false,
    credentials: {}, 
    activeUserDevices: [],
    activeUserAdventures: [],
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
        case GET_ACTIVE_USER_ADVENTURES:
            return {
                ...state,
                activeUserAdventures: [
                    ...state.activeUserAdventures,
                    {
                        userHandle: state.credentials.userHandle,
                        userAdventureId: action.payload.userAdventureId
                    }
                ]
            }; 
        case GET_INACTIVE_USER_ADVENTURES:
            return {
                ...state,
                activeUserAdventures: state.activeUserAdventures.filter(
                    activeUserAdventure => activeUserAdventure.userAdventureId !== action.payload.userAdventureId
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
        case GET_LIKE_ADVENTURES:
            return{
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.userHandle,
                        adventureId: action.payload.adventureId,
                        type: 'adventures'
                    }
                ]
            }
        case GET_UNLIKE_ADVENTURES:    
            return {
                ...state,
                likes: state.likes.filter(
                    like => like.adventureId !== action.payload.adventureId
                )
            }             
        default:
            return state;  
    }
} 