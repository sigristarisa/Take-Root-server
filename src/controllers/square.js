import {
  findSquareById,
  updateSquare,
  findNearbyRowColumn,
  findNearbySquares,
} from "../domain/square.js";

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

export const getNearbySquares = async (req, res) => {
  const squareId = Number(req.params.squareId);
  const foundSquare = await findSquareById(squareId);

  const nearbyRows = findNearbyRowColumn(foundSquare.row);
  const nearbyColumns = findNearbyRowColumn(foundSquare.column);

  const foundNearbySquaresRow = await findNearbySquares("row", nearbyRows);
  const foundNearbySquaresColumn = await findNearbySquares(
    "column",
    nearbyColumns
  );

  res.json({
    nearSquares: foundNearbySquaresRow.concat(foundNearbySquaresColumn),
  });
};
