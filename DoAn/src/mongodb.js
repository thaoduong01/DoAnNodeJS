const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/DoAn")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log("faild to connect");
    })

const LoginSchema = mongoose.Schema({
    fullname: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    token: {
        type: String,
        require: true
    }
})

const LoginModel = mongoose.model("Account", LoginSchema)

// LoginModel.find({
//     username: 'ngocthao'
// })
//     .then(data => {
//         console.log('du lieu', data);
//     })
//     .catch(err => {
//         console.log('err', err);
//     })

module.exports = LoginModel

const ProductSchema = mongoose.Schema({
    name: {
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
    }
})

const ProductModel = mongoose.model("Product", ProductSchema)

ProductModel.find({
})
    .then(data => {
        console.log('du lieu', data);
    })
    .catch(err => {
        console.log('err', err);
    })