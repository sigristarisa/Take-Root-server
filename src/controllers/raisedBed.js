import {
  createRaisedBed,
  findRaisedBedById,
  changeRaisedBedNameById,
  findAllRaisedBedByUserId,
  removeRaisedBedById,
  findEntireRaisedBeds,
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

  try {
    const updatedRaisedBed = await changeRaisedBedNameById(raisedBedId, name);

    if (!updatedRaisedBed) {
      res.status(400).json({ error: "Could not update raised bed name" });
    }

    res.json({ raisedBed: updatedRaisedBed });
  } catch (error) {
    console.error("What happened?: ", error.message);
    res.status(500).json({ error: "ERROR – Something went wrong" });
  }
};

export const getAllRaisedBedByUserId = async (req, res) => {
  const userId = Number(req.params.userId);

  try {
    const foundRaisedBed = await findAllRaisedBedByUserId(userId);

    if (!foundRaisedBed) {
      res.status(400).json({ error: "Could not find raised bed by user id" });
    }

    res.json({ raisedBed: foundRaisedBed });
  } catch (error) {
    console.error("What happened?: ", error.message);
    res.status(500).json({ error: "ERROR – Something went wrong" });
  }
};

export const deleteRaisedBedById = async (req, res) => {
  const raisedBedId = Number(req.params.raisedBedId);

  try {
    await deleteAllSquaresByRaisedBedId(raisedBedId);
    const deletingRaisedBed = await removeRaisedBedById(raisedBedId);

    if (!deletingRaisedBed) {
      res.status(400).json({ error: "Could not delete raised bed" });
    }

    res.json({ deleted: deletingRaisedBed });
  } catch (error) {
    console.error("What happened?: ", error.message);
    res.status(500).json({ error: "ERROR – Something went wrong" });
  }
};

export const getEntireRaisedBeds = async (req, res) => {
  try {
    const entireRaisedBeds = await findEntireRaisedBeds();

    if (!entireRaisedBeds) {
      res.status(400).json({ error: "Could not get raised beds" });
    }
    res.json({ raisedBeds: entireRaisedBeds });
  } catch (error) {
    console.error("What happened?: ", error.message);
    res.status(500).json({ error: "ERROR – Something went wrong" });
  }
};
