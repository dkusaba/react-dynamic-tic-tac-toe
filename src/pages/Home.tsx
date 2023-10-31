import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NumSelect from '../components/NumSelect';

function Home() {
  const [boardSize, setBoardSize] = useState<number>(3);
  const [numWin, setNumWin] = useState<number>(3);

  return (
    <div>
      <h1 className='text-3xl uppercase mb-8'>Dynamic Tic-Tac-Toe</h1>
      <p className='text-lg'>Select board size (rows x columns)</p>
      <NumSelect
        num={20}
        grid={true}
        onChange={(e: React.FormEvent<HTMLSelectElement>) => {
          setBoardSize(+(e.target as HTMLSelectElement).value);
        }}
      />
      <p className='text-lg'>
        Select the number of consecutive O's X's required to win
      </p>
      <NumSelect
        num={boardSize}
        onChange={(e: React.FormEvent<HTMLSelectElement>) => {
          setNumWin(+(e.target as HTMLSelectElement).value);
        }}
      />
      <br />
      <Link
        className='bg-blue-900 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 hover:text-white'
        to='/react-dynamic-tic-tac-toe/game'
        state={{ boardSize, numWin }}
      >
        Play Game
      </Link>
    </div>
  );
}

export default Home;
