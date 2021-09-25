import './App.css';
import Boxes from './Boxes-x-3'
import React, { Component } from 'react'

export default class App extends Component {
  // state = {
  //   columnsRemaining:
  //   [{
  //     id: 1,
  //     left: [0,1,2],
  //     middle: [3,4,5],
  //     right: [6,7,8]
  //   },
  //    {
  //     id: 2,
  //     left: [0,1,2],
  //     middle: [3,4,5],
  //     right: [6,7,8]
  //   },
  //   {
  //     id: 3,
  //     left: [0,1,2],
  //     middle: [3,4,5],
  //     right: [6,7,8]
  //   },
  //   {
  //     id: 4,
  //     left: [0,1,2],
  //     middle: [3,4,5],
  //     right: [6,7,8]
  //   },
  //   {
  //     id: 5,
  //     left: [0,1,2],
  //     middle: [3,4,5],
  //     right: [6,7,8]
  //   },
  //   {
  //     id: 6,
  //     left: [0,1,2],
  //     middle: [3,4,5],
  //     right: [6,7,8]
  //   },
  //   {
  //     id: 7,
  //     left: [0,1,2],
  //     middle: [3,4,5],
  //     right: [6,7,8]
  //   },
  //   {
  //     id: 8,
  //     left: [0,1,2],
  //     middle: [3,4,5],
  //     right: [6,7,8]
  //   },
  //   {
  //     id: 9,
  //     left: [0,1,2],
  //     middle: [3,4,5],
  //     right: [6,7,8]
  //   }]
  // }

  render() {
    return (
      <div>
        <Boxes />
      </div>
    )
  }
}

