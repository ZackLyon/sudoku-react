import './App.css';
import React, { Component } from 'react';
import { makeBoard } from './Boxes-utils.js';
import Digit from './Board/Digit.js';
import Input from './Input.js';
import './Board/Board.css';
const clone = require('rfdc')();

export default class App extends Component {
  state = {
    solutionBoard: [],
    showingBoard: [],
    correct: [],
    guesses: [],
    isLoading: false,
    won: false,
    tileSelected: null,
    numberButton: null,
  };

  // example board entry object: {number: 1, prefilled: true};

  componentDidMount = async () => {
    await this.setState({ isLoading: true });
    await this.fetchBoard();
    await this.makeCorrectArr();
    await this.setState({ isLoading: false });
  };

  componentWillUnmount = async () => {
    await this.setState({ solutionBoard: [] });
  };

  makeCorrectArr = async () => {
    const solutionBoard = await this.state.solutionBoard;

    //make an array of booleans that has prefilled board squares marked as true and empty squares as false that can be altered by index as squares are filled correctly
    const correctArr = solutionBoard.map((item) => item.prefilled);

    await this.setState({ correct: correctArr });
  };

  fetchBoard = async () => {
    const newBoard = await makeBoard();
    const newBoardClone = clone(newBoard);

    //set up showing board so that squares that aren't prefilled have a value of ""
    const showingBoard = newBoardClone.map((square) =>
      square.prefilled === true ? square : { number: '', prefilled: false }
    );

    await this.setState({ solutionBoard: newBoard });
    await this.setState({ showingBoard: showingBoard });
  };

  handleFocus = (index) => async (e) => {
    //keep track of the index of the focused tile to insert number into with button
    if (index !== this.state.tileSelected) {
      await this.setState({ tileSelected: index, numberButton: null });
    }
  };

  // SAVING THIS: IT HANDLES KEYBOARD INPUT
  // handleChange =(index, number) => async(e) => {
  //   const isItCorrect = await Number(e.target.value) === number;
  //   console.log("number entered ", e.target.value);
  //   console.log("correct number ", number);
  //   console.log("is it correct? ", isItCorrect);

  //   const updateCorrectArr = await this.state.correct;
  //   updateCorrectArr[index] = isItCorrect;
  //   await this.setState({correct: updateCorrectArr});
  //   console.log("index ", index);
  //   // console.log("index of answers ", updateCorrectArr);

  //   if (!updateCorrectArr.includes(false)) {
  //     console.log("YOU WIN!!!")
  //     await this.setState({won: true});
  //   }
  // }

  handleNumber = async (e) => {
    const buttonNumber = Number(e.target.value);
    console.log('you pressed ', buttonNumber);
    await this.setState({ numberButton: buttonNumber });

    //change tile value to number pressed in board object clone, then push clone to showingBoard in state
    const selectedIndex = this.state.tileSelected;
    const showingBoardClone = clone(this.state.showingBoard);

    buttonNumber === 0
      ? (showingBoardClone[selectedIndex].number = '')
      : (showingBoardClone[selectedIndex].number = buttonNumber);

    const correctNumber = this.state.solutionBoard[selectedIndex].number;
    console.log('correct number ', correctNumber);
    const isItCorrect = (await buttonNumber) === correctNumber;
    console.log('is it correct?', isItCorrect);
    const updateCorrectArr = await this.state.correct;
    updateCorrectArr[selectedIndex] = isItCorrect;
    await this.setState({
      correct: updateCorrectArr,
      showingBoard: showingBoardClone,
    });
    console.log('tileSelected index ', selectedIndex);

    //check for win conditions
    if (!updateCorrectArr.includes(false)) {
      console.log('YOU WIN!!!');
      await this.setState({ won: true });
    }
  };

  render() {
    return (
      <div className='board-container'>
        <div className='board'>
          {this.state.isLoading === true ? (
            <div>LOADING</div>
          ) : (
            this.state.showingBoard.map(({ number, prefilled }, index) =>
              prefilled === true ? (
                <Digit value={number} index={index} />
              ) : (
                <Input
                  // onChange={(e) => this.handleChange(index, number, e)}
                  number={number}
                  index={index}
                  numberButton={this.state.numberButton}
                  onFocus={(e) => this.handleFocus(index, number, e)}
                  selectedTile={this.state.tileSelected}
                />
              )
            )
          )}
        </div>

        {this.state.won === true ? (
          <div className='win-message'>YOU WIN</div>
        ) : (
          false
        )}

        <div className='number-buttons'>
          <button value='1' onClick={this.handleNumber}>
            1
          </button>
          <button value='2' onClick={this.handleNumber}>
            2
          </button>
          <button value='3' onClick={this.handleNumber}>
            3
          </button>
          <button value='4' onClick={this.handleNumber}>
            4
          </button>
          <button value='5' onClick={this.handleNumber}>
            5
          </button>
          <button value='6' onClick={this.handleNumber}>
            6
          </button>
          <button value='7' onClick={this.handleNumber}>
            7
          </button>
          <button value='8' onClick={this.handleNumber}>
            8
          </button>
          <button value='9' onClick={this.handleNumber}>
            9
          </button>
          <button value='0' onClick={this.handleNumber}></button>
        </div>
      </div>
    );
  }
}
