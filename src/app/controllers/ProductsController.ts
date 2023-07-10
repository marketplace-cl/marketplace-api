import { Request, Response } from "express";
import { ProductModel } from "../models/ProductModel";
import { CategoryModel } from "../models/CategoryModel";

async function getAllProducts(req: Request, res: Response) {
  const qCat = req.query.cat;

  try {
    let products;

    if (qCat) {
      products = await ProductModel.find({
        category: qCat,
      });
    } else {
      products = await ProductModel.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function createProduct(req: Request, res: Response) {
  try {
    const category = await CategoryModel.findById(req.body.categoryId);

    if (!category) {
      return res
        .status(404)
        .json({ error: "Categoria não encontrada", success: false });
    }
    const { categoryId, ...others } = req.body;

    const newProduct = new ProductModel({
      category: category._id,
      ...others,
    });

    const response = await newProduct.save();

    res.status(201).json({ data: response, success: true });
  } catch (error: any) {
    res
      .status(500)
      .json({
        error: "Erro ao criar o produto",
        success: false,
        message: error.message,
      });
  }
}

export default { getAllProducts, createProduct };
