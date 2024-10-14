import { quizModel } from "../models/quizModel.js";
import { userModel } from "../models/userModel.js";

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
  const { quizId } = req.params;

  try {
    const users = await userModel.find({});
    const filteredUsers = users.filter(user => {
      if(user.role === "admin") return false;
      const arr=user.quizzesTaken.filter(entry => entry.quizId === quizId);
      return arr;
    });
    
    const leaderboard = filteredUsers.map((user) => {
      const quizScoreEntry = user.quizzesTaken.find(
        (entry) => entry.quizId === quizId
      );
      return {
        name: user.name,
        score: quizScoreEntry ? quizScoreEntry.score : 0,
      };
    });

    const sortedLeaderboard = leaderboard.sort((a, b) => b.score - a.score);

    res.status(200).json(sortedLeaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
};
