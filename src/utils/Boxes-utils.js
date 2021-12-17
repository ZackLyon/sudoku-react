export { makeBoard };

const clone = require('rfdc')();

let numbers = [];

for (let i = 1; i < 10; i++) {
  numbers.push({
    id: i,
    boxesToFill: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    prevBoxesToFill: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    left: true,
    middle: true,
    right: true,
    usedThisRow: false,
  });
}
// let numbers = [
//   {
//     id: 1,
//     boxesToFill: [0, 1, 2, 3, 4, 5, 6, 7, 8],
//     prevBoxesToFill: [0, 1, 2, 3, 4, 5, 6, 7, 8],
//     left: true,
//     middle: true,
//     right: true,
//     usedThisRow: false,
//   },

let prevNumbers = [];
let prevBoxNumbers = [];
const totalReset = clone(numbers);

function makeRow() {
  resetUsed();

  let row = [];
  for (let i = 0; i <= 8; i++) {
    let currentRow = 'left';
    if (i > 2) currentRow = 'middle';
    if (i > 5) currentRow = 'right';

    let availableNumbersForSpace = numbers
      .filter(
        (num) =>
          num.boxesToFill[i] === i &&
          num[currentRow] === true &&
          num.usedThisRow === false
      )
      .map((num) => num.id);

    // if (availableNumbersForSpace.length === 0) console.log("numbers remaining for row ", numbers.filter(item => item.usedThisRow === false));

    const randomChoice = Math.floor(
      Math.random() * availableNumbersForSpace.length
    );

    if (availableNumbersForSpace.length > 0) {
      row.push(availableNumbersForSpace[randomChoice]);

      //update boxesToFill array in state, so that it will no longer be an available column for chosen number (-1 because boxesToFill is 0 indexed and choices are 1-9)
      numbers[availableNumbersForSpace[randomChoice] - 1].boxesToFill.splice(
        i,
        1,
        'x'
      );
      numbers[availableNumbersForSpace[randomChoice] - 1][currentRow] = false;
      numbers[availableNumbersForSpace[randomChoice] - 1].usedThisRow = true;
    }
  }
  return row;
}

//reset and try again if row fails
function makeGoodRow() {
  prevNumbers = clone(numbers);
  let row = makeRow();

  for (let i = 0; i < 10; i++) {
    if (row.length < 9) {
      numbers = clone(prevNumbers);
      row = makeRow();
    }
  }

  return row;
}

//makes 3 boxes, resets and tries again if not enough numbers in box
function makeBox() {
  prevBoxNumbers = clone(numbers);
  let row1 = makeGoodRow();
  let row2 = makeGoodRow();
  let row3 = makeGoodRow();
  let box = [...row1, ...row2, ...row3];

  for (let j = 0; j < 10; j++) {
    if (box.length < 27) {
      numbers = clone(prevBoxNumbers);
      row1 = makeGoodRow();
      row2 = makeGoodRow();
      row3 = makeGoodRow();
      box = [...row1, ...row2, ...row3];
    }
  }

  resetBoxesAvailable();
  return box;
}

//make the solution board with 3 sets of 3 boxes, reset for next time
function makeSolution() {
  const boxes1 = makeBox();
  const boxes2 = makeBox();
  const boxes3 = makeBox();
  const solutionBoard = [...boxes1, ...boxes2, ...boxes3];
  numbers = clone(totalReset);
  return solutionBoard;
}

//reset the numbers available for individual row
function resetUsed() {
  for (let j = 0; j <= 8; j++) {
    numbers[j].usedThisRow = false;
  }
}

//reset boxes available for each number for each set of 3 boxes
function resetBoxesAvailable() {
  numbers.forEach((item) => {
    item.left = true;
    item.middle = true;
    item.right = true;
  });
}

function randomizeShownRows() {
  //randomize how many numbers will be shown in each row between 3 and 5 for a total of 38

  // The New York Times easy sudoku has 38 numbers showing with either 3, 4, and 5 numbers showing per row
  // The equations for this are 3x + 4y+ 5z = 38 (where x,y,z are the rows) and x + y + z = 9 (total rows)
  // Wolfram Alpha provided the solutions as y = 11 - 2x and z = x - 2

  let threeRows = Math.floor(Math.random() * 4); //between 0 and 3 rows with three shown numbers in them
  let fourRows = 7 - 2 * threeRows; // calculation for rows with five shown numbers
  let fiveRows = threeRows + 2; // calculation for rows with five shown numbers

  //create an array with 9 items, each representing how many spots are showing in a given row
  let threeArr = Array(threeRows).fill(3);
  let fourArr = Array(fourRows).fill(4);
  let fiveArr = Array(fiveRows).fill(5);
  let shownNumbersArr = [...threeArr, ...fourArr, ...fiveArr];
  let shuffledShownNumbersArr = fisherYatesShuffle(shownNumbersArr);
  return shuffledShownNumbersArr;
}

// Fisher-Yates shuffle as seen on stack overflow (https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)

function fisherYatesShuffle(arr) {
  let current = arr.length;
  let random;

  while (current !== 0) {
    random = Math.floor(Math.random() * current);
    current--;
    [arr[current], arr[random]] = [arr[random], arr[current]];
  }
  return arr;
}

// takes in the array with 9 items, each representing how many spots are showing in a given row, and produces an array with 38 indices to show
function indicesToShow(shownArr) {
  let showingIndexArr = [];

  shownArr.forEach((numToShow, index) => {
    let i = 0;

    //randomize the 9 spaces in a row, then account for which of the 9 rows it is to find the actual index
    while (i < numToShow) {
      let selectedIndex = Math.floor(Math.random() * 9 + index * 9);
      if (!showingIndexArr.includes(selectedIndex)) {
        i++;
        showingIndexArr.push(selectedIndex);
      }
    }
  });

  return showingIndexArr;
}

function makeBoard() {
  const solutionBoard = makeSolution(); //make the board that has the final solution

  const shownArr = randomizeShownRows(); //make an randomized array of 9 items indicating how many numbers will show in each row

  const prefilledIndexArr = indicesToShow(shownArr); //make an array of 38 index spaces to show (for easy mode)

  const board = solutionBoard.map((num, index) => {
    //determined if each space is showing by setting prefilled to true/false
    return {
      number: num,
      prefilled: prefilledIndexArr.includes(index),
    };
  });
  numbers = clone(totalReset);
  return board;
}
