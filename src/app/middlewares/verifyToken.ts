import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = String(authHeader).split(" ")[1];

    jwt.verify(token, `${process.env.JWT_SEC_KEY}`, (err: any, user: any) => {
      if (err) return res.status(403).json("The token is not valid.");
      //@ts-ignore
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
}

export function verifyTokenAndAuthorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  verifyToken(req, res, () => {
    //@ts-ignore
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("Unauthorized!");
    }
  });
}
