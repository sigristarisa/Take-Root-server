import {
  findSquareById,
  updateSquare,
  findNearbyRowColumn,
  findNearbySquaresPlantId,
} from "../domain/square.js";

import { findCompanionsByPlantId } from "../domain/plant.js";

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

export const getNearbySquaresPlantId = async (req, res) => {
  const squareId = Number(req.params.squareId);
  const foundSquare = await findSquareById(squareId);

  const nearbyRows = findNearbyRowColumn(foundSquare.row);
  const nearbyColumns = findNearbyRowColumn(foundSquare.column);

  const foundNearbySquaresRow = await findNearbySquaresPlantId(
    "row",
    nearbyRows
  );
  const foundNearbySquaresColumn = await findNearbySquaresPlantId(
    "column",
    nearbyColumns
  );

  res.json({
    plantId: foundNearbySquaresRow.concat(foundNearbySquaresColumn),
  });
};

export const getCompanionsBySquareId = async (req, res) => {
  const squareId = Number(req.params.squareId);

  const foundSquare = await findSquareById(squareId);

  const nearbyRows = findNearbyRowColumn(foundSquare.row);
  const nearbyColumns = findNearbyRowColumn(foundSquare.column);

  const foundNearbySquaresRow = await findNearbySquaresPlantId(
    "row",
    nearbyRows
  );
  const foundNearbySquaresColumn = await findNearbySquaresPlantId(
    "column",
    nearbyColumns
  );

  const plantIdArr = foundNearbySquaresRow.concat(foundNearbySquaresColumn);

  const foundCompanions = await findCompanionsByPlantId(plantIdArr);

  res.json({ companions: foundCompanions });
};
