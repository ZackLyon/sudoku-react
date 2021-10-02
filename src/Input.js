import React, { Component } from 'react'

export default class Input extends Component {
    render() {
        return (
            <div className="digit">
                <input className="input-box" type="text" maxLength="1"  onChange={this.props.onChange(this.props.index, this.props.number)} />
            </div>
        )
    }
}
