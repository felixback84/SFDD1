// redux stuff
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// reducers
import uiReducer from './reducers/uiReducer';
import userReducer from './reducers/userReducer';
import userDevicesReducer from './reducers/userDevicesReducer';
import dataSetsReducer from './reducers/dataSetsReducer';
import checkoutsReducer from './reducers/checkoutsReducer';
import devicesReducer from './reducers/devicesReducer';
import heartbeatThingReducer from './reducers/heartbeatThingReducer';

// empty initial state
const initialState = {};

// middlaware of redux
const middleware = [thunk];

// combine object reducers
const reducers = combineReducers({
    ui: uiReducer,
    user: userReducer,
    userDevices1: userDevicesReducer,
    dataSets1: dataSetsReducer,
    checkouts1: checkoutsReducer,
    devices1: devicesReducer,
    heartbeatThing1: heartbeatThingReducer,
});

// creation of store and dev redux tools
const store = createStore(
    reducers, 
    initialState, 
    compose(
        applyMiddleware(...middleware), 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
); 
export default store;