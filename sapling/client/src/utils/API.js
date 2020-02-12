const axios = require("axios");

export default {

    /*
    ----------------------------------------------------------------------
    -------------------------SAPLING API ROUTES---------------------------
    ----------------------------------------------------------------------
    */

    //returns a list of all users and their track product lists
    getAllUsers: ()=> {
        return axios.get("/api/user");
    },

    //returns one user and that user's tracked product list
    getOneUser: id => {
        return axios.get(`/api/user/${id}`);
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
    trackProduct: (userId,productObj) => {
        return axios.put(`/api/user/${userId}`, productObj);
    },

    //updates a product's price and pushed the old price to the 
    //recent prices list
    updateProduct: (id, price) => {
        return axios.put(`/api/products/${id}/${price}`);
    },

    //removes product from user's tracke product list and deletes it
    deleteProduct: (userId,productId) => {
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
    searchProduct: (productName, pageNumber) =>{
        const params = {
            api_key: "19ED14B806614C50B9B33AD645BD1E15",
            type: "search",
            amazon_domain: "amazon.com",
            search_term: productName,
            page: pageNumber
          }
        
        return  axios.get('https://api.rainforestapi.com/request', { params });
    },

    //searches a specific products information
    //the asin code is a unique identifier belonging to the product
    getProductInfo: asinCode => {
        const params = {
            api_key: "19ED14B806614C50B9B33AD645BD1E15",
            type: "product",
            amazon_domain: "amazon.com",
            asin: asinCode
        }

        return axios.get('https://api.rainforestapi.com/request', { params });
    }
};