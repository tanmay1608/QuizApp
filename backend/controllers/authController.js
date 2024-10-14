
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "../utils/constants.js";
import { userModel } from "../models/userModel.js";



export const register = async (req, res) => {
    const { email, password, address,name } = req.body;

    try {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exists" });
      
      const hasedPasword=await bcrypt.hash(password,10);
      const user =await  userModel.create({ email, password:hasedPasword, address,name });
    
      res.status(200).json({ message: "User created successfully",user:newUser });
    } catch (error) {
        //console.error("user registration Error:", error);
      res.status(500).json({ message: "registration failed", error });
    }
  };


  
export const login = async (req, res) => {
  const { email, password } = req.body;
    console.log("inside login")
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

    res.cookie("token",token,{httpOnly:true,maxAge:1000*60*60*24})
    res.status(200).json({id:user._id,role:user.role,name:user.name,email:user.email});
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

