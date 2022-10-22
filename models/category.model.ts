import { DataTypes } from "sequelize";
import db from "../db/connection";
import { User, UserModel } from './user.model';

export interface CategoryModel {
  name: string;
  state: boolean;
  user: string;
  }

export const Category = db.define("category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  state: {
    type:DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})