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

async function deleteUser(req: Request, res: Response) {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(204).json("User has been deleted!");
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getCurrentUser(req: Request, res: Response) {
  try {
    const currentUser = await UserModel.findById(req.params.id);
    //@ts-ignore
    const { password, ...others } = currentUser?._doc;
    res.status(200).json({ currentUser: others });
  } catch (error) {
    res.status(500).json(error);
  }
}

export default { updateUser, deleteUser, getCurrentUser };
