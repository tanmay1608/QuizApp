import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOption: { type: String, required: true },
});

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    questions: [questionSchema],  
    takenBy: [
      {
        userId: { type: String }, 
      },
    ],  
  },
  { timestamps: true }
);

export const quizModel = mongoose.model("quiz", quizSchema);
