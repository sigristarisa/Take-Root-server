import { JWT_SECRET, JWT_EXPIRY } from "../helpers/config.js";
import { findUser, createUser } from "../domain/user.js";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    const newUser = await createUser(userName, email, passwordHash, userImage);

    const token = jwt.sign({ data: newUser.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRY,
    });

    res.json({ ...newUser, token: token });
  } catch (error) {
    console.error("What happened?: ", error.message);
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

    res.json({ ...existingUser, token: token });
  } catch (error) {
    console.error("What happened?: ", error.message);
    res.status(500).json({ error: "Unable to login" });
  }
};

export const verifyUser = async (req, res) => {
  const [, token] = req.headers.authorization.split(" ");
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const existingUser = await findUser("id", decodedToken.data);

    res.json({ ...existingUser, token: token });
  } catch (e) {
    res.status(401).json({ error: "Token not provided - User not allowed" });
  }
};
