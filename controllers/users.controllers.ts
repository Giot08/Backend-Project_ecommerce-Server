import { Request, Response } from "express";
import { customAlphabet } from "nanoid";
import bcryptjs from "bcryptjs";

import { idKeys } from "../keys/index.keys";
import { User, UserModel, Role } from "../models/index.model";

export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error, contact the administrator, error: " + error,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }
    res.json(user); // No debe devolver contraseña
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error, contact the administrator, error: " + error,
    });
  }
};

export const getAllUsers = async (res: Response) => {
  try {
    const users = await User.findAll({
      where: {
        state: true,
      },
    });
    const totalUsers = users.length;
    res.json({ totalUsers, users });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error, contact the administrator, error: " + error,
    });
  }
};

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    body.email = body.email.toLowerCase();
    const findUser: UserModel | any = await User.findOne({
      where: {
        email: body.email,
      },
    });

    if (findUser && findUser.state === false) {
      await findUser.update({ state: true });
      return res.status(200).json({
        msg: "User created successfully - Update state",
        findUser,
      });
    }

    const nanoid = customAlphabet(idKeys, 8);
    body.id = nanoid();
    const encryptPassword = bcryptjs.genSaltSync();
    body.password = bcryptjs.hashSync(body.password, encryptPassword);
    const user = await User.create(body);
    await user.save();
    res.status(200).json({
      msg: "User created successfully - Created",
      user,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error, contact the administrator, error: " + error,
    });
  }
};

export const putUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    const { body } = req;

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }
    await user.update(body);
    res.json(user);
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error, contact the administrator, error: " + error,
    });
  }
};

export const putUserEmail = async (req: Request, res: Response) => {
  try {
    const id = req.header("id");
    const user = await User.findByPk(id);
    const { body } = req;

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }
    await user.update(body);
    res.json(user);
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error, contact the administrator, error: " + error,
    });
  }
};

export const removeUser = async (req: Request, res: Response) => {
  try {
    const id = req.header("id");
    const user = await User.findByPk(id);
    const { body } = req;
    body.state = false;
    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }
    await user.update(body);
    res.json({ msg: "User removed successfully", user });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error, contact the administrator, error: " + error,
    });
  }
};
export const destroyUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }
    await user.destroy();
    res.status(200).json({ user, msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error, contact the administrator, error: " + error,
    });
  }
};
