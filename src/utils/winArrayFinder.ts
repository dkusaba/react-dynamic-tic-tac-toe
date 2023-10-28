interface diagonalCell {
  x: number;
  y: number;
  data: string | undefined;
}

export const checkHorizontal = (gridArr, numWin: number) => {
  for (let i = 0; i < gridArr.length; i++) {
    let count = 1;
    for (let x = 0; x < gridArr[i].length - 1; x++) {
      for (let y = x + 1; y < gridArr[i].length; y++) {
        if (
          typeof gridArr[i][x] === 'string' &&
          gridArr[i][x] === gridArr[i][y]
        ) {
          count++;
          if (count >= numWin) {
            const xData = [];
            if (gridArr.length - 1 > y) {
              for (let z = 1; z <= gridArr.length - y; z++) {
                if (gridArr[i][y] === gridArr[i][y + z]) {
                  xData.push({ x: y + z, y: i });
                }
              }
            }
            if (y !== 0) {
              for (let z = 0; z <= y; z++) {
                if (gridArr[i][y] === gridArr[i][z]) {
                  xData.push({ x: z, y: i });
                }
              }
            }
            console.log('[i]:', i);
            console.log('[xData]:', xData);
            console.log('A player won');
            console.log(gridArr[i][y] === 'O' ? 'O' : 'X');
            break;
          }
        } else {
          count = 1;
        }
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
      for (let y = x + 1; y < vArr[i].length; y++) {
        if (typeof vArr[i][x] === 'string' && vArr[i][x] === vArr[i][y]) {
          count++;
          if (count >= numWin) {
            const yData = [];
            if (vArr.length - 1 > y) {
              for (let z = 1; z <= vArr.length - y; z++) {
                if (vArr[i][y] === vArr[i][y + z]) {
                  yData.push({ x: i, y: y + z });
                }
              }
            }
            if (y !== 0) {
              for (let z = 0; z <= y; z++) {
                if (vArr[i][y] === vArr[i][z]) {
                  yData.push({ x: i, y: z });
                }
              }
            }
            console.log('[i]:', i);
            console.log('[yData]:', yData);
            console.log('A player won');
            console.log(vArr[i][y] === 'O' ? 'O' : 'X');
            return yData;
          }
        } else {
          count = 1;
        }
      }
    }
  }
};

export const checkLeftDiagonal = (gridArr, numWin) => {
  // create arrays of diagonal lines
  const linesArr = [];
  for (let i = 0; i < (gridArr.length - numWin) * 2 + 1; i++) {
    const diagonalCell: diagonalCell[] = [];
    linesArr.push(diagonalCell);
  }
  for (let i = 0; i < Math.floor(linesArr.length / 2); i++) {
    for (let x = 0; x < numWin + i; x++) {
      linesArr[i].push({
        x: x,
        y: numWin - 1 + i - x,
        data: gridArr[numWin - 1 + i - x][x]
      });
    }
  }
  for (let i = 0; i < gridArr.length; i++) {
    linesArr[Math.floor(linesArr.length / 2)].push({
      x: i,
      y: gridArr.length - 1 - i,
      data: gridArr[gridArr.length - 1 - i][i]
    });
  }
  for (let i = 0; i < Math.floor(linesArr.length / 2); i++) {
    for (let x = 0; x < gridArr.length - 1 - i; x++) {
      linesArr[i + Math.ceil(linesArr.length / 2)].push({
        x: i + 1 + x,
        y: gridArr.length - 1 - x,
        data: gridArr[gridArr.length - 1 - x][i + 1 + x]
      });
    }
  }

  console.log(linesArr);
};
