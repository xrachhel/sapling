import React, {createContext, useReducer, useContext} from "react";
import {
    SET_CURRENT_PRODUCT,
    SET_AMAZON_PRODUCT,
    SET_BESTBUY_PRODUCT,
    ITEMS_ONE,
    ITEMS_TWO,
    ITEMS_THREE,
    UPDATE_RESULT_LIST,
    TRACK_PRODUCT,
    REMOVE_PRODUCT,
    UPDATE_DASHBOARD_LIST,
    SET_DASHBOARD_LIST,
    LOADING,
    LOG_IN
} from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
  case SET_CURRENT_PRODUCT:
    return {
      ...state,
      currentProduct: action.product,
      loading: false
    };

  case SET_BESTBUY_PRODUCT:
    return {
      ...state,
      bestbuyProduct: action.product,
      loading: false
    };

    case SET_AMAZON_PRODUCT:
        return {
          ...state,
          amazonProduct: action.product,
          loading: false
        };
    case ITEMS_ONE:
        return {
           ...state,
          CarasuleItemOne: [...action.CarasuleItemOne],
          loading: false
          };
    case ITEMS_TWO:
        return {
          ...state,
          CarasuleItemTwo: [...action.CarasuleItemTwo],
          loading: false
          };
    case ITEMS_THREE:
        return {
          ...state,
          CarasuleItemThree: [...action.CarasuleItemThree],
          loading: false
          };

  case UPDATE_RESULT_LIST:
    return {
      ...state,
      productList: [...action.productList],
      loading: false
    };

  case TRACK_PRODUCT:
    return {
      ...state,
      trackedList: [action.product, ...state.trackedList],
    };

  case REMOVE_PRODUCT:
    return {
      ...state,
      trackedList: state.trackedList.filter((product) => {
        return product.sku !== action.sku; 
      })
    };

  case UPDATE_DASHBOARD_LIST:
    return {
      ...state,
      trackedList: [...state.trackedList],
      loading: false
    };

  case SET_DASHBOARD_LIST:
    return{
      ...state,
      trackedList: [...action.trackedList],
      loading: false
    };
  
  case LOADING:
    return{
        ...state,
        loading: false
    };
  case LOG_IN:{
    return{
      ...state,
      LogIn:true
    }
  }

  default:
    return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer(reducer, {
      searchTerm: "top products",
      productList: [],
      bestbuyProduct:{
        name: "",
        price: 0,
        link: ""
      },
      amazonProduct:{
        name: "",
        price: 0,
        link: ""
      },
      currentProduct: {
        _id: 0,
        name: "",
        price: 0,
        itemId: 0,
        recentPrices: [],
        recentAmazonPrices: [],
        recentBestBuyPrices: [],
        asin: "",
        upc: 0,
        rating: 0.0,
        description: "",
        image: "",
        link: ""
      },
      CarasuleItemOne:[],
      CarasuleItemTwo:[],
      CarasuleItemThree:[],
      trackedList: [],
      loading: false,
      LogIn:false
    });
  
    return <Provider value={[state, dispatch]} {...props} />;
  };
  
  const useStoreContext = () => {
    return useContext(StoreContext);
  };
  
  export { StoreProvider, useStoreContext };