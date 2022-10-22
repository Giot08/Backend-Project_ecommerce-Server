import { DataTypes } from "sequelize";
import db from "../db/connection";

const Role = db.define("role", {
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: false,
    defaultValue: "user_role",
  },
});

export default Role;
