const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
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
    }
})

const UserModel = mongoose.model("Account", UserSchema)
module.exports = UserModel