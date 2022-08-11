import { Request, Response } from "express";
import User from "../models/user.model";

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json(user);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
};

export const postUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {

    const findEmail = await User.findOne({
      where: {
        email: body.email,
      }
    });

    if(findEmail) {
      return res.status(400).json({
        msg: "El correo ya existe." + body.email,
      })
    }



    const user = await User.create(body);
    await user.save();
    res.json(user);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "postUsers",
      error
    });
  }
};

export const putUser = (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;
  res.json({
    msg: "putUsers",
    body,
    id,
  });
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    msg: "deleteUsers",
    id,
  });
};
