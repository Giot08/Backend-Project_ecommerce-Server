import { Request, Response, NextFunction } from "express";
import { validationResult, check } from "express-validator";
import Role from "../models/role.model";
import User from "../models/user.model";

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
  email = email.toLowerCase()
  const validEmail = await User.findOne({
    where: {
      email: email,
    },
  });
  if (validEmail) {
    throw new Error("Email already exists");
  }
};
