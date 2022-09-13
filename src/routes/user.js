const express = require("express");
import { signUp, logIn, verifyUser } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/", verifyUser);

export default router;
