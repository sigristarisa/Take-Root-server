import { Router } from "express";
import { updateSquareById } from "../controllers/square.js";

const router = Router();

router.patch("/", updateSquareById);

export default router;
