import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRY } from "../helpers/config.js";
import { findUser } from "../helpers/user.js";
import dbClient from "../helpers/dbClient.js";

export const signUp = async (req, res) => {
  const { userName, email, password, userImage } = req.body;
  const passwordHash = await bcrypt.hash(password, 8);

  try {
    const existingUserName = await findUser("userName", userName);
    const existingEmail = await findUser("email", email);

    if (existingUserName) {
      res.status(400).json({ userName: "user name already in use" });
    }
    if (existingEmail) {
      res.status(400).json({ email: "email already in use" });
    }

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
