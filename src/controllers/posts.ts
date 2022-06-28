import { Request, Response, NextFunction } from "express";
import Post from "../models/posts";

export const getPosts = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const postModel: any = new Post(null, null, null, null);
    const username = req.body.email;
    if (!username) {
      throw new Error("Unauthorized!");
    }
    const result = await postModel.fetchAllByMail(username);
    return res.status(200).json({
      posts: result[0],
      length: result[0].length,
    });
  } catch (err) {
    const error = err as Error;
    return res.status(401).json({
      message: error.message,
      error,
    });
  }
};

export const createPostForm = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(200).render("posts/createpost", {
    path: "/posts/createpost",
    pageTitle: "Create Post",
    errorMessage: "",
  });
};

export const createPost = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { title, description } = req.body;
    const createdAt = new Date();
    const email = req.body.username;
    if (email && title && description) {
      const postModel: any = new Post(title, description, createdAt, email);
      const result = await postModel.save();
      if (result[0].affectedRows === 1) {
        return res.status(200).json(result[0]);
      }
    }
    throw new Error("No data created!");
  } catch (err) {
    const error = err as Error;
    return res.status(401).json({
      message: error.message,
      error,
    });
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { id } = req.body;

  try {
    const postModel: any = new Post(null, null, null, null);
    const result = await postModel.deleteByID(id);

    if (result[0].affectedRows === 1) {
      return res.status(200).json(result[0]);
    }

    throw new Error("Data not found!");
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

export const getAllPosts = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const postModel: any = new Post(null, null, null, null);
  const username = req.body.username;
  try {
    if (username !== "admin@admin.com") {
      throw new Error("Unauthorized!");
    } else {
      const result = await postModel.adminFetchAll();
      return res.status(200).json({
        posts: result[0],
      });
    }
  } catch (err) {
    res.status(401).json({
      error: err,
    });
  }
};
