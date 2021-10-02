import React, { Component } from 'react'
import './Board.css'
export default class Digit extends Component {
    render() {
        return (
            <div className="digit">
                {this.props.value}
            </div>
        )
    }
}
