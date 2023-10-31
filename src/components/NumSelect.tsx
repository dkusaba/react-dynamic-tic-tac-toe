import React from 'react';

interface NumSelectProps {
  num: number;
  grid?: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const NumSelect: React.FC<NumSelectProps> = ({ num, grid, onChange }) => {
  function buildOptions() {
    const options = [];
    for (let i = 3; i <= num; i++) {
      options.push(i);
    }
    return options;
  }

  return (
    <select className='p-2 my-8 text-lg' onChange={onChange}>
      {buildOptions().map((option) => (
        <option key={option} value={option}>
          {grid ? `${option}x${option}` : option}
        </option>
      ))}
    </select>
  );
};

export default NumSelect;
