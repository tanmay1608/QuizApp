import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password:{ type: String, required:true},
    address:{type :String,},
    role: {
      type: String,
      default: "user",
      required:true
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})


export const userModel = mongoose.model("user", userSchema);
