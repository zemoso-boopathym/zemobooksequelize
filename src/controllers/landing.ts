import { Request, Response, NextFunction } from "express";

export const landingPage = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(200).render("posts/welcome", {
    path: "/posts/welcome",
    pageTitle: "Welcome",
    token: null,
    isAuthenticated: req.body.username,
  });
};
