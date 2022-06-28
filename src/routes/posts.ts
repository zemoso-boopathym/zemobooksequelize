import express from "express";
import {
  getPosts,
  createPost,
  deletePost,
  getAllPosts,
  createPostForm,
} from "../controllers/posts";
import isAuthenticated from "../middleware/isAuth";

const router = express.Router();

router.get("/getPosts", isAuthenticated, getPosts);
router.get("/createPost", isAuthenticated, createPostForm);
router.post("/createPost", isAuthenticated, createPost);
router.delete("/deletePost", isAuthenticated, deletePost);
router.get("/getAllPosts", isAuthenticated, getAllPosts);

export default router;
