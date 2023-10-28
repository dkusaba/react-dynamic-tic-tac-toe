import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NumSelect from '../components/NumSelect';

function Home() {
  const [gridSize, setGridSize] = useState<number>(3);
  const [numWin, setNumWin] = useState<number>(3);

  return (
    <div>
      <p>Enter grid size</p>
      <NumSelect
        num={20}
        onChange={(e: React.FormEvent<HTMLSelectElement>) => {
          setGridSize(+(e.target as HTMLSelectElement).value);
        }}
      />
      <p>Enter the number of consecutive O's X's required to win</p>
      <NumSelect
        num={gridSize}
        onChange={(e: React.FormEvent<HTMLSelectElement>) => {
          setNumWin(+(e.target as HTMLSelectElement).value);
        }}
      />
      <br />
      <button
        onClick={() => {
          console.log('[gridSize]:', gridSize);
          console.log('[numWin]:', numWin);
        }}
      >
        <Link to='./game' state={{ gridSize, numWin }}>
          Play Game
        </Link>
      </button>
    </div>
  );
}

export default Home;
