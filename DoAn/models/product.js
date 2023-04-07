const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
})

const ProductModel = mongoose.model("Product", ProductSchema)
module.exports = ProductModel