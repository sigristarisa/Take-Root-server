const dbClient = require("../helpers/dbClient");

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

const createSquares = async (raisedBedId, row, column) => {
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

const updateSquare = async (squareId, plantId) => {
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

const findSquareById = async (squareId) => {
  const foundSquare = await dbClient.square.findFirst({
    where: { id: squareId },
    include: { plant: true },
  });
  return foundSquare;
};

const findNearbySquareId = (square, firstId, lastId, maxRow, maxColumn) => {
  const nearbySquareIdArr = [];
  const id = square.id;
  const row = square.row + 1;
  const column = square.column + 1;
  const left = id - 1;
  const right = id + 1;
  const top = id - maxColumn;
  const bottom = id + maxColumn;

  if (id === firstId) {
    nearbySquareIdArr.push(right, bottom);
  } else if (id === lastId) {
    nearbySquareIdArr.push(left, top);
  } else if (row === 1 && column === maxColumn) {
    nearbySquareIdArr.push(left, bottom);
  } else if (row === maxRow && column === 1) {
    nearbySquareIdArr.push(right, top);
  } else if (row === 1 && column !== maxColumn) {
    nearbySquareIdArr.push(left, right, bottom);
  } else if (row !== maxRow && column === 1) {
    nearbySquareIdArr.push(top, right, bottom);
  } else if (row === maxRow && column !== maxColumn) {
    nearbySquareIdArr.push(left, right, top);
  } else if (row !== maxRow && column === maxColumn) {
    nearbySquareIdArr.push(left, top, bottom);
  } else {
    nearbySquareIdArr.push(left, right, top, bottom);
  }

  return nearbySquareIdArr;
};

const findNearbySquaresPlantId = async (nearbySquareIds) => {
  const nearbySquares = [];

  for (const nearbySquareId of nearbySquareIds) {
    const foundSquare = await dbClient.square.findFirst({
      where: {
        id: nearbySquareId,
      },
    });
    nearbySquares.push(foundSquare.plantId);
  }

  return nearbySquares;
};

const deleteAllPlantIdsByRaisedBedId = async (raisedBedId) => {
  const deletingSquares = await dbClient.square.updateMany({
    where: { raisedBedId },
    data: {
      plantId: null,
    },
  });

  return deletingSquares;
};

const deleteAllSquaresByRaisedBedId = async (raisedBedId) => {
  const deletingSquares = await dbClient.square.deleteMany({
    where: { raisedBedId },
  });

  return deletingSquares;
};

module.exports = {
  createSquares,
  updateSquare,
  findSquareById,
  findNearbySquareId,
  findNearbySquaresPlantId,
  deleteAllPlantIdsByRaisedBedId,
  deleteAllSquaresByRaisedBedId,
};
