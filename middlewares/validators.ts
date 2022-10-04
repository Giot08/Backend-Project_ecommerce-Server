import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import Role from "../models/role.model";
import { User, UserModel } from "../models/user.model";

export const validFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};

export const validRoles = async (role: string) => {
  const validRole = await Role.findByPk(role);
  if (!validRole) {
    return (role = "user_role");
  }
};

export const validEmailExists = async (email: string) => {
  email = email.toLowerCase();
  const validEmail = await User.findOne({
    where: {
      email: email,
    },
  });
  if (validEmail) {
    throw new Error("Email already exists");
  }
};

export const validAdminRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.header("id");
  const token = req.header("tkn");
  const { uid } = jwt.verify(token, process.env.SECRET_JWT_KEY || "");

  if (!id || !token)
    return res.status(404).json({ msg: "token or id not found" });
  if (id !== uid) return res.status(400).json({ msg: "Invalid info" });
  const user: UserModel = await User.findByPk(uid || id);
  if (user.role !== "admin_role")
    return res.status(401).json({ msg: "Unauthorized" });
  next();
};

export const validJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const token = req.header("x-token");

  if (!token) {
    return res.status(404).json({
      msg: "Token not found",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT_KEY || "");
    const user: UserModel = await User.findByPk(uid);
    if (user.role !== "admin_role") {
      return res.status(401).json({ msg: "Usuario no autorizado" });
    }
    if (id !== uid) {
      return res
        .status(404)
        .json({ msg: "Invalid token, no coinciden los id." });
    }
    if (!user) {
      return res.status(401).json({
        msg: "token no valido, usuario no existe",
      });
    }
    if (!user.state) {
      return res.status(401).json({
        msg: "Usuario inactivo - false status",
      });
    }
    console.log("#####   token   #####");
    console.log(`${token} ··· ${uid}, ··· ${id}`);
    console.log(user);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Error: " + error + " Token no valido",
    });
  }
};
