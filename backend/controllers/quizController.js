import { quizModel } from "../models/quizModel.js";
import { userModel } from "../models/userModel.js";
import { v4 as uuidv4 } from 'uuid';

export const createQuiz = async (req, res) => {
  const { title, category, questions } = req.body;
  console.log(title, category, questions);

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
    res.status(500).json({ message: "Failed to create quiz" });
  }
};

export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await quizModel.find({});
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

export const deleteQuizById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const quiz = await quizModel.deleteOne({ _id: id });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({ message: "Quiz deleted successfuly" });
  } catch (e) {
    res.status(500).json({ message: "Failed to delete quiz", e });
  }
};

export const submitQuiz = async (req, res) => {
  const { userId, quizId, score } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.quizzesTaken.push({
      quizId: quizId,
      score: score,
    });

    await user.save();

    const quiz = await quizModel.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    quiz.takenBy.push({
      userId: userId,
    });

    await quiz.save();

    res.status(200).json({ message: "Quiz submitted successfully" });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({ message: "Failed to submit quiz" });
  }
};

export const getLeaderboard = async (req, res) => {
  const {id} = req.params;

  try {
  
   const quiz=await quizModel.findById(id);
   if(!quiz) return res.status(404).json({ message: "Quiz not found" });
  
    
    
    const leaderboard =  quiz.takenBy.map(async (user) => {
        const existingUser=await getUser(user.userId);
        
        
      if(existingUser){
        const quizInfo= existingUser.quizzesTaken.find((quiz)=> quiz.quizId === id);
        return {
          id:uuidv4(),
          name:existingUser.name,
          email:existingUser.email,
          score:quizInfo?.score ? quizInfo?.score : 0
        }
      }

    })
    const leaderScore=(await Promise.all(leaderboard)).filter((el)=> {
      return el!== undefined;
    });

     const sortedLeaderboard = leaderScore.sort((a, b) => b.score - a.score);

    res.status(200).json(sortedLeaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
};

const getUser=async (id)=>{
  const existingUser=await userModel.findById(id);
  console.log(existingUser);
  return existingUser;
}
