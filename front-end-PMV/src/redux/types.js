//////////////////////////////////////////////////////////////// UI reducer types //////////////////////////////////////////////////////////////
export const SET_ERRORS = 'SET_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const LOADING_UI = 'LOADING_UI';
export const STOP_LOADING_UI = 'STOP_LOADING_UI';

export const LOADING_GET_TAGS_FROM_DEVICE_CONFIG = 'LOADING_GET_TAGS_FROM_DEVICE_CONFIG';
export const GET_DATA_TAGS_FROM_ALL_STATICS_FOR_SEARCH_BOX_MODEONE = 'GET_DATA_TAGS_FROM_ALL_STATICS_FOR_SEARCH_BOX_MODEONE'
export const STOP_GET_TAGS_FROM_DEVICE_CONFIG = 'STOP_GET_TAGS_FROM_DEVICE_CONFIG';

//////////////////////////////////////////////////////////////// User reducer types //////////////////////////////////////////////////////////////
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const SET_UNAUTHENTICATED = 'SET_UNAUTHENTICATED';

export const LOADING_USER = 'LOADING_USER';
export const SET_USER = 'SET_USER'; 
export const STOP_LOADING_USER = 'LOADING_USER';

export const GET_ACTIVE_USER_DEVICES = 'GET_ACTIVE_USER_DEVICES';
export const GET_INACTIVE_USER_DEVICES = 'GET_INACTIVE_USER_DEVICES';

export const MARK_DEVICE_NOTIFICATIONS_READ = 'MARK_DEVICE_NOTIFICATIONS_READ';

////////////////////////////////////////////////////////////// userDevices reducers types //////////////////////////////////////////////////////////
export const LOADING_USER_DEVICES = 'LOADING_USER_DEVICES';
export const GET_USER_DEVICES = 'GET_USER_DEVICES';
export const STOP_LOADING_USER_DEVICES = 'STOP_LOADING_USER_DEVICES';

export const LOADING_USER_DEVICE = 'LOADING_USER_DEVICE';
export const GET_USER_DEVICE = 'GET_USER_DEVICE'; 
export const STOP_LOADING_USER_DEVICE = 'STOP_LOADING_USER_DEVICE';

// client side fb 
export const GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS = 'GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS'; 
export const STOP_LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS = 'STOP_LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS';

    // live
    export const GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS_LIVE = 'GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS_LIVE'
    export const STOP_LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS_LIVE = 'STOP_LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_TAGS_LIVE'

export const LOADING_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG = 'LOADING_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG'; 
export const GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG = 'GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG'; 
export const STOP_LOADING_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG = 'STOP_LOADING_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_TAG3'; 

export const LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS = 'LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS'; 
export const GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS = 'GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS'; 
export const STOP_LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS = 'STOP_LOADING_GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS'; 

export const LOADING_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT = 'LOADING_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT'
export const GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT = 'GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT'
export const STOP_LOADING_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT = 'STOP_LOADING_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT'

//////////////////////////////////////////////////////////////// heartbeat thing reducers types //////////////////////////////////////////////////////////////
export const POST_ACTIVE_COMMAND_HEARTBEAT_THING = 'POST_ACTIVE_COMMAND_HEARTBEAT_THING';
export const POST_INACTIVE_COMMAND_HEARTBEAT_THING = 'POST_INACTIVE_COMMAND_HEARTBEAT_THING';
// to set the searching mode
export const SET_HEARTBEAT_SEARCHING_MODE = 'SET_HEARTBEAT_SEARCHING_MODE'

export const POST_TAGS_OF_PROFILE_TO_MATCH_BY_USER_IN_LIVEDATASETS = 'POST_TAGS_OF_PROFILE_TO_MATCH_BY_USER_IN_LIVEDATASETS'
// from liveDataSets ---- client side fb

export const GET_EVENTS_FROM_HEARTBEAT_THING = 'GET_EVENTS_FROM_HEARTBEAT_THING'
export const STOP_LOADING_GET_EVENTS_FROM_HEARTBEAT_THING = 'STOP_LOADING_GET_EVENTS_FROM_HEARTBEAT_THING'

    export const GET_EVENTS_FROM_HEARTBEAT_THING_LIVE = 'GET_EVENTS_FROM_HEARTBEAT_THING_LIVE';
    export const STOP_LOADING_GET_EVENTS_FROM_HEARTBEAT_THING_LIVE = 'STOP_LOADING_GET_EVENTS_FROM_HEARTBEAT_THING_LIVE'

//////////////////////////////////////////////////////////////// charts  //////////////////////////////////////////////////////////////
export const GET_DATA_TO_CHART_OF_ACTIVE_TIMES_EACH_DAY = 'GET_DATA_TO_CHART_OF_ACTIVE_TIMES_EACH_DAY';

//////////////////////////////////////////////////////////////// Checkouts reducer types //////////////////////////////////////////////////////////////
export const SET_SHIPPING_ADDRESS_CHECKOUT = 'SET_SHIPPING_ADDRESS_CHECKOUT';
export const SET_BILLING_ADDRESS_CHECKOUT = 'SET_BILLING_ADDRESS_CHECKOUT';
export const SET_CREDIT_CARD = 'SET_CREDIT_CARD';
export const LOADING_CHECKOUTS = 'LOADING_CHECKOUTS';
export const POST_CHECKOUT = 'POST_CHECKOUT';
export const GET_CHECKOUTS = 'GET_CHECKOUTS';
export const GET_CHECKOUT = 'GET_CHECKOUT';

//////////////////////////////////////////////////////////////// DataSets reducer types //////////////////////////////////////////////////////////////
export const LOADING_DATASETS = 'LOADING_DATASETS';
export const POST_DATASET = 'POST_DATASET';
export const GET_DATASETS = 'GET_DATASETS';
export const GET_DATASET = 'GET_DATASET';

//////////////////////////////////////////////////////////////// Devices reducer types //////////////////////////////////////////////////////////////
export const LOADING_DEVICES = 'LOADING_DEVICES';
export const GET_DEVICES = 'GET_DEVICES';
export const GET_DEVICE = 'GET_DEVICE';
export const GET_LIKE_DEVICES = 'GET_LIKE_DEVICES';
export const GET_UNLIKE_DEVICES = 'GET_UNLIKE_DEVICES';
export const POST_DEVICE_COMMENT = 'POST_DEVICE_COMMENT';


