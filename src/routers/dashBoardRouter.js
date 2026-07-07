import express from "express"
import { getDashboardStats } from "../controller/dashBoardController.js";
import { protect } from "../middleware/authMiddleware.js";

const DashBordRoute = express.Router();



DashBordRoute.get(
  "/stats",
  protect,
  getDashboardStats
);

export default DashBordRoute;