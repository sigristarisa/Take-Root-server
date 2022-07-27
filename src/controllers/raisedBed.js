import { createRaisedBed } from "../domain/raisedBed.js";
import { createSquares } from "../domain/square.js";

export const createRaisedBedAndSquares = async (req, res) => {
  const { userId, name, row, column } = req.body;

  try {
    const newRaisedBed = await createRaisedBed(name, userId);
    if (!newRaisedBed) {
      res.status(400).json({ error: "Unable to create new raised bed" });
    }

    const newSquares = await createSquares(newRaisedBed.id, row, column);
    if (!newSquares) {
      res.status(400).json({ error: "Unable to create squares" });
    }

    res.json({ data: { newRaisedBed, newSquares } });
  } catch (error) {
    console.error("What happened?: ", error.message);
    res.status(500).json({ error: "ERROR – Something went wrong" });
  }
};
