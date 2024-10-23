import express from "express";
import cors from "cors";
import quizRoutes from "../routes/quizRoutes.js";
import userAuthRoutes from "../routes/userAuthRoutes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();
export const app = express();


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
app.use("/api/user", userAuthRoutes);
app.use("/api/quizzes", quizRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found", success: false });
});

app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err);
  res.status(500).json({
    message: "Something went wrong",
    success: false,
  });
});



