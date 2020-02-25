const axios = require("axios");

export default {
  /*
    ----------------------------------------------------------------------
    -------------------------SAPLING API ROUTES---------------------------
    ----------------------------------------------------------------------
    */

  //returns a list of all users and their track product lists
  getAllUsers: () => {
    return axios.get("/api/user");
  },

  //returns one user and that user's tracked product list
  getOneUser: data => {
    return axios.put(`/api/user/login`, data);
  },

  getUserHash: email => {
    return axios.get(`/api/user/${email}`);
  },

  //returns one specic product's info
  getOneProduct: id => {
    return axios.get(`/api/products/${id}`);
  },

  //creates one user
  /*The userObj handed to the function should be structured like this:
        {
            firstName: "Farley",
            lastName: "Wittles",
            email: "farley@fakemail.com",
            password: "password123"
        }
    */
  createUser: userObj => {
    return axios.post("/api/user", userObj);
  },

  //creates a product and adds it to a user's tracked product list
  trackProduct: (userId, productObj) => {
    return axios.put(`/api/user/${userId}`, productObj);
  },

  //updates a product's price and pushed the old price to the
  //recent prices list
  updateWalmarPrice: (id, price) => {
    return axios.put(`/api/products/walmart/${id}/${price}`);
  },

  updateAmazonPrice: (id, price) => {
    return axios.put(`/api/products/amazon/${id}/${price}`);
  },

  updateBestbuyPrice: (id, price) => {
    return axios.put(`/api/products/bestbuy/${id}/${price}`);
  },

  //removes product from user's tracke product list and deletes it
  deleteProduct: (userId, productId) => {
    return axios.delete(`/api/products/${userId}/${productId}`);
  },

  //deletes one user
  deleteUser: id => {
    return axios.delete(`/api/user/${id}`);
  },

  /*
    ----------------------------------------------------------------------
    -----------------------RAINFOREST API ROUTES--------------------------
    ----------------------------------------------------------------------
    */

  //searches for a product and returns result list
  // pageNumber must be a string
  searchProductAmazon: productName => {
    return axios.get(`/api/rainforest/${productName}`);
  },

  //searches a specific products information
  //the asin code is a unique identifier belonging to the product
  getProductInfoAmazon: gtinCode => {
    return axios.get(`/api/rainforest/product/${gtinCode}`);
  },

  /*
    ----------------------------------------------------------------------
    -------------------------WALMART API ROUTES---------------------------
    ----------------------------------------------------------------------
    */

  searchProductWalmart: productName => {
    return axios.get(`/api/walmart/${productName}`);
  },

  getProductInfoWalmart: itemId => {
    return axios.get(`/api/walmart/product/${itemId}`);
  },

  /*
    ----------------------------------------------------------------------
    -------------------------BESTBUY API ROUTES---------------------------
    ----------------------------------------------------------------------
    */

  getProductInfoBestbuy: upc => {
    return axios.get(`/api/bestbuy/product/${upc}`);
  },
  getWalmartTopProduct: () => {
    return axios.get("/api/walmart");
  }
};
