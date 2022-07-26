import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRY } from "../helpers/config.js";
import { findUser } from "../helpers/user.js";
import dbClient from "../helpers/dbClient.js";

export const signUp = async (req, res) => {
  const { userName, email, password, confirmPassword, userImage } = req.body;

  try {
    const existingUserName = await findUser("userName", userName);
    const existingEmail = await findUser("email", email);

    if (existingUserName) {
      res.status(400).json({ error: "user name already in use" });
    }
    if (existingEmail) {
      res.status(400).json({ error: "email already in use" });
    }
    if (password !== confirmPassword) {
      res.status(400).json({ error: "Please enter the same password" });
    }

    const passwordHash = await bcrypt.hash(password, 8);
    const createdUser = await dbClient.user.create({
      data: { userName, email, password: passwordHash, userImage },
    });

    const token = jwt.sign({ data: createdUser.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRY,
    });

    res.json({ data: { ...createdUser, token: token } });
  } catch (error) {
    console.error("something went wrong", error.message);
    res.status(500).json({ error: "Unable to create new user" });
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await findUser("email", email);
    if (!existingUser) {
      res.status(401).json({ error: "Invalid email." });
    }

    const passwordIsValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordIsValid) {
      res.status(401).json({ error: "Invalid password." });
    }

    const token = jwt.sign({ data: existingUser.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRY,
    });

    res.json({ data: token });
  } catch (error) {
    console.error("something went wrong", error.message);
    res.status(500).json({ error: "Unable to login" });
  }
};
