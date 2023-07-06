import { Request, Response } from "express";
import dotenv from "dotenv";
import CryptoJS from "crypto-js";
import { UserModel } from "../models/UserModel";

dotenv.config();

async function updateUser(req: Request, res: Response) {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      `${process.env.SEC_KEY}`
    ).toString();
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    return res.status(201).json({ updatedUser });
  } catch (error) {
    return res.status(500).json(error);
  }
}

export default { updateUser };
