import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config";
import { ObjectId } from "mongodb";

export const generateJWT = (uid: string | ObjectId = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      SECRET_KEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("JWT no generado");
        } else resolve(token);
      }
    );
  });
};
