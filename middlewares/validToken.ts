import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const validJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.header("tkn");
    if (!token) {
      return res.status(404).json({ msg: "Token not found" });
    }
    try {
      jwt.verify(token, process.env.SECRET_JWT_KEY || "");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "Error: " + error + "Token no valido",
      });
    }
  };