import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname + "/../.env") });

export const DEVELOPMENT = process.env.NODE_ENV === "development";
export const TEST = process.env.NODE_ENV === "test";

export const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
export const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 4321;

export const DATABASE_DEVELOPMENT = String(process.env.DATABASE_DEV);

export const SERVER = {
  SERVER_HOSTNAME,
  SERVER_PORT,
};

export const ALLOW_VALIDATIONS: boolean =
  process.env.VALIDATORS === "true" || false;

export const SECRET_KEY = String(process.env.SECRET_KEY);
