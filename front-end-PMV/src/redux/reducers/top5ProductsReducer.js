// user actions
import { 
 
    // ---> search products by category and tags
    GET_PRODUCTS_BY_CATEGORY_AND_TAGS,
    STOP_GET_PRODUCTS_BY_CATEGORY_AND_TAGS,  

    // ---> search products by categories and tags
    GET_PRODUCTS_BY_CATEGORIES_AND_TAGS,
    STOP_GET_PRODUCTS_BY_CATEGORIES_AND_TAGS, 

    // ---> post list of products to find
    POST_LIST_OF_PRODUCTS_OF_STATIC_DEVICES_TO_FIND, 
    STOP_POST_LIST_OF_PRODUCTS_OF_STATIC_DEVICES_TO_FIND,

    // top5Products --> mode Three
    GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS,
    STOP_GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS,

        // live
        GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS_LIVE,
        STOP_GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS_LIVE,

    // top5Product --> mode four
    GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT,
    STOP_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT,
        
        // live
        GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT_LIVE,
        STOP_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT_LIVE,

    // MTS - modeEight
    GET_DATA_FROM_USER_STATICS_PRODUCTS_CLOSER_TO_USER_DEVICE_BY_METERS,
    STOP_GET_DATA_FROM_USER_STATICS_PRODUCTS_CLOSER_TO_USER_DEVICE_BY_METERS,
    
    POST_USER_STATIC_PRODUCTS_SELECTED_BY_USERS_AFTER_MTS_RANGE_MATCH_IN_LIVEDATASETS_AND_TOP_5_PRODUCTS,
    STOP_POST_USER_STATIC_PRODUCTS_SELECTED_BY_USERS_AFTER_MTS_RANGE_MATCH_IN_LIVEDATASETS_AND_TOP_5_PRODUCTS

} from '../types'

// initial state
const initialState = {
    // events
    loading: undefined,

    // res
    responses:{},
    responsesToUI: undefined, 
    responsesWithData: undefined,

    // modeThree
    top5Products:[],
        top5ProductsListener:[],

    // modeFour
    top5Product:{},
        top5ProductListener:[],

    // top5Products UI
    // top5ProductsUI:[]
};

// function to determine the type of action to set state
export default function(state = initialState, action){
    switch(action.type){

        // search
        case GET_PRODUCTS_BY_CATEGORY_AND_TAGS:
            return {
                ...state,
                top5Products: action.payload,
                //loading: false
            }; 

        case STOP_GET_PRODUCTS_BY_CATEGORY_AND_TAGS:
            return {
                ...state,
                loading: false
            }; 

        // search by categories and tags
        case GET_PRODUCTS_BY_CATEGORIES_AND_TAGS:
            return {
                ...state,
                top5Products: action.payload,
                //loading: false
            }; 

        case STOP_GET_PRODUCTS_BY_CATEGORIES_AND_TAGS:
            return {
                ...state,
                loading: false
            };

        // post list
        case POST_LIST_OF_PRODUCTS_OF_STATIC_DEVICES_TO_FIND:
            return {
                ...state,
                responses: action.payload,
                loading: false
            }; 

        case STOP_POST_LIST_OF_PRODUCTS_OF_STATIC_DEVICES_TO_FIND:
            return {
                ...state, 
                loading: false
            };

        // top5Products --> mode Three
        case GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS:
            return {
                ...state,
                top5Products: action.payload,
                //loading: false
            };      

        case STOP_GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS:
            return { 
                ...state,
                loading: false 
            };   
            
            // live
            case GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS_LIVE:
                return {
                    ...state,
                    top5ProductsListener: action.payload,
                    loading: false
                };      

            case STOP_GET_DATA_FROM_USER_DEVICE_TOP_5_PRODUCTS_LIVE:
                return { 
                    ...state,
                    loading: false
                }; 

        // top5Product --> mode four
        case GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT:
            return {
                ...state,
                top5Product: action.payload,
                loading: false
            };     

        case STOP_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT:
            return {
                ...state,
                loading: false
            };  
            
            // live
            case GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT_LIVE:
                return {
                    ...state,
                    top5ProductListener: action.payload,
                    loading: false
                };     

            case STOP_GET_DATA_FROM_USER_DEVICE_FROM_SPECIFIC_TOP_5_PRODUCT_LIVE:
                return {
                    ...state,
                    loading: false  
                };
        
        // by neters
        // modeEight --> search geoHashes & meters
        // before mode eight
        case GET_DATA_FROM_USER_STATICS_PRODUCTS_CLOSER_TO_USER_DEVICE_BY_METERS:
            return {
                ...state,
                responsesWithData: action.payload,
            };
        
        case STOP_GET_DATA_FROM_USER_STATICS_PRODUCTS_CLOSER_TO_USER_DEVICE_BY_METERS:    
            return {
                ...state,
                loading: false
            };
        
        case POST_USER_STATIC_PRODUCTS_SELECTED_BY_USERS_AFTER_MTS_RANGE_MATCH_IN_LIVEDATASETS_AND_TOP_5_PRODUCTS:
            return {
                ...state,
                responsesToUI: action.payload,
            };
        
        case STOP_POST_USER_STATIC_PRODUCTS_SELECTED_BY_USERS_AFTER_MTS_RANGE_MATCH_IN_LIVEDATASETS_AND_TOP_5_PRODUCTS:    
            return {
                ...state,
                loading: false
            };
        
        default:
            return state; 
    }    
}    
