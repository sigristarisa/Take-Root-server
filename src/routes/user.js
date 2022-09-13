import { signUp, logIn, verifyUser } from "../controllers/user.js";

const express = require("express");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/", verifyUser);

export default router;
