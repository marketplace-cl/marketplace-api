import mongoose from "mongoose";

interface IUserSchema {
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}
const userSchema = new mongoose.Schema<IUserSchema>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("UserSchema", userSchema);
