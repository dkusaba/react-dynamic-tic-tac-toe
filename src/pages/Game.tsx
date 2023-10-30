import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import {
  checkLeftDiagonal,
  checkHorizontal,
  checkVertical,
  checkRightDiagonal
} from '../utils/winArrayFinder';

function Game() {
  const { state } = useLocation();
  const { gridSize, numWin } = state;
  const [boardData, setBoardData] = useState(createBoard(gridSize));
  const [player, setPlayer] = useState<string>('O');

  function createBoard(num: number) {
    const gridArr = [];
    for (let i = 0; i < num; i++) {
      gridArr.push([...Array(num)]);
    }
    return gridArr;
  }

  function clickHandler(row: number, col: number) {
    boardData[row][col] = player;
    setBoardData([...boardData]);
    // checkHorizontal(boardData, numWin);
    // checkVertical(boardData, numWin);
    // checkLeftDiagonal(boardData, numWin);
    checkRightDiagonal(boardData, numWin);
    setPlayer(player === 'O' ? 'X' : 'O');
  }

  useEffect(() => {
    // console.log('[gridSize]:', gridSize);
    // console.log('[numWin]:', numWin);
    // console.log(boardData);
  });

  return (
    <div
      className='box-content flex flex-wrap border border-t-1 border-r-0 border-b-0 border-l-1 border-zinc-500'
      style={{
        width: gridSize * 50,
        height: gridSize * 50
      }}
    >
      {boardData.map((row, r) => {
        return row.map((col, c) => {
          return (
            <div
              style={{ width: 50, height: 50 }}
              className='flex justify-center items-center box-border border border-t-0 border-r-1 border-b-1 border-l-0 border-zinc-500'
              key={c}
              onClick={() => {
                if (!boardData[r][c]) {
                  clickHandler(r, c);
                }
              }}
            >
              {col && col === 'O' ? (
                <FontAwesomeIcon icon={faCircle} size='xl' />
              ) : null}
              {col && col === 'X' ? (
                <FontAwesomeIcon icon={faXmark} size='2xl' />
              ) : null}
            </div>
          );
        });
      })}
    </div>
  );
}

export default Game;
