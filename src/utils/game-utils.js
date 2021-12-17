import { makeBoard } from './box-utils.js';
const clone = require('rfdc')();

const fetchBoard = ({ setSolutionBoard, setShowingBoard }) => {
  const newBoard = makeBoard();

  //set up showing board so that squares that aren't prefilled have a value of ""
  const showingBoard = newBoard.map((square) =>
    square.prefilled === true ? square : { number: '', prefilled: false }
  );

  setSolutionBoard(newBoard);
  setShowingBoard(showingBoard);
  return newBoard;
};

const makeCorrectArr = ({ solutionBoard, setCorrect }) => {
  //make an array of booleans that has prefilled board squares marked as true and empty squares as false that can be altered by index as squares are filled correctly
  const correctArr = solutionBoard.map((item) => item.prefilled);

  setCorrect(correctArr);
};

export { fetchBoard, makeCorrectArr };
