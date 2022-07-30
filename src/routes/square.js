import { Router } from "express";
import {
  getSquareById,
  updateSquareById,
  getSquaresByRaisedBedId,
} from "../controllers/square.js";

const router = Router();

router.get("/:squareId", getSquareById);
router.get("/raisedbed/:raisedBedId", getSquaresByRaisedBedId);
router.patch("/", updateSquareById);

export default router;
