const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/DoAn", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const LoginSchema = mongoose.Schema({
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

const LoginModel = mongoose.model("DoAn", LoginSchema)

LoginModel.find({
    username: 'ngocthao'
})
    .then(data => {
        console.log('du lieu', data);
    })
    .catch(err => {
        console.log('err', err);
    })
