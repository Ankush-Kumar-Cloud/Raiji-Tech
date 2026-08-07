import express from "express"
import {protect} from "../middleware/authMiddleware.js"

const adminRout = express.Router();

import { getAdminPosts } from "../controller/adminController.js";


adminRout.get("/post", protect, getAdminPosts);

export default adminRout;