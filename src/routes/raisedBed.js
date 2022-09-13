const express = require("express");
const { deletePlantIdsByRaisedBedId } = require("../controllers/square.js");
const {
  createRaisedBedAndSquares,
  getRaisedBedById,
  updateRaisedBedNameById,
  getAllRaisedBedByUserId,
  deleteRaisedBedById,
  getOtherRaisedBeds,
} = require("../controllers/raisedBed.js");

const router = express.Router();

router.get("/inspiration/:userId", getOtherRaisedBeds);
router.get("/:raisedBedId", getRaisedBedById);
router.get("/user/:userId", getAllRaisedBedByUserId);
router.post("/", createRaisedBedAndSquares);
router.patch("/:raisedBedId", deletePlantIdsByRaisedBedId, getRaisedBedById);
router.patch("/name/:raisedBedId", updateRaisedBedNameById);
router.delete("/:raisedBedId", deleteRaisedBedById);

module.exports = { raisedBedRouter: router };
