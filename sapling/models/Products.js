const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    upc:{
        type: Number,
        required: true
    },
    asin:{
        type: String
    },
    recentPrices:[
        {
            type: Number
        }
    ],
    price:{
        type: Number,
        required: true
    }
});

const Products = mongoose.model("Products", ProductSchema);

module.exports = Products;