import React from 'react';

import './Board.css';

export default function Header({ setCheatMode }) {
  return (
    <header>
      <button
        className='cheat-button'
        onClick={() => setCheatMode((prev) => !prev)}
      >
        Check my work
      </button>
    </header>
  );
}
