import { Router } from "express";
import { createRaisedBedAndSquares } from "../controllers/raisedBed.js";

const router = Router();

router.post("/", createRaisedBedAndSquares);

export default router;
