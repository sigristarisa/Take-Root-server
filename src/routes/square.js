import { Router } from "express";
import { createSquares } from "../controllers/square.js";

const router = Router();

router.post("/", createSquares);

export default router;
