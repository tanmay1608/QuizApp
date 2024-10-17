import express from "express";
import { login, logout, register, userInfo, verfiyUserRole } from "../controllers/authController.js";
import { authenticate } from "../middelwares/auth.js";

const router = express.Router();

router.post("/register", register);
router.all("/register",(req,res)=>{
    return res.status(405).json({message: `Method ${req.method} not allowed on /register route`,success:false})
})

router.post("/login", login);
router.all("/login",(req,res)=>{
    return res.status(405).json({message: `Method ${req.method} not allowed on /login route`,success:false})
})

router.post("/logout", logout);
router.all("/logout",(req,res)=>{
    return res.status(405).json({message: `Method ${req.method} not allowed on /logout route`,success:false})
})

router.get("/:id",userInfo);
router.all("/:id",(req,res)=>{
    return res.status(405).json({message: `Method ${req.method} not allowed on this route`,success:false})
})
router.post("/",authenticate,verfiyUserRole);
router.all("/",(req,res)=>{
    return res.status(405).json({message: `Method ${req.method} not allowed on this route`,success:false})
})

export default router;
