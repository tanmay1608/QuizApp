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
  },
  { timestamps: true }
);

export const quizModel = mongoose.model("quiz", quizSchema);
