import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import generateJWT from "../helpers/generateJWT";

import { User, UserModel } from "../models/index.model";

export const login = async (req: Request, res: Response) => {
  try {
  const { email, password } = req.body;
    const user: UserModel | any = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user || user && user.state === false) {
      return res.status(404).json({ message: "User not found." });
    }
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(404).json({ message: "Invalid password." });
    }
    const token = await generateJWT(user.id); 
    res.json({
      user: user,
      tkn: token
    });
  } catch (error) {
     res.status(500).json({ error: "Server error: " + error });
  }
};
