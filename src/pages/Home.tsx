import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NumSelect from '../components/NumSelect';

function Home() {
  const [boardSize, setBoardSize] = useState<number>(3);
  const [numWin, setNumWin] = useState<number>(3);

  return (
    <div>
      <p>Select board size (rows x columns)</p>
      <NumSelect
        num={20}
        onChange={(e: React.FormEvent<HTMLSelectElement>) => {
          setBoardSize(+(e.target as HTMLSelectElement).value);
        }}
      />
      <p>Select the number of consecutive O's X's required to win</p>
      <NumSelect
        num={boardSize}
        onChange={(e: React.FormEvent<HTMLSelectElement>) => {
          setNumWin(+(e.target as HTMLSelectElement).value);
        }}
      />
      <br />
      <button
        onClick={() => {
          console.log('[boardSize]:', boardSize);
          console.log('[numWin]:', numWin);
        }}
      >
        <Link to='./game' state={{ boardSize, numWin }}>
          Play Game
        </Link>
      </button>
    </div>
  );
}

export default Home;
