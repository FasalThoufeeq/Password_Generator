import mongoose, { Schema, model } from "mongoose";

const PasswordSchema = new Schema(
  {
    password: {
      type: String,
      trim: true,
    },
    length: {
      type: Number,
    },
  },
  { timestamps: true }
);
const Passwords = model("Passwords", PasswordSchema);
export default Passwords;
