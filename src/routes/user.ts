import express from "express";
import {
  loginPage,
  signupPage,
  register,
  postLogin,
  getAllUsers,
  logoutUser,
  deleteUser,
} from "../controllers/user";
import isAuthenticated from "../middleware/isAuth";

const router = express.Router();

router.get("/login", loginPage);
router.get("/signup", signupPage);

router.post("/login", postLogin);
router.post("/signup", register);
router.post("/logout", logoutUser);

router.get("/getallusers", isAuthenticated, getAllUsers);
router.delete("/deleteUser", isAuthenticated, deleteUser);

export default router;
