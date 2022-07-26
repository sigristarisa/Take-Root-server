import dbClient from "../helpers/dbClient.js";
import { createSquareArr } from "../helpers/square.js";

export const createSquares = async (req, res) => {
  console.log("Whats the body", req.body);
  const { row, column } = req.body;
  const squareArr = createSquareArr(row, column);
  const squaresInRaisedBed = [];

  console.log("row", row);
  console.log("column", column);

  for (const square of squareArr) {
    const createdSquare = await dbClient.square.create({
      data: {
        row: square.row,
        column: square.column,
      },
    });
    console.log("createdSquare", createdSquare);
    squaresInRaisedBed.push(createdSquare);
  }
  res.json({ data: squaresInRaisedBed });
};
