import React from 'react';

interface NumSelectProps {
  num: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const NumSelect: React.FC<NumSelectProps> = ({ num, onChange }) => {
  function buildOptions() {
    const options = [];
    for (let i = 3; i <= num; i++) {
      options.push(i);
    }
    return options;
  }

  return (
    <select onChange={onChange}>
      {buildOptions().map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default NumSelect;
