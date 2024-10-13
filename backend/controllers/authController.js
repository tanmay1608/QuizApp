
import { accountModel } from "../models/accountModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "../utils/constants.js";



export const signup = async (req, res) => {
    const { email, password, role,name } = req.body;

    //console.log(req);
  
    try {
      const existingUser = await accountModel.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exists" });
  
      const newUser =await  accountModel.create({ email, password, role,name });
      console.log("New User:", newUser);
      res.status(201).json({ message: "User created successfully",user:newUser });
    } catch (error) {
        console.error("Signup Error:", error);
      res.status(500).json({ message: "Signup failed", error });
    }
  };




export const login = async (req, res) => {
  const { email, password } = req.body;
    console.log("inside login")
  try {
    const user = await accountModel.findOne({ email });
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

    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};
