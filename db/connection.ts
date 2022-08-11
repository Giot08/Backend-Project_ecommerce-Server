import { Sequelize } from "sequelize";

const db = new Sequelize("dev", "postgres", "1234asdf", {
  host: "localhost",
  dialect: "postgres",
  // loggin: false,
});
export default db;
