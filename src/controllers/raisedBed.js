import {
  createRaisedBed,
  findRaisedBedById,
  deleteAllSquaresById,
} from "../domain/raisedBed.js";
import { createSquares } from "../domain/square.js";

export const createRaisedBedAndSquares = async (req, res) => {
  const { userId, row, column } = req.body;
  try {
    const newRaisedBed = await createRaisedBed(userId, row, column);
    if (!newRaisedBed) {
      res.status(400).json({ error: "Unable to create new raised bed" });
    }

    const newSquares = await createSquares(newRaisedBed.id, row, column);
    if (!newSquares) {
      res.status(400).json({ error: "Unable to create squares" });
    }

    res.json({ raisedBed: { ...newRaisedBed, square: newSquares } });
  } catch (error) {
    console.error("What happened?: ", error.message);
    res.status(500).json({ error: "ERROR – Something went wrong" });
  }
};

export const getRaisedBedById = async (req, res) => {
  const raisedBedId = Number(req.params.raisedBedId);

  try {
    const foundRaisedBed = await findRaisedBedById(raisedBedId);
    if (!foundRaisedBed) {
      res.status(400).json({ error: "Raised bed not found" });
    }

    res.json({ raisedBed: foundRaisedBed });
  } catch (error) {
    console.error("What happened?: ", error.message);
    res.status(500).json({ error: "ERROR – Something went wrong" });
  }
};
