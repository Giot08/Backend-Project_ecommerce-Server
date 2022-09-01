import { Sequelize } from "sequelize";
import {dbName, dbUserName, dbPassword} from "./keys"

const db = new Sequelize(dbName, dbUserName, dbPassword, {
  host: "localhost",
  dialect: "postgres",
  // loggin: false,
});
export default db;
