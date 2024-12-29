const PlacementCell = require("../models/placement/Placement");

const cloudinary = require("cloudinary").v2
const isFileTypeSupported = (type, supportedTypes) =>{
    return supportedTypes.includes(type);
}
const uploadFileToCloudinary = async(file,folder,quality)=>{
    const options = {folder};

    if(quality){
        options.quality = quality;
    }

    options.resource_type = "auto";

    const fileUploaded = await cloudinary.uploader.upload(file.tempFilePath,options);
    if(!fileUploaded){
        throw new Error("Error uploading file to cloudinary");
    }
    return fileUploaded;
}

exports.createPlacementController = async(req,res) =>{
    try{
      //  console.log("controller 1");
        // get data from req body
        const {name,email,semester,subjectName,subDes} = req.body;
        //console.log("controller 2",name,email,semester,subjectName,subDes);
        // get file form req body
        const file = req.files.notes;
        console.log(file);
        // validation
        if(!name || !email || !semester || !subjectName || !file){
            return res.status(400).json({message:"Please fill all the fields"})

        }

        // supported files
        const supportedTypes = ["pdf"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log(fileType);
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(401).json({
                success:false,
                message:"File type is not supported",
            });
        };

        // upload to cloudinary
        console.log("Image upload to cloudinary");
        const uploadResponse = await uploadFileToCloudinary(file,"NiuSemNotes",150);
        console.log(uploadResponse);

        // create entry in database
        const response = await PlacementCell.create({
            name,
            email,
            semester,
            subjectName,
            subDes,
            notes:uploadResponse.secure_url,
        });

        // response 
        return res.status(200).json({
            success:true,
            data:response,
            message:"Notes uploaded successfully",
        });

    }
    catch(error){
        console.log(error);
        res.status(402).json({
            success:false,
            message:"Error while creating Placement Cell",
        })
    
    }
}

exports.getPlacementController = async(req, res) =>{
    try{
        const response = await PlacementCell.find({});
      //  console.log("placement",response);
        if(!response){
            return res.status(200).json({
                success:true,
                data:response,
                message:"No Notes Available",
            })
        }
        res.status(200).json({
            success:true,
            data:response,
            message:"Placement Cell Data fetch Successfully",
        })
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error while fetching Placement Cell Notes",
        })
    }
}