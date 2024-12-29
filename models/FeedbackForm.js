const mongoose = require("mongoose");

const feedBackFormSchema = new mongoose.Schema({
    firstName : {
        type:String,
        required:true,
        trim:true
    },
    lastName : {
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    profileImage:{
        type:String,
         
    },
    feedback:{
        type:String,
        required:true,
    },
});

module.exports = mongoose.model("FeedbackForm", feedBackFormSchema);