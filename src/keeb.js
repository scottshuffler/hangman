import React, {Component} from 'react';

const ROW_ONE = 'abcdefg'.split('');
const ROW_TWO = 'hijklmn'.split('');
const ROW_THREE = 'opqrstu'.split('');
const ROW_FOUR = 'vwxyz'.split('');

class Keeb extends Component {

    constructor(props) {
        super(props);
        this.getButton = this.getButton.bind(this);
        this.getRow = this.getRow.bind(this);

      }

  handleClick(letter) {
    if (this.props.enabled) {
      this.props.onPress(letter);
    }
  }

  getButton(letter) {
    let disabled = this.props.disabledLetters.includes(letter);

    return (
      <button 
        key={letter}
        onClick={this.handleClick.bind(this, letter)}
        disabled={disabled}>
        {letter}
      </button>
    );
  }

  getRow(row) {
    return (
      <div className='button-row' key={row.join('')}>
        {row.map(this.getButton)}
      </div>
    );
  }

  render() {
    return (
      <div className='hangman-keyboard'>
        {[ROW_ONE, ROW_TWO, ROW_THREE, ROW_FOUR].map(this.getRow)}
      </div>
    );
  }

}

export default Keeb;