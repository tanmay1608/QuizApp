import express from "express";
import cors from "cors";
import quizRoutes from "../backend/routes/quizRoutes.js";
import userAuthRoutes from "../backend/routes/userAuthRoutes.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 8000;

app.use(
  cors({
    origin: function (origin, callback) {
      callback(null, origin);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/user/", userAuthRoutes);
app.use("/api/quizzes", quizRoutes);
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});


const connectDBAndStartServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongoDb connected");
    app.listen(process.env.PORT || 8000, () =>
      console.log(`Server Started at POST: ${PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
};

connectDBAndStartServer();
