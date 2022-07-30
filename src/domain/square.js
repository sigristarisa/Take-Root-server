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

export const updateSquare = async (squareId, plantId) => {
  const updatedSquare = await dbClient.square.update({
    where: { id: squareId },
    data: {
      plant: {
        connect: {
          id: plantId,
        },
      },
    },
  });

  return updatedSquare;
};

export const findSquareById = async (squareId) => {
  const foundSquare = await dbClient.square.findFirst({
    where: { id: squareId },
    include: { plant: true },
  });
  return foundSquare;
};

export const findNearbyRowColumn = (direction) => {
  const nearbyArr = [];

  if (direction === 0) {
    nearbyArr.push(1);
  } else if (direction === 1) {
    nearbyArr.push(0);
  } else {
    nearbyArr.push(direction - 1, direction + 1);
  }

  return nearbyArr;
};

export const findNearbySquares = async (direction, nearbyArr) => {
  const nearbySquares = [];

  for (const nearbySquare of nearbyArr) {
    const foundSquare = await dbClient.square.findFirst({
      where: { [direction]: nearbySquare },
    });
    nearbySquares.push(foundSquare);
  }

  return nearbySquares;
};
