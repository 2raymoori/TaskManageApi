const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    dateCreated:{
        type:Date,
        default:Date.now
    },
    priority:{
        type:Number,
        required:true
    },
    state:{
        type:Boolean,
        requied:true
    },
    status:{
        type:Number,
        required:true
    },
    dateDue:{
        type:Date,
        required:true
    }
});
module.exports = mongoose.model("tasks",taskSchema);

