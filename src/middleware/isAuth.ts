import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { config } from "../util/config";

interface JwtPayload {
  username: string;
}

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(404).render("404", {
      path: "/404",
      pageTitle: "404 - Page Not found",
    });
  }
  try {
    const token = authHeader.split(" ")[1];
    if (token) {
      const { username } = jwt.verify(
        token,
        config.JWT_KEY!
      ) as unknown as JwtPayload;
      req.body.username = username;
      res.locals.isAuthenticated = username;
      next();
    } else {
      return res.status(401).json({
        message: "Unauthorized!",
      });
    }
  } catch (err) {
    const error = err as Error;
    return res.status(404).json({
      message: error.message,
    });
  }
};

export default isAuth;
