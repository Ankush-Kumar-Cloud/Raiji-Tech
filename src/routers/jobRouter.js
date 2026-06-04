import express from "express";
import { createJob, getJob } from "../controller/jobController.js";
import { protect } from "../middleware/authMiddleware.js";

const jobRouter = express.Router();

jobRouter.post("/createJobs", protect, createJob);

jobRouter.get("/", getJob)

export default  jobRouter;