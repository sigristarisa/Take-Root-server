const createRowColumn = (num, direction) => {
  const rowArr = [];
  for (let i = 0; i < num; i++) {
    let rowObj = {};
    rowObj[direction] = i;
    rowArr.push(rowObj);
  }
  return rowArr;
};

const createSquareArr = (rows, columns) => {
  const rowArr = createRowColumn(rows, "row");
  const columnArr = createRowColumn(columns, "column");

  const squaresArr = rowArr.flatMap(({ row }) =>
    columnArr.map((column) => ({ ...column, row }))
  );
  return squaresArr;
};

console.log(createSquareArr(3, 3));
