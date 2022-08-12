// Third
import { Request, Response } from "express";
const bcryptjs = require("bcryptjs");

// Our
import User from "../models/user.model";

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json(user);
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
};

export const createNewUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const findEmail = await User.findOne({
      where: {
        email: body.email.toLowerCase(),
      },
    });

    if (findEmail) {
      return res.status(400).json({
        msg: `The email ${body.email} already exists`,
      });
    }

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
  const { body } = req;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    await user.update(body);

    res.json(user);
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error, contact the administrator",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({
      msg: "User not found",
    });
  } else {
    await user.destroy();

    res.status(200).json({
      msg: "User deleted",
    });
  }

  // State can be the has a update to show "false" has a reference for user existence
};
