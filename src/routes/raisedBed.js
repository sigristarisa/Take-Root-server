import { Router } from "express";
import {
  createRaisedBedAndSquares,
  getRaisedBedById,
} from "../controllers/raisedBed.js";

const router = Router();

router.get("/:raisedBedId", getRaisedBedById);
router.post("/", createRaisedBedAndSquares);

export default router;
