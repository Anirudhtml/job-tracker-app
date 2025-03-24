import {v2 as cloudinary} from "cloudinary"
import dotenv from "dotenv"
import fs from "fs"

dotenv.config()

cloudinary.config({ 
    cloud_name: 'dfhbsitpd', 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const uploadOnCloud = async (localFilePath) => {
  try {
      if (!localFilePath) {
          console.log("❌ No file path provided");
          return null;
      }
      
      console.log("📤 Attempting to upload:", localFilePath);
      
      const uploadResult = await cloudinary.uploader.upload(
          localFilePath,
          { resource_type: "auto" }
      );

      console.log("✅ Upload successful:", uploadResult);
      
      // Delete local file after successful upload
      if (fs.existsSync(localFilePath)) {
          fs.unlinkSync(localFilePath);
      }
      
      return uploadResult;
  } catch (error) {
      console.error("❌ Error in uploadOnCloud:", error);
      
      // Cleanup if the upload fails
      if (localFilePath && fs.existsSync(localFilePath)) {
          fs.unlinkSync(localFilePath);
      }
      
      return null;
  }
};


export default uploadOnCloud