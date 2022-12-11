import { Request, Response } from "express";

import { Category, CategoryModel } from "../models/index.model";

export const createNewCategory = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    body.name = body.name.replace(" ", "_").toLowerCase();
    const findCategory: CategoryModel | any = await Category.findOne({
      where: {
        name: body.name,
      },
    });

    if (findCategory)
      return res.status(400).json({
        msg: "Category already exists",
      });
    const category = await Category.create(body);
    await category.save();
    res.status(200).json({
      msg: "Category created successfully - Created",
      category,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error, contact the administrator, error: " + error,
    });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const { params } = req;
    params.name = params.name.replace(" ", "_").toLowerCase();
    const findCategory: CategoryModel | any = await Category.findAll({
      where: {
        name: params.name,
      },
    });

    if(findCategory.length === 0) return res.status(404).json({msg: "Category not found"});

    res.json({ Category: params.name, findCategory });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error, contact the administrator, error: " + error,
    });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll();
    const totalCategories = categories.length;
    res.json({ totalCategories, categories });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error, contact the administrator, error: " + error,
    });
  }
};
