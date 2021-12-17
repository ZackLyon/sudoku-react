import { makeBoard } from './Boxes-utils.js';

const board = makeBoard();
const boardArr = board.map(({ number }) => number);

const correctArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

it('should make a board with each column containing the numbers 1 through 9', () => {
  let columnIsGood = true;

  // isCorrectColumn makes an array of values in a column then checks that they include each of the numbers 1-9
  function isCorrectColumn(index, arr) {
    if (index > 80) {
      return arr
        .sort((a, b) => a - b)
        .every((item, ind) => correctArr[ind] === item);
    }

    return isCorrectColumn(index + 9, [...arr, boardArr[index]]);
  }

  for (let i = 0; i < 9; i++) {
    let correct = isCorrectColumn(i, []);

    if (!correct) columnIsGood = false;
  }

  expect(columnIsGood).toEqual(true);
});

it('should make a board with each row containing the numbers 1 through 9', () => {
  let rowIsGood = true;

  for (let i = 0; i < 82; i = i + 9) {
    let correct = boardArr
      .slice(i, i + 9)
      .sort((a, b) => a - b)
      .every((item, ind) => correctArr[ind] === item);

    if (!correct) rowIsGood = false;
  }

  expect(rowIsGood).toEqual(true);
});

it('should make a board with each 3x3 box section containing the numbers 1 through 9', () => {
  let boxIsGood = true;

  //creates a box using the starting index, then checks that it contains the numbers 1 through 9
  const isBoxGood = (index, arr, stop) => {
    if (index > stop)
      return arr
        .sort((a, b) => a - b)
        .every((item, ind) => correctArr[ind] === item);

    let arrPiece = boardArr.slice(index, index + 3);

    return isBoxGood(index + 9, [...arr, ...arrPiece], stop);
  };

  //j is the start of each box, i moves to the next row of boxes
  for (let i = 0; i < 81; i = i + 27) {
    for (let j = i; j < i + 7; j = j + 3) {
      const correct = isBoxGood(j, [], j + 19);

      if (!correct) boxIsGood = false;
    }
  }

  expect(boxIsGood).toEqual(true);
});
