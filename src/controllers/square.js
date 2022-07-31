import {
  findSquareById,
  updateSquare,
  findNearbySquareId,
  findNearbySquaresPlantId,
} from "../domain/square.js";

import { findRaisedBedById } from "../domain/raisedBed.js";

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

export const getCompanionsBySquareId = async (req, res) => {
  const squareId = Number(req.params.squareId);

  console.log("squareId", squareId);
  const foundSquare = await findSquareById(squareId);
  console.log("foundSquare", foundSquare);
  const raisedBedId = foundSquare.raisedBedId;
  const foundRaisedBed = await findRaisedBedById(raisedBedId);
  const firstSquareId = foundRaisedBed.square[0].id;
  const lastSquareId =
    foundRaisedBed.square[foundRaisedBed.square.length - 1].id;

  const maxRow = foundRaisedBed.rows;
  const maxColumn = foundRaisedBed.columns;

  console.log("firstSquareId", firstSquareId);
  console.log("lastSquareId", lastSquareId), console.log("maxrow", maxRow);
  console.log("maxColumn", maxColumn);

  // ----------- HERES THE PROBLEM ------------ //
  // const nearbyRows = findNearbyRowColumn(foundSquare.row);
  // console.log("nearbyRows", nearbyRows);
  // cost nearbyColumns = findNearbyRowColumn(foundSquare.column);
  // console.log("nearbyColumns", nearbyColumns);

  const nearbySquareIds = findNearbySquareId(
    foundSquare,
    firstSquareId,
    lastSquareId,
    maxRow,
    maxColumn
  );

  console.log("nearbySquareIds", nearbySquareIds);

  // const foundNearbySquaresRow = await findNearbySquaresPlantId(
  //   raisedBedId,
  //   "row",
  //   nearbyRows
  // );
  // const foundNearbySquaresColumn = await findNearbySquaresPlantId(
  //   raisedBedId,
  //   "column",
  //   nearbyColumns
  // );

  // console.log("foundNearbySquareRow", foundNearbySquaresRow);
  // console.log("roundNearbySquaresColumn", foundNearbySquaresColumn);

  // const plantIdArr = foundNearbySquaresRow.concat(foundNearbySquaresColumn);

  // console.log("plantIdArr", plantIdArr);

  // const foundCompanions = await findCompanionsByPlantId(plantIdArr);

  // console.log("foundCompanions", foundCompanions);

  // res.json({ companions: foundCompanions });
};
