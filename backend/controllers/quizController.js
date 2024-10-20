import { quizModel } from "../models/quizModel.js";
import { userModel } from "../models/userModel.js";
import { v4 as uuidv4 } from "uuid";

export const createQuiz = async (req, res) => {
  const { title, category, questions } = req.body;

  if (!title || !category || !Array.isArray(questions)) {
    return res.status(400).json({
      message: "Title, category, and questions are required.",
      success: true,
    });
  }

  try {
    const existingQuiz = await quizModel.findOne({ title });
    if (existingQuiz) {
      return res.status(409).json({
        success: false,
        message: "Quiz title already exists",
      });
    }

    const quiz = await quizModel.create({
      title,
      category,
      questions,
    });

    res
      .status(201)
      .json({ message: "Quiz created successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create quiz",
      success: false,
      error: error.message,
    });
  }
};

export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await quizModel.find({});
    res.status(200).json({
      message: "Quizzes fetched successfully",
      quizzes: quizzes,
      length: quizzes.length,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch quizzes",
      success: false,
      error: error.message,
    });
  }
};

export const getQuizById = async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await quizModel.findById(id);

    if (!quiz) {
      return res
        .status(404)
        .json({ message: "Quiz not found", success: false });
    }

    res.status(200).json({
      message: "Quiz fetched successfully",
      quiz: quiz,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch quiz",
      success: false,
      error: error.message,
    });
  }
};

export const deleteQuizById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const quiz = await quizModel.deleteOne({ _id: id });
    console.log("quiz",quiz);
    if (quiz.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Quiz not found", success: false });
    }

    res
      .status(200)
      .json({ message: "Quiz deleted successfuly", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete quiz",
      success: false,
      error: error.message,
    });
  }
};

export const submitQuiz = async (req, res) => {
  const { userId, quizId, score } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    user.quizzesTaken.push({
      quizId: quizId,
      score: score,
    });

    await user.save();

    const quiz = await quizModel.findById(quizId);
    if (!quiz) {
      return res
        .status(404)
        .json({ message: "Quiz not found", success: false });
    }

    quiz.takenBy.push({
      userId: userId,
    });

    await quiz.save();

    res
      .status(200)
      .json({ message: "Quiz submitted successfully", success: true });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({
      message: "Failed to submit quiz",
      success: false,
      error: error.message,
    });
  }
};

export const getLeaderboard = async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await quizModel.findById(id);
    if (!quiz)
      return res.status(404).json({ message: "Quiz not found", success: true });

    console.log(quiz.category);

    const leaderboard = quiz.takenBy.map(async (user) => {
      const existingUser = await getUser(user.userId);

      if (existingUser) {
        const quizInfo = existingUser.quizzesTaken.find(
          (quiz) => quiz.quizId === id
        );
        return {
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          score: quizInfo?.score ? quizInfo?.score : 0,
        };
      }
    });
    const leaderScore = (await Promise.all(leaderboard)).filter((el) => {
      return el !== undefined;
    });

    const sortedLeaderboard = leaderScore.sort((a, b) => b.score - a.score);

    res.status(200).json({
      message: "Leaderboard fetched successfully",
      leaderboard: sortedLeaderboard,
      length: sortedLeaderboard.length,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch leaderboard",
      success: true,
      error: error.message,
    });
  }
};

const getUser = async (id) => {
  const existingUser = await userModel.findById(id);
  console.log(existingUser);
  return existingUser;
};
