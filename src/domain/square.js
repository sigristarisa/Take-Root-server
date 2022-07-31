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

export const findNearbySquareId = (
  square,
  firstId,
  lastId,
  maxRow,
  maxColumn
) => {
  const nearbySquareIdArr = [];
  const id = square.id;
  const row = square.row + 1;
  const column = square.column + 1;
  const left = id - 1;
  const right = id + 1;
  const top = id - maxColumn;
  const bottom = id + maxColumn;
  console.log({ left, right, top, bottom });

  if (id === firstId) {
    console.log("first");
    nearbySquareIdArr.push(right, bottom);
  } else if (id === lastId) {
    console.log("second");
    nearbySquareIdArr.push(left, top);
  } else if (row === 0 && column === maxColumn) {
    console.log("third");
    nearbySquareIdArr.push(left, bottom);
  } else if (row === maxRow && column === 0) {
    console.log("fourth");
    nearbySquareIdArr.push(right, top);
  } else if (row === 0 && column !== maxColumn) {
    console.log("fifth");
    nearbySquareIdArr.push(left, right, bottom);
  } else if (row !== maxRow && column === 0) {
    console.log("sixth");
    nearbySquareIdArr.push(top, right, bottom);
  } else if (row === maxRow && column !== maxColumn) {
    console.log("seventh");
    nearbySquareIdArr.push(left, right, top);
  } else if (row !== maxRow && column === maxColumn) {
    console.log("ninth");
    nearbySquareIdArr.push(left, top, bottom);
  } else {
    console.log("tenth");
    nearbySquareIdArr.push(left, right, top, bottom);
  }

  return nearbySquareIdArr;
};

export const findNearbySquaresPlantId = async (nearbySquareIds) => {
  const nearbySquares = [];

  for (const nearbySquareId of nearbySquareIds) {
    const foundSquare = await dbClient.square.findFirst({
      where: {
        id: nearbySquareId,
      },
    });
    console.log("foundSquare", foundSquare);
    nearbySquares.push(foundSquare.plantId);
  }

  return nearbySquares;
};
