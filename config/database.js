const mongoose = require("mongoose");
require("dotenv").config();
exports.niuNotesDB = () =>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then( ()=> console.log("DB Connection Successfully"))
    .catch( (error) =>{
        console.log("DB Connection Failed");
        console.error(error.message);
        process.exit(1);
    });
};

 