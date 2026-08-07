import cloudinary from "../config/cloudinary.js";

import fs from "fs";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return res.status(500).json({
        success: false,
        message: "Cloudinary credentials are not configured",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "raiji-tech/images",
    });

    // Delete local file
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    // Delete local file if upload fails
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Upload PDF

export const uploadPdf = async (req, res) => {

  console.log(req.file)
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF uploaded",
      });
    }


    const result = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "raiji-tech/pdfs",
        resource_type: "raw",
      }
    );


    // Remove temporary file
    fs.unlinkSync(req.file.path);


    res.status(200).json({
      success: true,
      message: "PDF uploaded successfully",
      pdfUrl: result.secure_url,
      publicId: result.public_id,
    });


  } catch (error) {

    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};