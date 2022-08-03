import {
  createRaisedBed,
  findRaisedBedById,
  changeRaisedBedNameById,
  findAllRaisedBedByUserId,
  removeRaisedBedById,
} from "../domain/raisedBed.js";
import {
  createSquares,
  deleteAllSquaresByRaisedBedId,
} from "../domain/square.js";

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
  console.log("hi");
  console.log("am I getting this?", raisedBedId);
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

export const updateRaisedBedNameById = async (req, res) => {
  const raisedBedId = Number(req.params.raisedBedId);
  const { name } = req.body;

  const updatedRaisedBed = await changeRaisedBedNameById(raisedBedId, name);

  res.json({ raisedBed: updatedRaisedBed });
};

export const getAllRaisedBedByUserId = async (req, res) => {
  const userId = Number(req.params.userId);

  const foundRaisedBed = await findAllRaisedBedByUserId(userId);

  res.json({ raisedBed: foundRaisedBed });
};

export const deleteRaisedBedById = async (req, res) => {
  const raisedBedId = Number(req.params.raisedBedId);

  const deletingSquares = await deleteAllSquaresByRaisedBedId(raisedBedId);
  const deletingRaisedBed = await removeRaisedBedById(raisedBedId);

  res.json({ deleted: deletingRaisedBed });
};
