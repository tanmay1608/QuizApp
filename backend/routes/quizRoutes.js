import express from "express";
import { authenticate, authorize } from "../middelwares/auth.js";
import { createQuiz, deleteQuizById, getAllQuizzes, getLeaderboard, getQuizById, submitQuiz } from "../controllers/quizController.js";

const router=express.Router();

router.post("/",authenticate,authorize,createQuiz);
router.get("/",getAllQuizzes);
router.all("/",(req,res)=>{
    return res.status(405).json({message: `Method ${req.method} not allowed on this route`,success:false})
})

router.post('/submit', submitQuiz);
router.all("/submit",(req,res)=>{
    return res.status(405).json({message: `Method ${req.method} not allowed on /submit route`,success:false})
})



router.get("/:id", getQuizById);
router.delete("/:id",authenticate,authorize,deleteQuizById);
router.all("/:id",(req,res)=>{
    return res.status(405).json({message: `Method ${req.method} not allowed on this route`,success:false})
})


router.get("/:id/leaderboard",getLeaderboard);
router.all("/:id/leaderboard",(req,res)=>{
    return res.status(405).json({message: `Method ${req.method} not allowed on this route`,success:false})
})

router.get("/category")

export default router;