import express from "express"
import { createPosts, deletePost, getPosts, getSinglePost, updatePost } from "../controller/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const postRouter = express.Router();

postRouter.post("/", protect, createPosts);

postRouter.get("/", getPosts);

postRouter.get("/:slug", getSinglePost);


postRouter.put("/:id",protect, updatePost);

postRouter.delete("/:id",protect, deletePost);


export default postRouter;