import { Request, Response } from "express";
import { ProductModel } from "../models/ProductModel";

async function getAllProducts(_req: Request, res: Response) {
  try {
    const allProducts = await ProductModel.find();

    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function createProduct(req: Request, res: Response) {}

export default { getAllProducts, createProduct };
