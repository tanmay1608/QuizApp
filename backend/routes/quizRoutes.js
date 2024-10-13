import express from "express";
import { authenticate, authorize } from "../middelwares/auth.js";
import { createQuiz, getAllQuizzes, getQuizById } from "../controllers/quizController.js";

const router=express.Router();

router.post("/",authenticate,authorize(["admin"]),createQuiz);
router.get("/",getAllQuizzes);
router.get("/:id", getQuizById);

export default router;