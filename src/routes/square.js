import { Router } from "express";
import {
  getSquareById,
  updateSquareById,
  //   getSquaresByRaisedBedId,
  getNearbySquares,
} from "../controllers/square.js";

const router = Router();

router.get("/:squareId", getSquareById);
// router.get("/raisedbed/:raisedBedId", getSquaresByRaisedBedId);
router.get("/nearby/:squareId", getNearbySquares);
router.patch("/", updateSquareById);

export default router;
