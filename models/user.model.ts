import { DataTypes } from "sequelize";
import db from "../db/connection";

export const User = db.define("user", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "user_role",
  },
});

export interface UserModel {
  id: string;
  name:string;
  email:string
  lastname:string
  password: string;
  state: boolean;
  role:string;
}
