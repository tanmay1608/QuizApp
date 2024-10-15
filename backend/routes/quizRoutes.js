import express from "express";
import { authenticate, authorize } from "../middelwares/auth.js";
import { createQuiz, deleteQuizById, getAllQuizzes, getLeaderboard, getQuizById, submitQuiz } from "../controllers/quizController.js";

const router=express.Router();

router.post("/",authenticate,authorize,createQuiz);
router.post('/submit', submitQuiz);
router.get("/",getAllQuizzes);
router.get("/:id", getQuizById);
router.delete("/:id",authenticate,authorize,deleteQuizById);
router.get("/:id/leaderboard",getLeaderboard);

export default router;