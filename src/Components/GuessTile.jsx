import React from 'react';

export default function GuessTile({
  id,
  selected,
  guess,
  correct,
  cheatMode,
  handleSelect,
}) {
  const select = selected ? 'tile-selected tile' : 'guess-tile tile';
  const cheat =
    !cheatMode || !guess
      ? ''
      : guess === correct
      ? 'cheat-correct'
      : 'cheat-wrong';
  return (
    <button
      className={`tile ${select}, ${cheat}`}
      // className={selected ? 'tile-selected tile' : 'guess-tile tile'}
      // className={guess === correct ? 'cheat-correct' : 'cheat-wrong'}
      onClick={() => handleSelect(id)}
    >
      {guess ? guess : ''}
    </button>
  );
}
