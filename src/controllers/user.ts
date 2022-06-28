import { Request, Response, NextFunction } from "express";
import bcryptjs from "bcryptjs";
import signJWT from "../util/signJWT";
import { User } from "../models/user";
import { config } from "../util/config";

interface ErrorWithStatusCode extends Error {
  httpStatusCode?: number;
}

export const loginPage = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(200).json({
    message: "Login Page",
  });
};

export const signupPage = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(200).json({
    message: "Signup page",
  });
};

export const register = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const hashPassword = await bcryptjs.hash(password, 10);
      const user: any = await User.create({
        email,
        password: hashPassword,
      });
      return res.status(201).json({
        createdUser: user,
      });
    }
    throw new Error("Server Error!");
  } catch (err) {
    const error = err as Error;
    return res.status(403).json({
      message: error.message,
      error,
    });
  }
};

export const postLogin = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const userData: any = await User.findByPk(email);
    const result = await bcryptjs.compare(password, userData.password);
    if (result) {
      const token = signJWT({
        email: userData.email,
        password: userData.password,
      });
      if (token) {
        return res.status(200).json({
          token: token,
          username: userData.email,
        });
      }
    }
  } catch (err) {
    const error = err as Error;
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  req.body.username = "";
  res.locals.isAuthenticated = false;
  res.status(200).json({
    message: "Logout",
  });
};

export const getAllUsers = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const userData: any = await User.findAll({});
  res.status(200).json({
    users: userData,
    length: userData.length,
  });
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    if (email !== config.ADMIN_USER) {
      const deletedUser = await User.destroy({
        where: {
          email,
        },
      });
      if (deletedUser === 1) {
        return res.status(200).json({
          deletedPostCount: 1,
          email: email,
        });
      }
    }
    const error: ErrorWithStatusCode = new Error("Data not found!");
    error.httpStatusCode = 500;
    return next(error);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
