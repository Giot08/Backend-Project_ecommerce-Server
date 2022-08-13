import { Request, Response } from "express";
const bcryptjs = require("bcryptjs");

import User from "../models/user.model";

export const getUserById = async (req: Request, res: Response) => {
  const { body } = req;


  const findUser = await User.findOne({
    where: {
      id: body.id
    }
  });

  if (!findUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json(findUser);
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
};

export const createNewUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const findUserByEmail = await User.findOne({
      where:{
        email: body.email
      }
    });
    const findUserByID = await User.findOne({
      where: {
        id: body.id,
      }
    });
  
    if (findUserByEmail || findUserByID) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Gen ID

    // Encrypt password
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
