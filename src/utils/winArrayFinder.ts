interface diagonalCell {
  x: number;
  y: number;
  data: string | undefined;
}

export const checkHorizontal = (gridArr, numWin: number) => {
  for (let i = 0; i < gridArr.length; i++) {
    let count = 1;
    for (let x = 0; x < gridArr[i].length - 1; x++) {
      if (
        typeof gridArr[i][x] === 'string' &&
        gridArr[i][x] === gridArr[i][x + 1]
      ) {
        count++;
        if (count >= numWin) {
          const xData = [];
          if (gridArr.length - 1 > x + 1) {
            for (let z = 1; z <= gridArr.length - x + 1; z++) {
              if (gridArr[i][x + 1] === gridArr[i][x + 1 + z]) {
                xData.push({ x: x + 1 + z, y: i });
              }
            }
          }
          if (x + 1 !== 0) {
            for (let z = 0; z <= x + 1; z++) {
              if (gridArr[i][x + 1] === gridArr[i][z]) {
                xData.push({ x: z, y: i });
              }
            }
          }
          console.log('[i]:', i);
          console.log('[xData]:', xData);
          console.log('A player won');
          console.log(gridArr[i][x + 1] === 'O' ? 'O' : 'X');
          return {
            winner: gridArr[i][x + 1] === 'O' ? 'O' : 'X',
            data: xData
          };
        }
      } else {
        count = 1;
      }
    }
  }
};

export const checkVertical = (gridArr, numWin: number) => {
  // build new array
  const vArr = [];
  for (let i = 0; i < gridArr.length; i++) {
    vArr.push([...Array(gridArr.length)]);
  }

  for (let i = 0; i < gridArr.length; i++) {
    for (let x = 0; x < gridArr[i].length; x++) {
      vArr[x][i] = gridArr[i][x];
    }
  }

  for (let i = 0; i < vArr.length; i++) {
    let count = 1;
    for (let x = 0; x < vArr[i].length - 1; x++) {
      if (typeof vArr[i][x] === 'string' && vArr[i][x] === vArr[i][x + 1]) {
        count++;
        if (count >= numWin) {
          const yData = [];
          if (vArr.length - 1 > x + 1) {
            for (let z = 1; z <= vArr.length - x + 1; z++) {
              if (vArr[i][x + 1] === vArr[i][x + 1 + z]) {
                yData.push({ x: i, y: x + 1 + z });
              }
            }
          }
          if (x + 1 !== 0) {
            for (let z = 0; z <= x + 1; z++) {
              if (vArr[i][x + 1] === vArr[i][z]) {
                yData.push({ x: i, y: z });
              }
            }
          }
          console.log('[i]:', i);
          console.log('[yData]:', yData);
          console.log('A player won');
          console.log(vArr[i][x + 1] === 'O' ? 'O' : 'X');
          return {
            winner: vArr[i][x + 1] === 'O' ? 'O' : 'X',
            data: yData
          };
        }
      } else {
        count = 1;
      }
    }
  }
};

export const checkLeftDiagonal = (gridArr, numWin) => {
  // build arrays of diagonal lines
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

  for (let i = 0; i < diagArr.length; i++) {
    let count = 1;
    for (let x = 0; x < diagArr[i].length - 1; x++) {
      if (
        typeof diagArr[i][x].data === 'string' &&
        diagArr[i][x].data === diagArr[i][x + 1].data
      ) {
        count++;
        if (count >= numWin) {
          console.log('[count]:', count);
          const data = [];
          if (diagArr[i][x - 1]) {
            for (let z = x; z >= 0; z--) {
              if (diagArr[i][x - z].data === diagArr[i][x].data) {
                data.push({
                  x: diagArr[i][x - z].x,
                  y: diagArr[i][x - z].y
                });
              }
            }
          }
          if (diagArr[i][x + 2]) {
            for (let z = x + 1; z < diagArr[i].length; z++) {
              if (diagArr[i][x + 1].data === diagArr[i][z].data) {
                data.push({
                  x: diagArr[i][z].x,
                  y: diagArr[i][z].y
                });
              }
            }
          }
          // console.log('[i]:', i);
          // console.log('[data]:', data);
          console.log('A player won');
          console.log(diagArr[i][x + 1].data === 'O' ? 'O' : 'X');
          return {
            winner: diagArr[i][x + 1].data === 'O' ? 'O' : 'X',
            data
          };
        }
      } else {
        count = 1;
      }
    }
  }
};

export const checkRightDiagonal = (gridArr, numWin) => {
  // build arrays of diagonal lines
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

  for (let i = 0; i < diagArr.length; i++) {
    let count = 1;
    for (let x = 0; x < diagArr[i].length - 1; x++) {
      if (
        typeof diagArr[i][x].data === 'string' &&
        diagArr[i][x].data === diagArr[i][x + 1].data
      ) {
        count++;
        if (count >= numWin) {
          console.log('[count]:', count);
          const data = [];
          if (diagArr[i][x - 1]) {
            for (let z = x; z >= 0; z--) {
              if (diagArr[i][x - z].data === diagArr[i][x].data) {
                data.push({
                  x: diagArr[i][x - z].x,
                  y: diagArr[i][x - z].y
                });
              }
            }
          }
          if (diagArr[i][x + 2]) {
            for (let z = x + 1; z < diagArr[i].length; z++) {
              if (diagArr[i][x + 1].data === diagArr[i][z].data) {
                data.push({
                  x: diagArr[i][z].x,
                  y: diagArr[i][z].y
                });
              }
            }
          }
          console.log('[i]:', i);
          console.log('[data]:', data);
          console.log('A player won');
          console.log(diagArr[i][x + 1].data === 'O' ? 'O' : 'X');
          return {
            winner: diagArr[i][x + 1].data === 'O' ? 'O' : 'X',
            data
          };
        }
      } else {
        count = 1;
      }
    }
  }

  console.log(diagArr);
};

export const checkWin = (gridArr, numWin) => {
  const horizontal = checkHorizontal(gridArr, numWin);
  if (horizontal && horizontal.winner) {
    return horizontal;
  }
  const vertical = checkVertical(gridArr, numWin);
  if (vertical && vertical.winner) {
    return vertical;
  }
  const leftDiagonal = checkLeftDiagonal(gridArr, numWin);
  if (leftDiagonal && leftDiagonal.winner) {
    return leftDiagonal;
  }
  const rightDiagonal = checkRightDiagonal(gridArr, numWin);
  if (rightDiagonal && rightDiagonal.winner) {
    return rightDiagonal;
  }
};
