import './App.css';
import React, { Component } from 'react'
import { makeBoard } from './Boxes-utils.js';
import Digit from './Board/Digit.js';
import Input from './Input.js';
import './Board/Board.css'

export default class App extends Component {
  state = {
    board: [],
    correct: [],
    isLoading: false
  }

// example board entry object: {number: 1, showing: true};

  componentDidMount = async() => {
    
    await this.setState({isLoading: true});
    await this.fetchBoard();
    await this.makeCorrectArr();
    await this.setState({isLoading: false});
  }

  componentWillUnmount = async() => {
    await this.setState({board: []})
  }

  makeCorrectArr = async() => {
    const currentBoard = await this.state.board;

    //make an array of booleans that has prefilled board squares marked as true and empty squares as false that can be altered by index as squares are filled correctly
    const correctArr = currentBoard.map (item => 
      item.showing
    )

    await this.setState({correct: correctArr});
    // console.log("correct in state ", this.state.correct);
  }

  fetchBoard = async() => {
    const newBoard = await makeBoard();
    // console.log("fresh board ", newBoard);
    await this.setState({board: newBoard});
    // await console.log("board on page ", this.state.board);
  }

  handleChange =(index, number) => async(e) => {
    const isItCorrect = await Number(e.target.value) === number;
    console.log("number entered ", e.target.value);
    console.log("correct number ", number);
    console.log("is it correct? ", isItCorrect);

    const updateCorrectArr = await this.state.correct;
    updateCorrectArr[index] = isItCorrect;
    await this.setState({correct: updateCorrectArr});
    console.log("index ", index);
    console.log("index of answers ", updateCorrectArr);

    if (!updateCorrectArr.includes(false)) {
      console.log("YOU WIN!!!")
    }
  }

  render() {
    
    return (
      <div className = "board-container">
        <div className="board">
          {
            this.setState.isLoading === true 
            ? <div>LOADING</div>
            : 
            this.state.board.map(({ number, showing }, index) => 
            showing === true
            ? <Digit 
            value={number}
            index={index} />
            : 
            <Input 
            onChange={(e) => this.handleChange(index, number, e)}
            number={number}
            index={index}/>
            )
          }
        </div>
      </div>
    )
  }
}

