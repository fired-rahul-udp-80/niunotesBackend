const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    projectName:{
        type:String,
        required:true,
        trim:true,
    }, 
    video:{
        type:String,
        

    },
})

module.exports = mongoose.model("Project", ProjectSchema);
