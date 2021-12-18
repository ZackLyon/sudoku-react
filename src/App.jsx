import './App.css';
import React, { useState, useEffect, useReducer } from 'react';
import { makeBoard } from './utils/box-utils.js';
import PrefilledTile from './Components/PrefilledTile.jsx';
import GuessTile from './Components/GuessTile.jsx';
import './Components/Board.css';

export default function AppHooks() {
  const boardReducer = (board, action) => {
    const { type, id, newBoard, guess } = action;
    switch (type) {
      case 'select': {
        return board.map((tile) =>
          tile.id === id
            ? { ...tile, selected: true }
            : { ...tile, selected: false }
        );
      }

      case 'update': {
        return newBoard;
      }

      case 'guess': {
        const updatedBoard = board.map((tile) =>
          tile.selected ? { ...tile, guess } : tile
        );

        if (updatedBoard.every((tile) => tile.guess === tile.correct))
          setWon(true);

        return updatedBoard;
      }

      default:
        throw new Error(`Action type ${type} is not allowed.`);
    }
  };

  const [won, setWon] = useState(false);
  const initialBoard = [];
  const [board, dispatch] = useReducer(boardReducer, initialBoard);

  const handleSelect = (id) => {
    dispatch({
      type: 'select',
      id,
    });
  };

  const handleGuess = (num) => {
    dispatch({
      type: 'guess',
      guess: num,
    });
  };

  const handleUpdate = (newBoard) => {
    dispatch({
      type: 'update',
      newBoard,
    });
  };

  useEffect(() => {
    const newBoard = makeBoard();
    handleUpdate(newBoard);
  }, []);

  return (
    <div className='board-container'>
      <div className='board'>
        {board.map(({ id, correct, guess, prefilled, selected }) =>
          prefilled === true ? (
            <PrefilledTile correct={correct} key={id} />
          ) : (
            <GuessTile
              key={id}
              {...{ id, selected, guess, correct, handleSelect }}
            />
          )
        )}
      </div>

      {won ? <div className='win-message'>YOU WIN</div> : <></>}

      <div className='number-buttons'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button value={num} key={num} onClick={() => handleGuess(num)}>
            {num}
          </button>
        ))}
        <button value='0' onClick={() => handleGuess(null)}></button>
      </div>
    </div>
  );
}
