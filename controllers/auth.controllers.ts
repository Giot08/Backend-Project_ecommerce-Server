import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcryptjs from "bcryptjs";
import generateJWT from "../helpers/generateJWT";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ //ignore errors
      where: {
        email: email,
      },
    });
    if (!user) {
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
