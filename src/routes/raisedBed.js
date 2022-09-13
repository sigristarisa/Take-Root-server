const express = require("express");
import { deletePlantIdsByRaisedBedId } from "../controllers/square.js";
import {
  createRaisedBedAndSquares,
  getRaisedBedById,
  updateRaisedBedNameById,
  getAllRaisedBedByUserId,
  deleteRaisedBedById,
  getOtherRaisedBeds,
} from "../controllers/raisedBed.js";

const router = express.Router();

router.get("/inspiration/:userId", getOtherRaisedBeds);
router.get("/:raisedBedId", getRaisedBedById);
router.get("/user/:userId", getAllRaisedBedByUserId);
router.post("/", createRaisedBedAndSquares);
router.patch("/:raisedBedId", deletePlantIdsByRaisedBedId, getRaisedBedById);
router.patch("/name/:raisedBedId", updateRaisedBedNameById);
router.delete("/:raisedBedId", deleteRaisedBedById);

export default router;
