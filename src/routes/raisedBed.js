import { Router } from "express";
import { createRaisedBedAndSquares } from "../controllers/raisedBed.js";

const router = Router();

router.post("/:userId", createRaisedBedAndSquares);

export default router;
