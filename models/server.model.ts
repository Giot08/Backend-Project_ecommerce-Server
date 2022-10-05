import express, { Application } from "express";
import userRoutes from "../routes/user.route";
import authRoutes from "../routes/auth.route";
import cors from "cors";
import db from "../db/connection";

class Server {
  private app: Application;
  private port: string;
  private paths = {
    users: "/api/user",
    auth: "/api/auth", 
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";

    // Connection
    this.dbConnection();

    // Middlewares execution
    this.middlewares();

    // Routes execution
    this.routes();
  }

  // db Conection
  async dbConnection() {
    try {
      await db.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      return console.log(error);
    }
  }

  // Middlewares
  middlewares() {
    // Cors
    this.app.use(cors({}));

    // Body read
    this.app.use(express.json());

    // Public
    this.app.use(express.static("public"));
  }

  // methods
  routes() {
    this.app.use(this.paths.users, userRoutes);
    this.app.use(this.paths.auth, authRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port: " + this.port);
    });
  }
}

export default Server;
