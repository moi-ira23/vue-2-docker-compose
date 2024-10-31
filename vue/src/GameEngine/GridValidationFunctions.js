const mapValidator = {
  validateFlower(mapMatrix) {
    const flowerValueList = [8, 9];
    let status = "Всё ок";

    let flowerFound = false;
    let flowerPositions = [];

    for (let row = 0; row < mapMatrix.length; row++) {
      for (let col = 0; col < mapMatrix[row].length; col++) {
        if (flowerValueList.includes(mapMatrix[row][col])) {
          flowerFound = true;
          flowerPositions.push([row, col]);
          break;
        }
      }
      if (flowerFound) break;
    }

    if (!flowerFound) {
      return "На карте нет цветка.";
    }

    const matrixCopy = mapMatrix.map((row) => row.slice());
    const [startRow, startCol] = flowerPositions[0];

    const visitedValue = -1;
    const bfs = (row, col) => {
      const queue = [[row, col]];
      matrixCopy[row][col] = visitedValue;

      const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];

      while (queue.length > 0) {
        const [curRow, curCol] = queue.shift();

        for (let [dRow, dCol] of directions) {
          const newRow = curRow + dRow;
          const newCol = curCol + dCol;

          if (
            newRow >= 0 &&
            newRow < matrixCopy.length &&
            newCol >= 0 &&
            newCol < matrixCopy[0].length &&
            flowerValueList.includes(matrixCopy[newRow][newCol])
          ) {
            matrixCopy[newRow][newCol] = visitedValue;
            queue.push([newRow, newCol]);
          }
        }
      }
    };

    bfs(startRow, startCol);

    for (let row = 0; row < matrixCopy.length; row++) {
      for (let col = 0; col < matrixCopy[row].length; col++) {
        if (flowerValueList.includes(matrixCopy[row][col])) {
          return "Цветок должен быть единым целым";
        }
      }
    }

    return status;
  },

  validateWall(mapMatrix) {
    const airValue = 1;
    const wallValue = 2;
    const waterValue = 6;
    const visitedValue = -1;
    const allowedBorderCellTypeList = [airValue, wallValue, waterValue];
    let status = "Всё ок";

    const rows = mapMatrix.length;
    const cols = mapMatrix[0].length;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (row === 0 || row === rows - 1 || col === 0 || col === cols - 1) {
          if (!allowedBorderCellTypeList.includes(mapMatrix[row][col])) {
            return "Краями карты могут быть только воздух, стена или вода";
          }
        }
      }
    }

    const matrixCopy = mapMatrix.map((row) => row.slice());

    const bfs = (startRow, startCol) => {
      const queue = [[startRow, startCol]];
      matrixCopy[startRow][startCol] = visitedValue;

      const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];

      while (queue.length > 0) {
        const [curRow, curCol] = queue.shift();

        for (let [dRow, dCol] of directions) {
          const newRow = curRow + dRow;
          const newCol = curCol + dCol;

          if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
            const currentValue = matrixCopy[newRow][newCol];
            if (currentValue === airValue) {
              matrixCopy[newRow][newCol] = visitedValue;
              queue.push([newRow, newCol]);
            } else if (
              !allowedBorderCellTypeList.includes(currentValue) &&
              currentValue !== visitedValue
            ) {
              return "Стены и вода должны закрывать все проходы к воздуху";
            }
          }
        }
      }
      return null;
    };

    let foundAir = true;
    while (foundAir) {
      foundAir = false;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (matrixCopy[row][col] === airValue) {
            const result = bfs(row, col);
            if (result) return result;
            foundAir = true;
            break;
          }
        }
        if (foundAir) break;
      }
    }

    return status;
  },

  validatePot(mapMatrix) {
    const potValueList = [7, 9];
    const matrixCellList = mapMatrix.flat();
    const containsPot = potValueList.some((cellType) =>
      matrixCellList.includes(cellType)
    );
    return containsPot ? "Всё ок" : "Клетки горшка нет на карте";
  },
};

export default mapValidator;
