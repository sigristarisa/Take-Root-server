import { Router } from "express";
import {
  createRaisedBedAndSquares,
  getRaisedBedById,
  deleteSquaresById,
} from "../controllers/raisedBed.js";

const router = Router();

router.get("/:raisedBedId", getRaisedBedById);
router.post("/", createRaisedBedAndSquares);
router.patch("/:raisedBedId", deleteSquaresById);

export default router;
