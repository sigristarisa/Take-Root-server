import { Router } from "express";
import { getAllPlants } from "../controllers/plant.js";

const router = Router();

router.get("/", getAllPlants);

export default router;
