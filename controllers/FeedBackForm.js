const FeedbackForm = require("../models/FeedbackForm");
const cloudinary = require("cloudinary").v2;
const Project = require("../models/ProjectForm");
 
const isFileTypeSupported = (type, supportedTypes) =>{
    return supportedTypes.includes(type);
}

const uploadFileToCloudinary = async(file,folder,quality)=>{
    const options = {folder};

    if(quality){
        options.quality = quality;
    }

    options.resource_type = "auto";

    const fileUploaded =  await cloudinary.uploader.upload(file.tempFilePath,options);
    if(!fileUploaded){
        throw new Error("Error uploading file to cloudinary");
    }
    return fileUploaded;
}

exports.createFeedbackForm = async(req, res) =>{
    try{
        // get form data from req body
        const {firstName, lastName, email, feedback} = req.body;
        console.log("controller1",firstName,lastName,email,feedback);
        // get file from req body
        const file = req.files?.profileImage || null;

        // validation
        if(!firstName || !lastName || !email || !feedback){
            return res.status(400).json({success:false,message:"All field is necessary"});
        }

        const existingUser = await FeedbackForm.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists",
            })
        }

        let uploadResponse = null;
        if(file){
            const supportedTypes = ["jpg","jpeg","png"];
            const fileType = file.name.split(".")[1].toLowerCase();
            console.log(fileType);
            if(!isFileTypeSupported(fileType,supportedTypes)){
                return res.status(401).json({
                    success:false,
                    message:"File type is not supported",
                });
            }
            // get file format supported
            console.log("Image upload to cloudinary");
            uploadResponse = await uploadFileToCloudinary(file,"NiuNotes",90);
            console.log(uploadResponse);
        }
        // create entry in Database
        const response = await FeedbackForm.create({
            firstName,
            lastName,
            email,
            feedback,
            profileImage:uploadResponse ? uploadResponse.secure_url : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}?${lastName}`,
        });
        // response 
        res.status(200).json({
            success:true,
            data:response,
            message:"Feedback data inserted Successfully",
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error creating feedback form",
        });
    }
};

exports.getAllFeedbackForm = async(req, res) =>{
    try{
        const response = await FeedbackForm.find({});

        if(!response){
            res.status(400).json({
                success:false,
                message:"No feedback form found",
            })
        }

        res.status(200).json({
            success:true,
            data:response,
            message:"feedback data fetch successfully",

        })
    }
    catch(error){
        console.log(error);
        res.status(402).json({
            success:false,
            message:"Error fetching feedback form",
        })
    }
}



exports.createProject = async(req, res) =>{
    try{
        // get form data from req body
        let {projectName} = req.body;

        console.log("controller1 execute",projectName);
        // get file from req body
        let file = req.files?.video || null;
        console.log("controller2 execute",file);

        
        // validation
        if(!projectName){
            return res.status(400).json({success:false,message:"Project name is necessary"});
        }
        let uploadvideo = null;
        if(file){
            // get file format supported
            console.log("Video upload to cloudinary");
            uploadvideo = await uploadFileToCloudinary(file,"NiuNotes",90);
            console.log(uploadvideo);
        }
            // create entry in Database
            let response = await Project.create({
                projectName,
                video:uploadvideo ? uploadvideo.secure_url:null,
            });
            // response 
            res.status(200).json({
                success:true,
                data:response,
                message:"Project inserted Successfully",
            });
                
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error creating project",
        })
    }
}

exports.getAllProject = async(req, res) =>{
    try{
        let response = await Project.find({});

        if(!response){
            res.status(400).json({
                success:false,
                data:response,
                message:"No Project found",
            })
        }

        res.status("200").json({
            success:true,
            data:response,
            message:"project fetch successfully",

        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error While fetching Project",
        })
    }
}