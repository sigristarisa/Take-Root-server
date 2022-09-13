const express = require("express");
const {
  getSquareById,
  updateSquareById,
  getCompanionsBySquareId,
} = require("../controllers/square.js");
const { getRaisedBedById } = require("../controllers/raisedBed.js");

const router = express.Router();
router.get("/:squareId", getSquareById);
router.patch("/", updateSquareById);
router.get("/companion/:squareId", getCompanionsBySquareId, getRaisedBedById);

module.exports = { squareRouter: router };
