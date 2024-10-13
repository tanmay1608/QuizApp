import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const accountSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password:{ type: String, required:true},
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required:true
    },
  },
  { timestamps: true }
);

accountSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    this.password =await bcrypt.hash(this.password,10);
    next();
})


export const accountModel = mongoose.model("account", accountSchema);
