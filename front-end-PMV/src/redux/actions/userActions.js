// user actions
import {
    LOADING_UI,
    CLEAR_ERRORS,
    SET_ERRORS,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    SET_USER,
    GET_ACTIVE_USER_DEVICES,
    GET_INACTIVE_USER_DEVICES,
    GET_ACTIVE_USER_ADVENTURES,
    GET_INACTIVE_USER_ADVENTURES,
    MARK_DEVICE_NOTIFICATIONS_READ
} from '../types';

// axios
import axios from 'axios';
 
// redux action to login users 
export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/login', userData)
        .then((res) => {            
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/myhome'); 
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
} 
 
// redux action to signup new users 
export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/signup', newUserData)
        .then((res) => {            
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/myhome');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
} 

// redux action to edit user details
export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
        .post('/user', userDetails)
        .then(() => {
            dispatch(getUserData());
        })
        .catch((err) => console.log(err));
}; 

// redux action to get or set user data 
export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
        .get('/user')
        .then((res) => { 
            dispatch({
                type: SET_USER,
                payload: res.data
            });
        })
        .catch((err) => console.log(err));
};

// redux action to loggout users
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}; 

// redux action to upload image on the server
export const uploadProfileImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
        .post('/user/image', formData)
        .then(() => {
            dispatch(getUserData());
        })
        .catch((err) => console.log(err));
};

// function to store auth header
const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};

// to determine of the notifications was read
export const markDevicesNotificationsRead = (notificationsIds) => dispatch => {
    axios
        .post('/notifications', notificationsIds)
        .then ((res) => {
            dispatch({
                type: MARK_DEVICE_NOTIFICATIONS_READ
            })
        })
        .catch(err => console.log(err));
} 