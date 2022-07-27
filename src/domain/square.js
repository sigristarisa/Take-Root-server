import dbClient from "../helpers/dbClient.js";

const createRowColumn = (num, direction) => {
  const rowColumnArr = [];
  for (let i = 0; i < num; i++) {
    let rowColumnObj = {};
    rowColumnObj[direction] = i;
    rowColumnArr.push(rowColumnObj);
  }
  return rowColumnArr;
};

const createSquareArr = (rows, columns) => {
  const rowArr = createRowColumn(rows, "row");
  const columnArr = createRowColumn(columns, "column");

  const squareArr = rowArr.flatMap(({ row }) =>
    columnArr.map((column) => ({ ...column, row }))
  );
  return squareArr;
};

export const createSquares = async (raisedBedId, row, column) => {
  const squareArr = createSquareArr(row, column);
  const newSquareArr = [];

  for (const square of squareArr) {
    const newSquare = await dbClient.square.create({
      data: {
        row: square.row,
        column: square.column,
        raisedBed: {
          connect: {
            id: raisedBedId,
          },
        },
      },
    });
    newSquareArr.push(newSquare);
  }
  return newSquareArr;
};
