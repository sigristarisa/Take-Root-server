const calculateSquares = (length, height, unit) => {
  let rows;
  let columns;
  if (unit === "cm") {
    rows = Math.floor(height / 30);
    columns = Math.floor(length / 30);
  }
  if (unit === "feet") {
    rows = Math.floor(height);
    columns = Math.floor(length);
  }
  return { rows, columns };
};

console.log(calculateSquares(8, 6, "feet"));
