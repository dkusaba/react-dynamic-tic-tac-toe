import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { checkWin } from '../utils/checkWin';

function Game() {
  const { state } = useLocation();
  const { boardSize, numWin } = state;
  const [boardData, setBoardData] = useState(createBoard(boardSize));
  const [player, setPlayer] = useState<string>('O');
  const [gameOver, setGameOver] = useState<boolean>(false);

  function createBoard(num: number) {
    const board = [];
    for (let i = 0; i < num; i++) {
      board.push([...Array(num)]);
    }
    return board;
  }

  function clickHandler(row: number, col: number) {
    boardData[row][col] = player;
    setBoardData([...boardData]);
    const winner = checkWin(boardData, numWin);
    if (winner && winner.length > 0) {
      console.log('[winner]:', winner);
      setGameOver(true);
      for (let i = 0; i < winner.length; i++) {
        const div = window.document.querySelector(
          `[data-x="${winner[i].x}"][data-y="${winner[i].y}"]`
        )!;
        div.classList.add('bg-red-800');
      }
      return;
    }
    setPlayer(player === 'O' ? 'X' : 'O');
  }

  function resetHandler() {
    setBoardData(createBoard(boardSize));
    setPlayer('O');
    setGameOver(false);
    const cells = document.querySelectorAll('.bg-red-800');
    cells.forEach((cell) => {
      cell.classList.remove('bg-red-800');
    });
  }

  return (
    <>
      <p className='text-xl text-color-zinc-500 uppercase '>
        {gameOver ? (
          <span className='text-red-500'>{player} wins</span>
        ) : (
          player + "'s turn"
        )}
      </p>
      <div
        className='box-content mx-auto justify-center items-center flex flex-wrap border border-t-1 border-r-0 border-b-0 border-l-1 border-zinc-500'
        style={{
          width: boardSize * 50,
          height: boardSize * 50
        }}
      >
        {boardData.map((row, r) => {
          return row.map((col, c) => {
            return (
              <div
                style={{ width: 50, height: 50 }}
                className='cell flex justify-center items-center box-border border border-t-0 border-r-1 border-b-1 border-l-0 border-zinc-500'
                data-x={c}
                data-y={r}
                key={c}
                onClick={() => {
                  if (!boardData[r][c] && !gameOver) {
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
      <div className='w-96 flex justify-between mt-10 mx-auto '>
        <Link
          className='bg-blue-900 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 hover:text-white'
          to='/'
        >
          Change Board Size
        </Link>
        <button
          onClick={resetHandler}
          className='bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          {gameOver ? 'Play Again' : 'Start Over / Reset'}
        </button>
      </div>
    </>
  );
}

export default Game;
