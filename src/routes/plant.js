const express = require("express");
const { getAllPlants } = require("../controllers/plant.js");

const router = express.Router();

router.get("/", getAllPlants);

module.exports = {
  plantRouter: router,
};
