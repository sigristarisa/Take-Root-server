import { Router } from "express";
import { deletePlantIdsByRaisedBedId } from "../controllers/square.js";
import {
  createRaisedBedAndSquares,
  getRaisedBedById,
  updateRaisedBedNameById,
  getAllRaisedBedByUserId,
} from "../controllers/raisedBed.js";

const router = Router();

router.get("/:raisedBedId", getRaisedBedById);
router.get("/user/:userId", getAllRaisedBedByUserId);
router.post("/", createRaisedBedAndSquares);
router.patch("/:raisedBedId", deletePlantIdsByRaisedBedId, getRaisedBedById);
router.patch("/name/:raisedBedId", updateRaisedBedNameById);

export default router;
