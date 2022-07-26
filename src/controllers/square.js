import dbClient from "../helpers/dbClient.js";
import { createSquareArr } from "../helpers/square.js";

export const createSquares = async (req) => {
  const id = Number(req.params.id);
  const { row, column } = req.body;
  const squareArr = createSquareArr(row, column);

  try {
    for (const square of squareArr) {
      const createdSquare = await dbClient.square.create({
        data: {
          row: square.row,
          column: square.column,
          raisedBed: {
            connect: {
              id: id,
            },
          },
        },
      });
    }
  } catch (error) {
    console.error("something went wrong", error.message);
    res.status(500).json({ error: "Unable to create squares" });
  }
};
