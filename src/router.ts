import { Router } from "express";
import AuthController from "./app/controllers/AuthController";
import dotenv from "dotenv";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "./app/middlewares/verifyToken";
import UsersController from "./app/controllers/UsersController";
import ProductsController from "./app/controllers/ProductsController";
import CategoriesController from "./app/controllers/CategoriesController";
import PaymentController from "./app/controllers/PaymentController";
import DeliveryController from "./app/controllers/DeliveryController";

dotenv.config();

export const router = Router();
const BASE_URL: string = process.env.BASE_URL as string;

// Authentication
router.post(BASE_URL + "/users/auth/register", AuthController.registerUser);
router.post(BASE_URL + "/users/auth/login", AuthController.login);

// Users
router.put(
  BASE_URL + "/users/:id",
  verifyTokenAndAuthorization,
  UsersController.updateUser
);
router.delete(
  BASE_URL + "/users/:id",
  verifyTokenAndAuthorization,
  UsersController.deleteUser
);
router.get(
  BASE_URL + "/users/me/:id",
  // verifyTokenAndAuthorization,
  UsersController.getCurrentUser
);

// Products
router.get(BASE_URL + "/products", ProductsController.getAllProducts);
router.post(
  BASE_URL + "/products",
  verifyTokenAndAdmin,
  ProductsController.createProduct
);

// Categories
router.get(BASE_URL + "/categories", CategoriesController.getAllCategories);

// Payment method
router.post(
  BASE_URL + "/checkout/create-payment-intent",
  PaymentController.createPaymentIntent
);

// Delivery
router.post(
  BASE_URL + "/checkout/calculate-price-time",
  DeliveryController.calculatePriceTime
);
