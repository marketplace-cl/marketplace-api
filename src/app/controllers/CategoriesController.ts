import { Request, Response } from "express";
import { CategoryModel } from "../models/CategoryModel";

async function getAllCategories(req: Request, res: Response) {
  try {
    const allCategories = await CategoryModel.find();
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(500).json(error);
  }
}

export default { getAllCategories };
