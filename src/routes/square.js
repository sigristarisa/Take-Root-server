import { Router } from "express";
import {
  getSquareById,
  updateSquareById,
  getCompanionsBySquareId,
} from "../controllers/square.js";

import { getRaisedBedById } from "../controllers/raisedBed.js";
const router = Router();

router.get("/:squareId", getSquareById);
router.patch("/", updateSquareById);
router.get("/companion/:squareId", getCompanionsBySquareId, getRaisedBedById);

export default router;
