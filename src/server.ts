//import http from "http";
import express, { Express } from "express";
import { corsHandler } from "./middlewares/corsHandler";
import cors from "cors";
import { userRouter } from "./routes/user";
import { routeNotFound } from "./middlewares/routeNotFound";
import { DATABASE_DEVELOPMENT, SERVER_PORT } from "./config/config";
import { connectDatabase } from "./database/database";
import path from "path";

class Server {
  private app: Express;
  private port: Number;
  private routePaths = {
    user: "/api/user",
  };

  constructor() {
    this.app = express();
    this.port = SERVER_PORT;

    this.database();
    this.middlewares();
    this.routes();
  }

  async database() {
    await connectDatabase(DATABASE_DEVELOPMENT);
  }

  middlewares() {
    //this.app.use(corsHandler);
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use("/", express.static(path.resolve(__dirname, "./public")));
  }

  routes() {
    this.app.use(this.routePaths.user, userRouter);
    //this.app.use(routeNotFound);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port: ", this.port);
    });
  }
}

export default Server;
