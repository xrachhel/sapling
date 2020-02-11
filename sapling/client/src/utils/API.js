const axios = require("axios");

export default {
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
        return axios.get(`/api/user/${id}`);
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

    //removes product from user's tracke product list and deletes it
    deleteProduct: (userId,productId) => {
        return axios.delete(`/api/products/${userId}/${productId}`);
    },

    //deletes one user
    deleteUser: id => {
        return axios.delete(`/api/user/${id}`);
    }
};