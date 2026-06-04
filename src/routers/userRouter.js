import express from "express"
import { register, login } from "../controller/authController.js";

const userRouter = express.Router();

userRouter.post("/register",  register)

userRouter.get("/login", login)

export default userRouter;