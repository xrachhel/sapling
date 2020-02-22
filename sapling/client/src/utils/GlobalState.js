import React, {createContext, useReducer, useContext} from "react";
import {
    SET_CURRENT_PRODUCT,
    SET_AMAZON_PRODUCT,
    SET_BESTBUY_PRODUCT,
    TOP_WALMART_ITEMS,
    TOP_AMAZON_ITEMS,
    UPDATE_RESULT_LIST,
    TRACK_PRODUCT,
    REMOVE_PRODUCT,
    UPDATE_DASHBOARD_LIST,
    SET_DASHBOARD_LIST,
    LOADING
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
    case TOP_WALMART_ITEMS:
        return {
           ...state,
          TopWalmartList: [...action.TopWalmartList],
          loading: false
          };
    case TOP_AMAZON_ITEMS:
        return {
          ...state,
          TopAmazonList: [...action.TopAmazonList],
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
        loading: true
    };

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
      TopWalmartList:[],
      TopAmazonList:[],
      trackedList: [],
      loading: false
    });
  
    return <Provider value={[state, dispatch]} {...props} />;
  };
  
  const useStoreContext = () => {
    return useContext(StoreContext);
  };
  
  export { StoreProvider, useStoreContext };