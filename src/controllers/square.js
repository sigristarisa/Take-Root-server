import {
  findSquareById,
  updateSquare,
  findNearbySquareId,
  findNearbySquaresPlantId,
  deleteAllPlantIdsByRaisedBedId,
} from "../domain/square.js";

import { findRaisedBedById } from "../domain/raisedBed.js";

import {
  findCompanionsByPlantId,
  findNonCompanionsByPlantId,
} from "../domain/plant.js";

export const getSquareById = async (req, res) => {
  const squareId = Number(req.params.squareId);

  try {
    const foundSquare = await findSquareById(squareId);
    if (!foundSquare) {
      res.status(400).json({ error: "Square do not exist" });
    }
    res.json({ data: foundSquare });
  } catch (error) {
    console.error("What happened?: ", error.message);
    res.status(500).json({ error: "ERROR – Something went wrong" });
  }
};

export const updateSquareById = async (req, res) => {
  const { squareId, plantId } = req.body;
  try {
    const updatedSquare = await updateSquare(squareId, plantId);

    if (!updatedSquare) {
      res.status(400).json({ error: "Unable to update square" });
    }
    res.json({ data: updatedSquare });
  } catch (error) {
    console.error("What happened?: ", error.message);
    res.status(500).json({ error: "ERROR – Something went wrong" });
  }
};

export const getCompanionsBySquareId = async (req, res) => {
  const squareId = Number(req.params.squareId);

  try {
    const foundSquare = await findSquareById(squareId);
    if (!foundSquare) {
      res.status(400).json({ error: "Unable to find square by id" });
    }

    const raisedBedId = foundSquare.raisedBedId;
    const foundRaisedBed = await findRaisedBedById(raisedBedId);

    if (!foundRaisedBed) {
      res.status(400).json({ error: "Unable to find raised bed by id" });
    }
    const firstSquareId = foundRaisedBed.square[0].id;
    const lastSquareId =
      foundRaisedBed.square[foundRaisedBed.square.length - 1].id;
    const maxRow = foundRaisedBed.rows;
    const maxColumn = foundRaisedBed.columns;

    const nearbySquareIds = findNearbySquareId(
      foundSquare,
      firstSquareId,
      lastSquareId,
      maxRow,
      maxColumn
    );

    const plantIdArr = await findNearbySquaresPlantId(nearbySquareIds);

    if (!plantIdArr) {
      res
        .status(400)
        .json({ error: "Unable to find plants of nearby squares" });
    }

    const foundCompanions = await findCompanionsByPlantId(plantIdArr);
    const foundNonCompanions = await findNonCompanionsByPlantId(plantIdArr);

    res.json({
      companions: foundCompanions,
      nonCompanions: foundNonCompanions,
    });
  } catch (error) {
    console.error("What happened?: ", error.message);
    res.status(500).json({ error: "ERROR – Something went wrong" });
  }
};

export const deletePlantIdsByRaisedBedId = async (req, res, next) => {
  const raisedBedId = Number(req.params.raisedBedId);

  await deleteAllPlantIdsByRaisedBedId(raisedBedId);
  next();
};
