// redux stuff
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// saga
import createSagaMiddleware from 'redux-saga'
// sagas
import rootSaga from './sagas/sagas'

////////////////////// reducers ////////////
// ui
import uiReducer from './reducers/uiReducer';

// user
import userReducer from './reducers/userReducer';

// userDevices reducers
import userDevicesReducer from './reducers/userDevicesReducer';
    import heartbeatThingReducer from './reducers/heartbeatThingReducer';
    import dataSetsReducer from './reducers/dataSetsReducer';
    import top5TagsReducer from './reducers/top5TagsReducer';
    import top5ProductsReducer from './reducers/top5ProductsReducer';

// staticDevices Reducer
// import staticDevicesReducer from './reducers/staticDevicesReducer'
    // import staticHeartbeatThingReducer from './reducers/staticHeartbeatThingReducer'
    import productsReducer from './reducers/productsReducer'
    
// import notificationsReducer from './reducers/notificationsReducer';
import checkoutsReducer from './reducers/checkoutsReducer';
import devicesReducer from './reducers/devicesReducer';

/////////////////////////// saga middleware
//const sagaMiddleware = createSagaMiddleware()
//const middleware = [thunk,sagaMiddleware]
const middleware = [thunk]

// empty initial state
const initialState = {};

// combine object reducers
const reducers = combineReducers({
    // ui
    ui: uiReducer,

    // user
    user: userReducer,

    // userDevice
    userDevices1: userDevicesReducer,
        heartbeatThing1: heartbeatThingReducer,
        top5Tags1: top5TagsReducer,
        top5Products1: top5ProductsReducer,
        dataSets1: dataSetsReducer,

    // notifications    
    // notifications1: notificationsReducer,

    // checkouts    
    checkouts1: checkoutsReducer,

    // staticDevices
    // staticDevices1: staticDeviceReducer,
        // staticHeartbeatThing1: staticHeartbeatThingReducer,
        products1: productsReducer,

    // devices ux
    devices1: devicesReducer,
});

// creation of store and dev redux tools    
const store = createStore( 
    reducers, 
    initialState, 
    compose(
        applyMiddleware(...middleware), 
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
); 

// start sagas
//sagaMiddleware.run(rootSaga)

// export
export default store;
