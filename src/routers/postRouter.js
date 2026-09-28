import express from "express"
import { createPosts, deletePost, getFeaturedPosts, getPosts, getSinglePost, toggleFeaturedPost, updatePost } from "../controller/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const postRouter = express.Router();

postRouter.post("/", protect, createPosts);

postRouter.get("/", getPosts);

postRouter.get("/:slug", getSinglePost);


postRouter.put("/:id",protect, updatePost);

postRouter.delete("/:id",protect, deletePost);

postRouter.patch("/posts/:id/featured",  protect,  toggleFeaturedPost);

postRouter.get("/featured", getFeaturedPosts);


export default postRouter;