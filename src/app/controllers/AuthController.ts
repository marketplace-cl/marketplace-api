import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

async function registerUser(req: Request, res: Response) {
  const newUser = new UserModel({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      `${process.env.SEC_KEY}`
    ).toString(),
  });

  try {
    const createdUser = await newUser.save();

    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function login(req: Request, res: Response) {
  try {
    const userFind = await UserModel.findOne({ username: req.body.username });

    if (userFind) {
      const hashedPassword = CryptoJS.AES.decrypt(
        userFind.password,
        `${process.env.SEC_KEY}`
      );
      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      if (originalPassword !== req.body.password) {
        return res
          .status(401)
          .json({ message: "Wrong credentials!", success: false });
      }

      const accessToken = jwt.sign(
        {
          id: userFind._id,
          isAdmin: userFind.isAdmin,
        },
        `${process.env.JWT_SEC_KEY}`,
        {
          expiresIn: "10h",
        }
      );
      //@ts-ignore
      const { password, ...others } = userFind._doc;
      console.log(others);
      res.status(200).json({ data: others, accessToken, success: true });
    } else {
      res.status(401).json({ message: "User not found!", success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}

export default { registerUser, login };
