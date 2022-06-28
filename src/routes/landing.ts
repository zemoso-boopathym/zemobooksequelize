import express from "express";
import { landingPage } from "../controllers/landing";

const router = express.Router();

router.get("/", landingPage);

export default router;
