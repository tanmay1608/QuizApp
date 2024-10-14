import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password:{ type: String, required:true},
    address:{type :String,},
    role: {
      type: String,
       enum: ["admin", "user", "editor"], 
      default: "user",
      required:true
    },
    quizzesTaken: [
      {
        quizId: { type: String }, 
        score: { type: String },   
      },
    ],
  },
  { timestamps: true }
);




export const userModel = mongoose.model("user", userSchema);
