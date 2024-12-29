const FirstSem = require("../models/FirstSem");
const SecondSem = require("../models/SecondSem");
const ThirdSem = require("../models/thirdSem");
const FourthSem = require("../models/FourthSem");
const FifthSem = require("../models/FifthSem");
const SixthSem = require("../models/SixthSem");
const SeventhSem = require("../models/SevenSem");
const EighthSem = require("../models/EightSem");
 
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

exports.createFirstSemController = async(req,res) =>{
    try{
      //  console.log("controller 1");
        // get data from req body
        const {name,email,semester,subjectName,subDes} = req.body;
     //   console.log("controller 2",name,email,semester,subjectName,subDes);
        // get file form req body
        const file = req.files.notes;
        console.log(file);
        // validation
        if(!name || !email || !semester || !subjectName || !file){
            return res.status(400).json({message:"Please fill all the fields"})

        }

        // supported files
        const supportedTypes = ["pdf", "txt"];
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
        const response = await FirstSem.create({
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
            message:"Error while creating First Sem Notes",
        })
    
    }
}

exports.getFirstSemController = async(req, res) =>{
    try{
        const response = await FirstSem.find({});
      //  console.log("third",response);
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
            message:"First Sem Data fetch Successfully",
        })
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error while fetching First Sem Notes",
        })
    }
}

exports.createSecondSemController = async(req,res) =>{
    try{
       // console.log("controller 1");
        // get data from req body
        const {name,email,semester,subjectName,subDes} = req.body;
        console.log("controller 2",name,email,semester,subjectName,subDes);
        // get file form req body
        const file = req.files.notes;
        console.log(file);
        // validation
        if(!name || !email || !semester || !subjectName || !file){
            return res.status(400).json({message:"Please fill all the fields"})

        }

        // supported files
        const supportedTypes = ["pdf", "txt"];
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
        const response = await SecondSem.create({
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
            message:"Error while creating second sem notes",
        })
    
    }
}

exports.getSecondSemController = async(req, res) =>{
    try{
        const response = await SecondSem.find({});
      //  console.log("third",response);
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
            message:"Second Sem Data fetch Successfully",
        })
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error while fetching Second sem Notes",
        })
    }
}

exports.createThirdSemController = async(req,res) =>{
    try{
       // console.log("controller 1");
        // get data from req body
        const {name,email,semester,subjectName,subDes} = req.body;
       // console.log("controller 2",name,email,semester,subjectName,subDes);
        // get file form req body
        const file = req.files.notes;
        console.log(file);
        // validation
        if(!name || !email || !semester || !subjectName || !file){
            return res.status(400).json({message:"Please fill all the fields"})

        }

        // supported files
        const supportedTypes = ["pdf", "txt"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log(fileType);
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(401).json({
                success:false,
                message:"File type is not supported",
            });
        };

        // upload to cloudinary
       // console.log("Image upload to cloudinary");
        const uploadResponse = await uploadFileToCloudinary(file,"NiuSemNotes",150);
        console.log(uploadResponse);

        // create entry in database
        const response = await ThirdSem.create({
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
            message:"Error while creating third sem data",
        })
    
    }
}
exports.getThirdSemController = async(req, res) =>{
    try{
        const response = await ThirdSem.find({});
      //  console.log("third",response);
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
            message:"Third Sem Data fetch Successfully",
        })
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error while fetching third sem data",
        })
    }
}
exports.deleteThirdSemController = async(req, res) =>{
    try{
        // get subjectId from req params
        const {subjectId} = req.params.id;
       // console.log(subjectId);
        // find subjectId in database
        const subId = await ThirdSem.findById(subjectId);
        console.log("subId",subId);
        const imageId = subId.notes;
        console.log(imageId);
        await cloudinary.uploader.destroy(imageId);
        console.log("delete to clodu");
        // delete  from database
        await ThirdSem.findByIdAndDelete({_id:subjectId});
        res.status(200).json({
            success:true,
            message:"Third Sem Data deleted Successfully",
        })

    

    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error while deleting third sem data",
        })
    }
}
exports.createFourthSemController = async(req,res) =>{
    try{
        // get data from req body
        const {name,email,semester,subjectName,subDes} = req.body;

        // get file form req body
        const file = req.files.notes;

        // validation
        if(!name || !email || !semester || !subjectName || !file){
            return res.status(400).json({message:"Please fill all the fields"})

        }

        // supported files
        const supportedTypes = ["pdf", "txt"];
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
        const response = await FourthSem.create({
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
            message:"Error while creating fourth sem data",
        })
    }
}
exports.getFourthSemController = async(req, res) =>{
    try{
        const response = await FourthSem.find({});
       // console.log("fourth",response);
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
            message:"Fourth Sem Data fetch Successfully",
        })
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error while fetching Fourth sem data",
        })
    }
}

exports.createFifthSemController = async(req,res) =>{
    try{
        // get data from req body
        const {name,email,semester,subjectName,subDes} = req.body;

        // get file form req body
        const file = req.files.notes;

        // validation
        if(!name || !email || !semester || !subjectName || !file){
            return res.status(400).json({message:"Please fill all the fields"})

        }

        // supported files
        const supportedTypes = ["pdf", "txt"];
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
        const response = await FifthSem.create({
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
            message:"Error while creating Fifth sem data",
        })
    }
}
exports.getFifthSemController = async(req, res) =>{
    try{
        const response = await FifthSem.find({});
        //console.log("fifth",response);
        if(!response){
            return res.status(200).json({
                success:true,
                data:response,
                message:"No Notes Available",
            })
        }
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
            message:"Fifth Sem Data fetch Successfully",
        })
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error while fetching Fifth sem data",
        })
    }
}

exports.createSixthSemController = async(req,res) =>{
    try{
        // get data from req body
        const {name,email,semester,subjectName,subDes} = req.body;

        // get file form req body
        const file = req.files.notes;

        // validation
        if(!name || !email || !semester || !subjectName || !file){
            return res.status(400).json({message:"Please fill all the fields"})

        }

        // supported files
        const supportedTypes = ["pdf", "txt"];
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
        const response = await SixthSem.create({
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
            message:"Error while creating sixth sem data",
        })
    }
}
exports.getSixthSemController = async(req, res) =>{
    try{
        const response = await SixthSem.find({});
        console.log("sixth",response);
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
            message:"Sixth Sem Data fetch Successfully",
        })
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error while fetching Sixth sem data",
        })
    }
}

exports.createSeventhSemController = async(req,res) =>{
    try{
        // get data from req body
        const {name,email,semester,subjectName,subDes} = req.body;

        // get file form req body
        const file = req.files.notes;

        // validation
        if(!name || !email || !semester || !subjectName || !file){
            return res.status(400).json({message:"Please fill all the fields"})

        }

        // supported files
        const supportedTypes = ["pdf", "txt"];
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
        const response = await SeventhSem.create({
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
            message:"Error while creating seven sem data",
        })
    }
}
exports.getSeventhSemController = async(req, res) =>{
    try{
        const response = await SeventhSem.find({});
        // console.log("seventh",response);
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
            message:"Seventh Sem Data fetch Successfully",
        })
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error while fetching Seventh sem data",
        })
    }
}

exports.createEighthSemController = async(req,res) =>{
    try{
        // get data from req body
        const {name,email,semester,subjectName,subDes} = req.body;

        // get file form req body
        const file = req.files.notes;

        // validation
        if(!name || !email || !semester || !subjectName || !file){
            return res.status(400).json({message:"Please fill all the fields"})

        }

        // supported files
        const supportedTypes = ["pdf", "txt"];
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
        const response = await EighthSem.create({
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
            message:"Error while creating eigth sem data",
        })
    }
}
exports.getEighthSemController = async(req, res) =>{
    try{
        const response = await EighthSem.find({});
        console.log("Eighth",response);
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
            message:"Eighth Sem Data fetch Successfully",
        })
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error while fetching Eighth sem data",
        })
    }
}




