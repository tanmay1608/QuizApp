import express from "express";
import { authenticate, authorize } from "../middelwares/auth.js";
import { createQuiz, deleteQuizById, getAllQuizzes, getQuizById } from "../controllers/quizController.js";

const router=express.Router();

router.post("/",createQuiz);
router.get("/",getAllQuizzes);
router.get("/:id", getQuizById);
router.delete("/:id",deleteQuizById);

export default router;