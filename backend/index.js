import express from "express";
import cors from "cors";
import quizRoutes from "../backend/routes/quizRoutes.js";
import userAuthRoutes from "../backend/routes/userAuthRoutes.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const app = express();
let server;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userAuthRoutes);
app.use("/api/quizzes", quizRoutes);



export const connectDBAndStartServer = async () => {
  console.log("Attempting to connect to the database and start the server...");
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongoDb connected");
    server = app.listen(process.env.PORT || 8000, () =>
      console.log(`Server Started at PORT: ${process.env.PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
};

connectDBAndStartServer();
