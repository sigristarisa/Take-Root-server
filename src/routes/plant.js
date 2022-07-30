import { Router } from "express";
import {
  getAllPlants,
  getCompanionsByPlantId,
  getAllCompanions,
} from "../controllers/plant.js";

const router = Router();

router.get("/", getAllPlants);
router.get("/companion/:plantId", getCompanionsByPlantId);
router.get("/companion", getAllCompanions);

export default router;
