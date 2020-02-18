import React, {createContext, useReducer, useContext} from "react";
import {
    SET_CURRENT_PRODUCT,
    UPDATE_RESULT_LIST,
    TRACK_PRODUCT,
    REMOVE_PRODUCT,
    UPDATE_DASHBOARD_LIST,
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

  case UPDATE_RESULT_LIST:
    return {
      ...state,
      productList: [...action.productList],
      loading: false
    };

  case TRACK_PRODUCT:
    return {
      ...state,
      cartList: [action.product, ...state.cartList],
    };

  case REMOVE_PRODUCT:
    return {
      ...state,
      cartList: state.cartList.filter((product) => {
        return product.sku !== action.sku; 
      })
    };

  case UPDATE_DASHBOARD_LIST:
    return {
      ...state,
      cartList: [...state.cartList],
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
      currentProduct: {
        _id: 0,
        name: "",
        price: 0,
        recentPrices: [],
        asin: "",
        upc: 0,
        rating: 0.0,
        description: "",
        image: ""
      },
      trackedList: [],
      loading: false
    });
  
    return <Provider value={[state, dispatch]} {...props} />;
  };
  
  const useStoreContext = () => {
    return useContext(StoreContext);
  };
  
  export { StoreProvider, useStoreContext };