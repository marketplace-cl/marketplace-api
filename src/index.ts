import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { router } from "./router";

dotenv.config();

const app = express();

const PORT = 5000;

mongoose
  .connect(`${process.env.MONGO_ACCESS_URL}`)
  .then(() => {
    console.log("Conectado ao BD");
    app.use((_req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "*");
      res.setHeader("Access-Control-Allow-Headers", "*");
      next();
    });

    app.use(express.json());
    app.use(router);
    app.listen(PORT, () => {
      console.log(`Rodando na porta ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
