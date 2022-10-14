import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Role from "../models/role.model";
import { User, UserModel } from '../models/user.model';

export const validRoles = async (role: string) => {
    const validRole = await Role.findByPk(role);
    if (!validRole) {
      return (role = "user_role");
    }
  };
  
  export const validEmailExists = async (email: string) => {
    email = email.toLowerCase();
    const user: UserModel |any = await User.findOne({
      where: {
        email: email,
      },
    });
  
    if (user && user.state === true) {
      throw new Error("Email already exists");
    }
  };

export const validUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.header("id");
      const token: string | any = req.header("tkn");
      const { uid }: string | any = jwt.verify(token, process.env.SECRET_JWT_KEY || "");
  
      if (!id || !token)
        return res.status(404).json({ msg: "token or id not found" });
      if (id !== uid) return res.status(400).json({ msg: "Invalid info" });
      const user: UserModel | any = await User.findByPk(uid || id);
      if (!user) return res.status(404).json({ msg: "User not found" });
      next();
    } catch (error) {
      return res.status(500).json({ msg: "Internal server error " + error });
    }
  };
  export const validAdminRole = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.header("id");
      const token: any = req.header("tkn");
      const { uid }: string | any = jwt.verify(
        token,
        process.env.SECRET_JWT_KEY || ""
        );
      const user: UserModel | any = await User.findByPk(uid || id);
      if (user.role !== "admin_role")
        return res.status(401).json({ msg: "Unauthorized" });
      next();
    } catch (error) {
      return res.status(500).json({ msg: "Internal server error " + error });
    }
  };
  