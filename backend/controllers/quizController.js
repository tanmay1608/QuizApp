import {quizModel} from "../models/quizModel.js";

export const createQuiz = async (req, res) => {
  const { title, category, questions } = req.body;

  if (!title || !category || !Array.isArray(questions)) {
    return res
      .status(400)
      .json({ message: "Title, category, and questions are required." });
  }

  try {
    const quiz = await quizModel.create({
      title,
      category,
      questions,
    });
    res.status(201).json({ msg: "success" });
  } catch (e) {
    res.status(500).json({message:"Failed to create quiz"})
  }
};

export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await quizModel.find({});
    console.log("inside",quizzes)
    res.json(quizzes);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch quizzes", e });
  }
};

export const getQuizById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const quiz = await quizModel.findById(id);
  
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" }); 
      }
  
      res.json(quiz); 
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quiz", error }); 
    }
  };
