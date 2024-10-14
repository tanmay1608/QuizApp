import {quizModel} from "../models/quizModel.js";

export const createQuiz = async (req, res) => {
  const { title, category, questions } = req.body;
  console.log(title, category,questions);

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

  console.log("get all quizzes");
  try {
    const quizzes = await quizModel.find({});
    console.log("inside",quizzes)
    res.status(200).json(quizzes);
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

  export const deleteQuizById =async(req,res)=>{
    const {id}=req.params;
    console.log(id);
    try{
      const quiz=await quizModel.deleteOne({_id:id});
      console.log(quiz);

      res.status(200).json({message:"Quiz deleted successfuly"});
    }
    catch(e){
      res.status(500).json({ message: "Failed to delete quiz", e }); 
    }
  }