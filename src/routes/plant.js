import { getAllPlants } from "../controllers/plant.js";
const express = require("express");
const router = express.Router();

router.get("/", getAllPlants);

export default router;
