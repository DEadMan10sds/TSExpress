//import http from "http";
import express, { Express } from "express";
import { corsHandler } from "./middlewares/corsHandler";
import cors from "cors";
import { userRouter } from "./routes/user";
import { routeNotFound } from "./middlewares/routeNotFound";
import { DATABASE_DEVELOPMENT, SERVER_PORT } from "./config/config";
import { connectDatabase, setCollections } from "./database/database";
import path from "path";
import { healthRouter } from "./routes/health";
import { articleRouter } from "./routes/articles";
import { authRouter } from "./routes/auth";

class Server {
  private app: Express;
  private port: Number;
  private routePaths = {
    article: "/api/article",
    auth: "/api/auth",
    user: "/api/user",
    health: "/health",
  };

  constructor() {
    this.app = express();
    this.port = SERVER_PORT;

    this.database();
    this.middlewares();
    this.routes();
  }

  async database() {
    try {
      await connectDatabase(DATABASE_DEVELOPMENT);
      await setCollections();
    } catch (error) {
      console.log("Error al establecer conexión con la BD o las collecciones");
    }
  }

  middlewares() {
    //this.app.use(corsHandler);
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use("/", express.static(path.resolve(__dirname, "../public")));
  }

  routes() {
    this.app.use(this.routePaths.article, articleRouter);
    this.app.use(this.routePaths.auth, authRouter);
    this.app.use(this.routePaths.user, userRouter);
    this.app.use(this.routePaths.health, healthRouter);
    this.app.use(routeNotFound);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port: ", this.port);
    });
  }
}

export default Server;
