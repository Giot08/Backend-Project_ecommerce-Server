import { Request, Response } from "express";
import { customAlphabet } from "nanoid";
import bcryptjs from "bcryptjs";

import { idKeys } from "../keys/id.keys";
import User from "../models/user.model";

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({
      msg: "User not found",
      id,
    });
  }
  res.json({ user, id });
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
};

export const createNewUser = async (req: Request, res: Response) => {
  const { body } = req;

  const nanoid = customAlphabet(idKeys, 8);
  body.id = nanoid();

  try {
    const findUserByEmail = await User.findOne({
      where: {
        email: body.email,
      },
    });
    const findUserByID = await User.findOne({
      where: {
        id: body.id,
      },
    });

    if (findUserByEmail || findUserByID) {
      return res.status(400).json({
        message: `User already exists: ${body.id} || ${body.email} `,
      });
    }

    
    const validPass = body.password.length > 7 ? true : false
    if(!validPass) return res.status(400).json({msg: "password length too short!"})

    console.log(validPass)


    const encryptPassword = bcryptjs.genSaltSync();
    body.password = bcryptjs.hashSync(body.password, encryptPassword)

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
  }
  // await user.destroy();

  res.status(200).json(
    user
    // {      msg: "User deleted",    }
  );
};
