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
    itemId:{
        type: Number
    },
    image:{
        type: String,
        required: true
    },
    recentPrices:[
        {
            type: Number
        }
    ],
    recentAmazonPrices:[
        {
            type: Number
        }
    ],
    recentBestbuyPrices:[
        {
            type: Number
        }
    ],
    price:{
        type: Number,
        required: true
    },
    amazonPrice:{
        type: Number
    },
    bestbuyPrice:{
        type: Number
    }
});

const Products = mongoose.model("Products", ProductSchema);

module.exports = Products;