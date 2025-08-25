import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "dmwrgittv",
  api_key: "985488599195596",
  api_secret: "xJl9M9ZGeCt-W87XKe-Gvi1hCn8",
});

const uploadToCloudinary = async (localFilePath, folder = "uploads") => {
  try {
    if (!localFilePath) return null;
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //console.log(result);
    if (fs.existsSync(localFilePath)) {
      //console.log("34");
      fs.unlinkSync(localFilePath);
    }
    //console.log("done");
    return result;
  } catch (error) {
    //console.log(5);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

export default uploadToCloudinary;
