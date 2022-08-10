import express, { Application } from "express";
import userRoutes from "../routes/user.route";

class Server {
  private app: Application;
  private port: string;
  private paths = {
    users: "/api/users",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";

    // Routes
    this.routes();
  }

  // methods
  routes() {
    this.app.use(this.paths.users, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port: " + this.port);
    });
  }
}

export default Server;
