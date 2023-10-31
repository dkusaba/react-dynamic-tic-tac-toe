interface diagonalCell {
  x: number;
  y: number;
  data: string | undefined;
}

type Cell = 'O' | 'X' | undefined;
type Row = Cell[];
type Board = Row[];

const checkHorizontal = (boardData: Board, numWin: number) => {
  for (let i = 0; i < boardData.length; i++) {
    let count = 1;
    for (let x = 0; x < boardData[i].length - 1; x++) {
      if (
        typeof boardData[i][x] === 'string' &&
        boardData[i][x] === boardData[i][x + 1]
      ) {
        count++;
        if (count >= numWin) {
          const data = [];
          for (let z = x; z >= 0; z--) {
            if (boardData[i][x] === boardData[i][z]) {
              data.push({ x: z, y: i });
            } else {
              break;
            }
          }
          for (let z = x + 1; z <= boardData.length; z++) {
            if (boardData[i][x + 1] === boardData[i][z]) {
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

const checkVertical = (boardData: Board, numWin: number) => {
  // build an array of vertical lines
  const vArr = [];
  for (let i = 0; i < boardData.length; i++) {
    vArr.push([...Array(boardData.length)]);
  }

  for (let i = 0; i < boardData.length; i++) {
    for (let x = 0; x < boardData[i].length; x++) {
      vArr[x][i] = boardData[i][x];
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

const checkLeftDiagonal = (boardData: Board, numWin: number) => {
  // build an array of diagonal lines
  const diagArr = [];
  for (let i = 0; i < (boardData.length - numWin) * 2 + 1; i++) {
    const diagonalCell: diagonalCell[] = [];
    diagArr.push(diagonalCell);
  }
  for (let i = 0; i < Math.floor(diagArr.length / 2); i++) {
    for (let x = 0; x < numWin + i; x++) {
      diagArr[i].push({
        x: x,
        y: numWin - 1 + i - x,
        data: boardData[numWin - 1 + i - x][x]
      });
    }
  }
  for (let i = 0; i < boardData.length; i++) {
    diagArr[Math.floor(diagArr.length / 2)].push({
      x: i,
      y: boardData.length - 1 - i,
      data: boardData[boardData.length - 1 - i][i]
    });
  }
  for (let i = 0; i < Math.floor(diagArr.length / 2); i++) {
    for (let x = 0; x < boardData.length - 1 - i; x++) {
      diagArr[i + Math.ceil(diagArr.length / 2)].push({
        x: i + 1 + x,
        y: boardData.length - 1 - x,
        data: boardData[boardData.length - 1 - x][i + 1 + x]
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

const checkRightDiagonal = (boardData: Board, numWin: number) => {
  // build an array of diagonal lines
  const diagArr = [];
  for (let i = 0; i < (boardData.length - numWin) * 2 + 1; i++) {
    const diagonalCell: diagonalCell[] = [];
    diagArr.push(diagonalCell);
  }
  for (let i = 0; i < Math.floor(diagArr.length / 2); i++) {
    for (let x = 0; x < numWin + i; x++) {
      diagArr[i].push({
        x: boardData.length - 1 - x,
        y: numWin - 1 + i - x,
        data: boardData[numWin - 1 + i - x][boardData.length - 1 - x]
      });
    }
  }
  for (let i = 0; i < boardData.length; i++) {
    diagArr[Math.floor(diagArr.length / 2)].push({
      x: boardData.length - 1 - i,
      y: boardData.length - 1 - i,
      data: boardData[boardData.length - 1 - i][boardData.length - 1 - i]
    });
  }
  for (let i = 0; i < Math.floor(diagArr.length / 2); i++) {
    for (let x = 0; x < boardData.length - 1 - i; x++) {
      diagArr[i + Math.ceil(diagArr.length / 2)].push({
        x: boardData.length - i - x - 2,
        y: boardData.length - 1 - x,
        data: boardData[boardData.length - 1 - x][boardData.length - i - x - 2]
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

export const checkWin = (boardData: Board, numWin: number) => {
  const horizontal = checkHorizontal(boardData, numWin);
  if (horizontal && horizontal.length > 0) {
    return horizontal;
  }
  const vertical = checkVertical(boardData, numWin);
  if (vertical && vertical.length > 0) {
    return vertical;
  }
  const leftDiagonal = checkLeftDiagonal(boardData, numWin);
  if (leftDiagonal && leftDiagonal.length > 0) {
    return leftDiagonal;
  }
  const rightDiagonal = checkRightDiagonal(boardData, numWin);
  if (rightDiagonal && rightDiagonal.length > 0) {
    return rightDiagonal;
  }
};
