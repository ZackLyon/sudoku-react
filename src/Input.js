import React, { Component } from 'react';

export default class Input extends Component {
  render() {
    return (
      <div className='digit'>
        <input
          className={
            this.props.index === this.props.selectedTile
              ? 'tile-selected'
              : 'input-box'
          }
          type='text'
          maxLength='1'
          onFocus={this.props.onFocus(this.props.index)}
          value={this.props.number}
        />
      </div>
    );
  }
}

// onChange={this.props.onChange(this.props.index, this.props.number)}

// value={this.props.index === this.props.selectedTile
//     ? this.props.numberButton : ""}
