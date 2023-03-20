const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/DoAn")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("faild to connect");
})

const Schema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    token:{
        type:String,
        require:true
    }
})

const collection = new mongoose.model("DoAn", Schema)

module.exports = collection