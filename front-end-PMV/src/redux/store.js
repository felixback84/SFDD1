// redux stuff
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// saga
import createSagaMiddleware from 'redux-saga'
// sagas
import rootSaga from './sagas/sagas'
// reducers
import uiReducer from './reducers/uiReducer';
import userReducer from './reducers/userReducer';
import userDevicesReducer from './reducers/userDevicesReducer';
import dataSetsReducer from './reducers/dataSetsReducer';
import checkoutsReducer from './reducers/checkoutsReducer';
import devicesReducer from './reducers/devicesReducer';
import heartbeatThingReducer from './reducers/heartbeatThingReducer';

// saga middleware
//const sagaMiddleware = createSagaMiddleware()
//const middleware = [thunk,sagaMiddleware]
const middleware = [thunk]

// empty initial state
const initialState = {};

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

// start sagas
//sagaMiddleware.run(rootSaga)

// export
export default store;

