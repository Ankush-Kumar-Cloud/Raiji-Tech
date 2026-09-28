import express from "express"
import {protect} from "../middleware/authMiddleware.js"
import { deleteAdminPost, getAdminPosts, updatePostStatus } from "../controller/adminController.js";



const adminRout = express.Router();



adminRout.get("/post", protect, getAdminPosts);

adminRout.delete("/posts/:id",protect, deleteAdminPost);
adminRout.patch("/posts/:id/status", protect, updatePostStatus);






export default adminRout;