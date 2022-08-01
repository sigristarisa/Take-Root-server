import { Router } from "express";
import { deletePlantIdsByRaisedBedId } from "../controllers/square.js";
import {
  createRaisedBedAndSquares,
  getRaisedBedById,
} from "../controllers/raisedBed.js";

const router = Router();

router.get("/:raisedBedId", getRaisedBedById);
router.post("/", createRaisedBedAndSquares);
router.patch("/:raisedBedId", deletePlantIdsByRaisedBedId, getRaisedBedById);

export default router;
