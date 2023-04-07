const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
    productname: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    detail: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    }
})

const ProductModel = mongoose.model("Product", ProductSchema)
module.exports = ProductModel