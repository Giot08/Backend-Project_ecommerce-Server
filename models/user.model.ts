import { DataTypes } from "sequelize";
import db from "../db/connection";

const User = db.define("user", {
  id:{
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
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
  },
  role: {
    type: DataTypes.STRING,
  },
});

export default User;
