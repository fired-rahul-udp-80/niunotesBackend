const mongoose = require("mongoose");

const createEigthSemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    semester:{
        type:String,
        required:true,
    },
    subjectName:{
        type:String,
        required:true,
    },
    notes:{
        type:String,
        required:true,
    },
    subDes:{
        type:String, 
        
    },
    createdAt:{
        type:Date,
        default : Date.now(),
    }

});

module.exports = mongoose.model("EighthSem",createEigthSemSchema);