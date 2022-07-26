import { Router } from "express";
import { createSquares } from "../controllers/square.js";
import { createRaisedBed } from "../controllers/raisedBed.js";

const router = Router();

router.post("/:id", createRaisedBed, createSquares);

export default router;
