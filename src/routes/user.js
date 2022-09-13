const express = require("express");
const { signUp, logIn, verifyUser } = require("../controllers/user.js");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/", verifyUser);

module.exports = { userRouter: router };
