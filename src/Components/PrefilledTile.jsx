import React from 'react';
import './Board.css';

export default function PrefilledTile({ correct }) {
  return <div className='tile'>{correct}</div>;
}
