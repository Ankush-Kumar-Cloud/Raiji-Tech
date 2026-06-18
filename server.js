import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import jobRouter from "./src/routers/jobRouter.js";
import userRouter from "./src/routers/userRouter.js"
import categoryRouter from "./src/routers/categoryRouter.js"
import postRouter from "./src/routers/postRouter.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running successfully");
});

app.use("/api/jobs", jobRouter);

app.use("/api/auth", userRouter);

app.use("/api/categories", categoryRouter)

app.use("/api/posts", postRouter)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
