import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRY } from "../helpers/config.js";
import { findUserByEmail } from "../helpers/user.js";
import dbClient from "../helpers/dbClient.js";

export const signUp = async (req, res) => {
  const { userName, email, password, userImage } = req.body;
  const passwordHash = await bcrypt.hash(password, 8);

  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      res.json(400, { email: "Email already in use" });
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
    res.json(res, 500, "Unable to create new user");
  }
};
