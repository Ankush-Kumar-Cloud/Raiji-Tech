import express from "express"
import { createCategory, getCategory } from "../controller/categoryController.js"
import { protect } from "../middleware/authMiddleware.js"
const categoryRouter = express.Router()

categoryRouter.post("/", protect, createCategory);

categoryRouter.get("/", getCategory);

export default categoryRouter;