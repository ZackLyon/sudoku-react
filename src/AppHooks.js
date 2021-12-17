import './App.css';
import React, { Component, useState, useEffect } from 'react';
import { makeBoard } from './Boxes-utils.js';
import Digit from './Board/Digit.js';
import Input from './Input.js';
import './Board/Board.css';
import { fetchBoard, makeCorrectArr } from './utils/game-utils.js';
const clone = require('rfdc')();

export default function AppHooks() {
  const [solutionBoard, setSolutionBoard] = useState([]);
  const [showingBoard, setShowingBoard] = useState([]);
  const [correct, setCorrect] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [won, setWon] = useState(false);
  const [tileSelected, setTileSelected] = useState(null);
  const [numberButton, setNumberButton] = useState(null);

  useEffect(() => {
    fetchBoard({ setSolutionBoard, setShowingBoard })
      .then((solution) => makeCorrectArr({ solution, setCorrect }))
      .then(() => setIsLoading(false));
    //cleanup function when component unmounts; will this work?
    // return () => setSolutionBoard([]);
  }, []);

  return (
    <div className='board-container'>
      <div className='board'>
        {isLoading === true ? (
          <div>LOADING</div>
        ) : (
          showingBoard.map(({ number, prefilled }, index) =>
            prefilled === true ? (
              <Digit value={number} index={index} />
            ) : (
              <Input
                // onChange={(e) => this.handleChange(index, number, e)}
                number={number}
                index={index}
                numberButton={numberButton}
                onFocus={(e) => this.handleFocus(index, number, e)}
                selectedTile={tileSelected}
              />
            )
          )
        )}
      </div>

      {won === true ? <div className='win-message'>YOU WIN</div> : false}

      <div className='number-buttons'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button value={num} key={num} onClick={this.handleNumber}>
            {num}
          </button>
        ))}
        <button value='0' onClick={this.handleNumber}></button>
      </div>
    </div>
  );
}
