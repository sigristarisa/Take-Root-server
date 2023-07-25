import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../helpers/config.js";
import { findUser, createUser } from "../domain/user.js";

export const signUp = async (req, res) => {
  const { userName, email, password, confirmPassword, userImage } = req.body;

  try {
    const existingUserName = await findUser("userName", userName);
    const existingEmail = await findUser("email", email);
    const errors = { error: [] };

    if (existingUserName) {
      errors.error.push("user name already in use ");
    }
    if (existingEmail) {
      errors.error.push("email already in use ");
    }
    if (password !== confirmPassword) {
      errors.error.push("Please enter the same password");
    }
    if (errors.error.length) {
      res.status(400).json(errors);
    }

    const passwordHash = await bcrypt.hash(password, 8);
    const newUser = await createUser(userName, email, passwordHash, userImage);

    const token = jwt.sign({ data: newUser.id }, JWT_SECRET);

    res.json({ ...newUser, token: token });
  } catch (error) {
    console.error("What happened?: ", error.message);
    res.status(500).json({ error: "Unable to create new user" });
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  const errors = { error: [] };

  try {
    const existingUser = await findUser("email", email);

    if (!existingUser) {
      errors.error.push("Invalid email ");
      console.log("errors", errors);
    } else {
      const passwordIsValid = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!passwordIsValid) {
        errors.error.push("Invalid password ");
        console.log("errors", errors);
      }
    }

    if (errors.error.length) {
      res.status(401).json(errors);
    }

    const token = jwt.sign({ data: existingUser.id }, JWT_SECRET);

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
