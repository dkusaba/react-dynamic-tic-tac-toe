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
    <select
      className='p-2 my-8 text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      onChange={onChange}
    >
      {buildOptions().map((option) => (
        <option key={option} value={option}>
          {grid ? `${option}x${option}` : option}
        </option>
      ))}
    </select>
  );
};

export default NumSelect;
