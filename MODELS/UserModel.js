const mongoose = require('mongoose')

const UserSchema =new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profileImg:{
        type:String,
        require:true,
        default:""
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
module.exports =mongoose.model("users",UserSchema);

