import express from "express";
import quizzes from "./MOCK_DATA.json" assert { type: "json" };
import { quizModel } from "./models/quizModel.js";
import cors from "cors";
import quizRoutes from "../backend/routes/quizRoutes.js"
import userAuthRoutes from "../backend/routes/userAuthRoutes.js"
import cookieParser from "cookie-parser"
import mongoose from "mongoose";
const app = express();
const PORT = 8157;

app.use(cors());
app.use(express.json());
app.use(cookieParser);
app.use("/api/user/",userAuthRoutes);
app.use("/api/quizzes",quizRoutes);



mongoose
  .connect("mongodb://127.0.0.1:27017/quiz-app")
  .then(() => console.log("mongoDb connected"))
  .catch((err) => console.log("mongo err:", err));

app.listen(PORT, () => console.log(`Server Started at POST: ${PORT}`));
