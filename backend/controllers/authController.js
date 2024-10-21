import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "../utils/constants.js";
import { userModel } from "../models/userModel.js";
import { quizModel } from "../models/quizModel.js";
import { v4 as uuidv4 } from "uuid";

export const register = async (req, res) => {
  const { email, password, address, name } = req.body;
  if (!email || !password || !address || !name) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "User already exists", success: false });

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

    res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "registration failed",
      success: false,
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("inside login");
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }
  try {
    const user = await userModel.findOne({ email });
    console.log(user);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
    });

    const userInfo = {
      id: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
      quizzesTaken: user.quizzesTaken,
    };

    res
      .status(200)
      .json({ message: "Login successful", user: userInfo, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Login failed", success: false, error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("authToken");
    res.status(200).json({ message: "Logged out successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Logout failed. Please try again.",
      error: error.message,
      success: false,
    });
  }
};

export const userInfo = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  try {
    const user = await userModel.findById(id);
    console.log(user);
    if (!user)
      return res.status(400).json({ message: "User not found", success: true });

    const promiseArray = user.quizzesTaken.map(async (quiz) => {
      const quizData = await quizModel.findById(quiz.quizId);
      console.log("data", quizData);
      if (!quizData) return null;

      const { title, category, _id } = quizData;

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

    const quizzesTaken = await Promise.all(promiseArray);

    const updatedQuizzes = quizzesTaken.filter((quiz) => quiz !== null);
    const updatedUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
      quizzesTaken: updatedQuizzes,
    };
    res.status(200).json({
      success: true,
      message: "User information fetched successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch user",
      success: false,
      error: error.message,
    });
  }
};

export const verifyUserRole = async (req, res) => {
  const { role } = req.body;
  console.log("role", role);
  if (!role)
    return res
      .status(400)
      .json({ message: "role is not defined", success: false });
  const user = req.user;

  try {
    if (req.user.role === req.body.role) {
      return res
        .status(200)
        .json({ message: "user verfied", isVerfied: true, success: true });
    } else {
      res.clearCookie("authToken");
      return res.status(401).json({
        message: "user is not verfied",
        isVerfied: false,
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
};
