// App create
const express = require("express");
const app = express();

// import env file and find port number
require("dotenv").config();
const PORT = process.env.PORT || 3000;

var cors = require("cors");
 
app.use(
    cors({
      origin: "*",
      credentials:true,
    })
  );

// middleware add karna hai baki hai .......
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// DB connection
const DB = require("./config/database").niuNotesDB();
 
// Cloudinary connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// import routes and mount
const userRoute = (require("./routes/feedbackRoute"));
app.use("/api/v2",userRoute);

// activate server
app.listen(PORT,'0.0.0.0', () =>{
    console.log(`App is running in the port no: ${PORT}`)
});

// DEFAULT ROUTER 
app.use("/",(req, res) =>{
    res.send("welcome to the default router");
})