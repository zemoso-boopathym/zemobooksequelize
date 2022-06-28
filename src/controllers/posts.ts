import { Request, Response, NextFunction } from "express";
import { Post } from "../models/posts";

export const getPosts = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const username = req.body.email;
    console.log("username");
    console.log(username);
    if (!username) {
      throw new Error("Unauthorized!");
    }
    const posts = await Post.findAll({
      where: {
        userEmail: username,
      },
    });
    return res.status(200).json({
      posts: posts,
      length: posts.length,
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
    const { id, title, description } = req.body;
    const createdAt = new Date();
    const email = req.body.username;
    if (email && title && description) {
      const newPost = await Post.create({
        id: id,
        title: title,
        description: description,
        createdAt: createdAt,
        userEmail: email,
      });
      return res.status(200).json({
        message: "Created New post",
        newPost: newPost,
      });
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
    const deletedPost: any = await Post.destroy({
      where: {
        id: id,
      },
    });

    if (deletedPost === 1) {
      return res.status(200).json({
        deletedPostCount: 1,
        id: id,
      });
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
  const username = req.body.username;
  try {
    if (username !== "admin@admin.com") {
      throw new Error("Unauthorized!");
    } else {
      const posts = await Post.findAll({});
      return res.status(200).json({
        posts: posts,
        length: posts.length,
      });
    }
  } catch (err) {
    res.status(401).json({
      error: "Unauthorized",
    });
  }
};
