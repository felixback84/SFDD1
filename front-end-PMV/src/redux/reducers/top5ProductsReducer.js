// user actions
import { 
 
    // ---> search products by category and tags
    GET_PRODUCTS_BY_CATEGORY_AND_TAGS,
    STOP_GET_PRODUCTS_BY_CATEGORY_AND_TAGS,

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

} from '../types'

// initial state
const initialState = {
    loading: undefined,

    responses:{},

    top5Products:[],
        top5ProductsListener:[],

    top5Product:{},
        top5ProductListener:[],
};

// function to determine the type of action to set state
export default function(state = initialState, action){
    switch(action.type){

        // search
        case GET_PRODUCTS_BY_CATEGORY_AND_TAGS:
            return {
                ...state,
                responses: action.payload,
                //loading: false
            }; 

        case STOP_GET_PRODUCTS_BY_CATEGORY_AND_TAGS:
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
            
        // top5Product --> mode four
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

        default:
            return state; 
    }    
}    
