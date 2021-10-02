import React, { Component } from 'react'
import Digit from './Digit.js'
import './Board.css'

export default class Board extends Component {
    render() {
        return (
            <div className="board">
                {
                    this.props.board.map(num => <Digit value={num}/>)
                }
            </div>
        )
    }
}
