interface diagonalCell {
  x: number;
  y: number;
  data: string | undefined;
}

const checkHorizontal = (gridArr, numWin: number) => {
  for (let i = 0; i < gridArr.length; i++) {
    let count = 1;
    for (let x = 0; x < gridArr[i].length - 1; x++) {
      if (
        typeof gridArr[i][x] === 'string' &&
        gridArr[i][x] === gridArr[i][x + 1]
      ) {
        count++;
        if (count >= numWin) {
          const data = [];
          for (let z = x; z >= 0; z--) {
            if (gridArr[i][x] === gridArr[i][z]) {
              data.push({ x: z, y: i });
            } else {
              break;
            }
          }
          for (let z = x + 1; z <= gridArr.length; z++) {
            if (gridArr[i][x + 1] === gridArr[i][z]) {
              data.push({ x: z, y: i });
            } else {
              break;
            }
          }
          return data;
        }
      } else {
        count = 1;
      }
    }
  }
};

const checkVertical = (gridArr, numWin: number) => {
  // build an array of vertical lines
  const vArr = [];
  for (let i = 0; i < gridArr.length; i++) {
    vArr.push([...Array(gridArr.length)]);
  }

  for (let i = 0; i < gridArr.length; i++) {
    for (let x = 0; x < gridArr[i].length; x++) {
      vArr[x][i] = gridArr[i][x];
    }
  }

  // parse through newly created vertical array
  for (let i = 0; i < vArr.length; i++) {
    let count = 1;
    for (let x = 0; x < vArr[i].length - 1; x++) {
      if (typeof vArr[i][x] === 'string' && vArr[i][x] === vArr[i][x + 1]) {
        count++;
        if (count >= numWin) {
          const data = [];
          for (let z = x; z >= 0; z--) {
            if (vArr[i][x] === vArr[i][z]) {
              data.push({ x: i, y: z });
            } else {
              break;
            }
          }
          for (let z = x + 1; z <= vArr.length; z++) {
            if (vArr[i][x + 1] === vArr[i][z]) {
              data.push({ x: i, y: z });
            } else {
              break;
            }
          }
          return data;
        }
      } else {
        count = 1;
      }
    }
  }
};

const checkLeftDiagonal = (gridArr, numWin) => {
  // build an array of diagonal lines
  const diagArr = [];
  for (let i = 0; i < (gridArr.length - numWin) * 2 + 1; i++) {
    const diagonalCell: diagonalCell[] = [];
    diagArr.push(diagonalCell);
  }
  for (let i = 0; i < Math.floor(diagArr.length / 2); i++) {
    for (let x = 0; x < numWin + i; x++) {
      diagArr[i].push({
        x: x,
        y: numWin - 1 + i - x,
        data: gridArr[numWin - 1 + i - x][x]
      });
    }
  }
  for (let i = 0; i < gridArr.length; i++) {
    diagArr[Math.floor(diagArr.length / 2)].push({
      x: i,
      y: gridArr.length - 1 - i,
      data: gridArr[gridArr.length - 1 - i][i]
    });
  }
  for (let i = 0; i < Math.floor(diagArr.length / 2); i++) {
    for (let x = 0; x < gridArr.length - 1 - i; x++) {
      diagArr[i + Math.ceil(diagArr.length / 2)].push({
        x: i + 1 + x,
        y: gridArr.length - 1 - x,
        data: gridArr[gridArr.length - 1 - x][i + 1 + x]
      });
    }
  }

  // parse through newly created array
  for (let i = 0; i < diagArr.length; i++) {
    let count = 1;
    for (let x = 0; x < diagArr[i].length - 1; x++) {
      if (
        typeof diagArr[i][x].data === 'string' &&
        diagArr[i][x].data === diagArr[i][x + 1].data
      ) {
        count++;
        if (count >= numWin) {
          const data = [];
          for (let z = x; z >= 0; z--) {
            if (diagArr[i][x].data === diagArr[i][z].data) {
              data.push({
                x: diagArr[i][z].x,
                y: diagArr[i][z].y
              });
            } else {
              break;
            }
          }
          for (let z = x + 1; z < diagArr[i].length; z++) {
            if (diagArr[i][x + 1].data === diagArr[i][z].data) {
              data.push({
                x: diagArr[i][z].x,
                y: diagArr[i][z].y
              });
            } else {
              break;
            }
          }
          return data;
        }
      } else {
        count = 1;
      }
    }
  }
};

const checkRightDiagonal = (gridArr, numWin) => {
  // build an array of diagonal lines
  const diagArr = [];
  for (let i = 0; i < (gridArr.length - numWin) * 2 + 1; i++) {
    const diagonalCell: diagonalCell[] = [];
    diagArr.push(diagonalCell);
  }
  for (let i = 0; i < Math.floor(diagArr.length / 2); i++) {
    for (let x = 0; x < numWin + i; x++) {
      diagArr[i].push({
        x: gridArr.length - 1 - x,
        y: numWin - 1 + i - x,
        data: gridArr[numWin - 1 + i - x][gridArr.length - 1 - x]
      });
    }
  }
  for (let i = 0; i < gridArr.length; i++) {
    diagArr[Math.floor(diagArr.length / 2)].push({
      x: gridArr.length - 1 - i,
      y: gridArr.length - 1 - i,
      data: gridArr[gridArr.length - 1 - i][gridArr.length - 1 - i]
    });
  }
  for (let i = 0; i < Math.floor(diagArr.length / 2); i++) {
    for (let x = 0; x < gridArr.length - 1 - i; x++) {
      diagArr[i + Math.ceil(diagArr.length / 2)].push({
        x: gridArr.length - i - x - 2,
        y: gridArr.length - 1 - x,
        data: gridArr[gridArr.length - 1 - x][gridArr.length - i - x - 2]
      });
    }
  }
  // parse through newly created diagonal array
  for (let i = 0; i < diagArr.length; i++) {
    let count = 1;
    for (let x = 0; x < diagArr[i].length - 1; x++) {
      if (
        typeof diagArr[i][x].data === 'string' &&
        diagArr[i][x].data === diagArr[i][x + 1].data
      ) {
        count++;
        if (count >= numWin) {
          const data = [];
          for (let z = x; z >= 0; z--) {
            if (diagArr[i][x].data === diagArr[i][z].data) {
              data.push({
                x: diagArr[i][z].x,
                y: diagArr[i][z].y
              });
            } else {
              break;
            }
          }
          for (let z = x + 1; z < diagArr[i].length; z++) {
            if (diagArr[i][x + 1].data === diagArr[i][z].data) {
              data.push({
                x: diagArr[i][z].x,
                y: diagArr[i][z].y
              });
            } else {
              break;
            }
          }
          return data;
        }
      } else {
        count = 1;
      }
    }
  }
};

export const checkWin = (gridArr, numWin) => {
  const horizontal = checkHorizontal(gridArr, numWin);
  if (horizontal && horizontal.length > 0) {
    return horizontal;
  }
  const vertical = checkVertical(gridArr, numWin);
  if (vertical && vertical.length > 0) {
    return vertical;
  }
  const leftDiagonal = checkLeftDiagonal(gridArr, numWin);
  if (leftDiagonal && leftDiagonal.length > 0) {
    return leftDiagonal;
  }
  const rightDiagonal = checkRightDiagonal(gridArr, numWin);
  if (rightDiagonal && rightDiagonal.length > 0) {
    return rightDiagonal;
  }
};
