// redux stuff
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// reducers
import uiReducer from './reducers/uiReducer';
import userReducer from './reducers/userReducer';
import userDevicesReducer from './reducers/userDevicesReducer';
import userAdventuresReducer from './reducers/userAdventuresReducer';
import dataSetsReducer from './reducers/dataSetsReducer';
import checkoutsReducer from './reducers/checkoutsReducer';
import devicesReducer from './reducers/devicesReducer';
import adventuresReducer from './reducers/adventuresReducer';
import haloThingReducer from './reducers/haloThingReducer';
import hildaThingReducer from './reducers/hildaThingReducer';

// empty initial state
const initialState = {};

// middlaware of redux
const middleware = [thunk];

// combine object reducers
const reducers = combineReducers({
    ui: uiReducer,
    user: userReducer,
    userDevices1: userDevicesReducer,
    userAdventures1: userAdventuresReducer,
    dataSets1: dataSetsReducer,
    checkouts1: checkoutsReducer,
    devices1: devicesReducer,
    adventures1: adventuresReducer,
    haloThing1: haloThingReducer,
    hildaThing1: hildaThingReducer,
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