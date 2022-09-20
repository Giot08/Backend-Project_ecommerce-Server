import { Request, Response } from "express";
import { customAlphabet } from "nanoid";
import bcryptjs from "bcryptjs";

import { idKeys } from "../keys/idKeys";
import User from "../models/user.model";
import Role from "../models/role.model";

export const getAllRoles = async (req: Request, res: Response) => {
  const roles = await Role.findAll();
  res.json(roles);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({
      msg: "User not found",
    });
  }
  res.json(user); // No debe devolver contraseña
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.findAll({
    where: {
      state: true,
    },
  });
  const totalUsers = users.length;
  res.json({ totalUsers, users });
};

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const nanoid = customAlphabet(idKeys, 8);
    body.id = nanoid();
    body.email = body.email.toLowerCase();
    const encryptPassword = bcryptjs.genSaltSync();
    body.password = bcryptjs.hashSync(body.password, encryptPassword);
    const user = await User.create(body);
    await user.save();

    res.json({
      msg: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error 500, Contact with administrator",
      error,
    });
  }
};

export const putUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  const { body } = req;

  if (!user) {
    return res.status(404).json({
      msg: "User not found",
    });
  }
  try {
    await user.update(body);
    res.json(user);
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error, contact the administrator",
    });
  }
};

export const putUserEmail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  const { body } = req;

  if (!user) {
    return res.status(404).json({
      msg: "User not found",
    });
  }
  try {
    await user.update(body);
    res.json(user);
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error, contact the administrator",
    });
  }
};

export const removeUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  const { body } = req;
  body.state = false;
  if (!user) {
    return res.status(404).json({
      msg: "User not found",
    });
  }
  try {
    await user.update(body);
    res.json({ msg: "User removed successfully", user });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error, contact the administrator",
    });
  }
};
export const destroyUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({
      msg: "User not found",
    });
  }
  await user.destroy();
  res.status(200).json({ user, msg: "User deleted successfully" });
};
