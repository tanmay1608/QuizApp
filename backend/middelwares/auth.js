import jwt from "jsonwebtoken";
import crypto from "crypto";
import { JWT_SECRET } from "../utils/constants.js";

export const authenticate = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log(token);

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
};

export const authorize = (roles) => {
  return (req, res, next) => {
    // if (!roles.includes(req.user.role)) {
    //   return res.status(403).json({ message: "Forbidden access" });
    // }
    next();
  };
};
