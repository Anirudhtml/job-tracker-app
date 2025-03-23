import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: 'dfhbsitpd', 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const uploadOnCloud = async (localFilePath) => {
    try {
        if(!localFilePath) {
            return null
        }
        const uploadResult = await cloudinary.uploader
           .upload(
               localFilePath,
               {
                resource_type: "auto"
               }
           )
           .catch((error) => {
               console.log(error);
           });
        
        return uploadResult
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}

export default uploadOnCloud