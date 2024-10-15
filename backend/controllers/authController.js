import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "../utils/constants.js";
import { userModel } from "../models/userModel.js";
import { quizModel } from "../models/quizModel.js";
import { v4 as uuidv4 } from "uuid";

export const register = async (req, res) => {
  const { email, password, address, name } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const userCount = await userModel.countDocuments();
    const role = userCount === 0 ? "admin" : "user";

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      email,
      password: hashedPassword,
      address,
      role,
      name,
    });

    res.status(200).json({ message: "User created successfully", user: user });
  } catch (error) {
    //console.error("user registration Error:", error);
    res.status(500).json({ message: "registration failed", error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("inside login");
  try {
    const user = await userModel.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "2h",
    });

    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.status(200).json({
      id: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
      quizzesTaken: user.quizzesTaken,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

export const logout = async (req, res) => {
  console.log("inside logout");
  try {
    res.clearCookie("authToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const userInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) return res.status(400).json({ message: "User not found" });

    const promiseArray = user.quizzesTaken.map(async (quiz) => {
      const quizData = await quizModel.findById(quiz.quizId);
      if (!quizData) return null;

      const { title, category, _id } = quizData;
      console.log("skakl");
      return {
        id: uuidv4(),
        score: quiz.score,
        quiz: {
          id: _id,
          title,
          category,
        },
      };
    });
    console.log(promiseArray);
    const quizzesTaken = await Promise.all(promiseArray);

  
    const updatedQuizzes = quizzesTaken.filter((quiz) => quiz !== null);
    const updatedUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      address: user.address,
      role: user.role,
      quizzesTaken: updatedQuizzes, 
    };
    res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch user", error });
  }
};
