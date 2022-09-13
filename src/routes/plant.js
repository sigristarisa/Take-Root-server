const express = require("express");
import { getAllPlants } from "../controllers/plant.js";

const router = express.Router();

router.get("/", getAllPlants);

export default router;
