import { Request, Response } from "express";

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    msg: "getUser",
    id,
  });
};

export const getUsers = (req: Request, res: Response) => {
  res.json({
    msg: "getUsers",
  });
};

export const postUser = (req: Request, res: Response) => {
  const { body } = req;
  res.json({
    msg: "postUsers",
    body,
  });
};

export const putUser = (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;
  res.json({
    msg: "putUsers",
    body,
    id
  });
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    msg: "deleteUsers",
    id
  });
};
