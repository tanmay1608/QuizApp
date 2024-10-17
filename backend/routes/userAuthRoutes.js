import express from "express";
import { login, logout, register, userInfo, verfiyUserRole } from "../controllers/authController.js";
import { authenticate } from "../middelwares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/:id",userInfo);
router.post("/",authenticate,verfiyUserRole);

export default router;
