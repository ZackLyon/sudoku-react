import React from 'react';

export default function GuessTile({
  id,
  selected,
  guess,
  correct,
  handleSelect,
}) {
  return (
    <div className='digit'>
      {selected ? console.log('guess ', guess, 'correct ', correct) : null}
      <button
        className={selected ? 'tile-selected' : 'input-box'}
        onClick={() => handleSelect(id)}
      >
        {guess ? guess : ''}
      </button>
    </div>
  );
}
