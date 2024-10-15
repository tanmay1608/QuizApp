import jwt from "jsonwebtoken";
import crypto from "crypto";
import { JWT_SECRET } from "../utils/constants.js";

export const authenticate = (req, res, next) => {
  console.log("inside authen")
  try {
    const token = req.cookies.authToken;
    console.log("token",token);
    if (!token) {
      return res.status(401).json({ message: "unauthorized to access" });
    }
    
   
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
          console.log(err);
        return res.status(403).json({ message: "Invalid token" });
      }
      req.user = decoded;
      console.log("Decoded Token:", req.user);
      next();
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  
  }
};

export const authorize = (req,res,next) => {
  console.log("inside auth")
  
    if (req.user.role !=="admin") {
      return res.status(403).json({ message: "Forbidden access" });
    }
    next();
  
};
