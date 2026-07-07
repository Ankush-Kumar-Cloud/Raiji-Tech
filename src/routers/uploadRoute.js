import express from "express"
import { uploadImage } from "../controller/uploadController.js";

const uploadRoute = express.Router();

import {upload }from "../middleware/multer.js";
import { protect } from "../middleware/authMiddleware.js";






uploadRoute.post(
  "/image",
  protect,
  upload.single("image"),
  uploadImage
);

export default uploadRoute;