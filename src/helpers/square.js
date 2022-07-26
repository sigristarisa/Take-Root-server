const createRowColumn = (num, direction) => {
  const rowColumnArr = [];
  for (let i = 0; i < num; i++) {
    let rowColumnObj = {};
    rowColumnObj[direction] = i;
    rowColumnArr.push(rowColumnObj);
  }
  return rowColumnArr;
};

export const createSquareArr = (rows, columns) => {
  const rowArr = createRowColumn(rows, "row");
  const columnArr = createRowColumn(columns, "column");

  const squaresArr = rowArr.flatMap(({ row }) =>
    columnArr.map((column) => ({ ...column, row }))
  );
  return squaresArr;
};
