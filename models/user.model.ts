import { DataTypes, json } from "sequelize";
import db from "../db/connection";

const User = db.define("user", {
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
    // get() {
    //   return undefined;  // Passwords dont go through to compare with hashSync
    // }
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

export default User;
