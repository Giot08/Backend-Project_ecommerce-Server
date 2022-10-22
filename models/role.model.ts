import { DataTypes } from "sequelize";
import db from "../db/connection";

export const Role = db.define("role", {
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: false,
    defaultValue: "user_role",
  },
});

