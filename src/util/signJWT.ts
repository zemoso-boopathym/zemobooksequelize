import jwt from "jsonwebtoken";
import { config } from "../util/config";

interface User {
  email: string;
  password: string;
}

const signJWT = (user: User): string => {
  return jwt.sign(
    {
      username: user.email,
    },
    config.JWT_KEY!,
    {
      issuer: "Boopathy",
      algorithm: "HS256",
      expiresIn: "1h",
    }
  );
};

export default signJWT;
