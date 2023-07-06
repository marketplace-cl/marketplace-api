import { Router } from "express";
import AuthController from "./app/controllers/AuthController";
import dotenv from "dotenv";
import { verifyTokenAndAuthorization } from "./app/middlewares/verifyToken";
import UsersController from "./app/controllers/UsersController";

dotenv.config();

export const router = Router();
const BASE_URL = process.env.BASE_URL;

// Autenticação
router.post(BASE_URL + "/users/auth/register", AuthController.registerUser);
router.post(BASE_URL + "/users/auth/login", AuthController.login);

//Users
router.put(
  BASE_URL + "/users/:id",
  verifyTokenAndAuthorization,
  UsersController.updateUser
);
