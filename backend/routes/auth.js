import express from "express";
import { google, signin, signOut, signup } from "../controllers/auth.js";
import { loginChain, registerChain } from "../middlewares/validationChains.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { check } from "express-validator";

const router = express.Router();

router.post("/signup", registerChain(), validateRequest, signup);
router.post("/signin", loginChain(), validateRequest, signin);
router.post("/google", google);
router.get("/signout", signOut);

export default router;
