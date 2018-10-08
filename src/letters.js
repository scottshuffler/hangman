import React, {
    Component
  } from 'react';

class Letters extends Component {
    constructor(props) {
        super(props);
        this.getSlots = this.getSlots.bind(this);
        this.getSlot = this.getSlot.bind(this);

      }

  getSlot(letter, index) {
    let {guesses, reveal} = this.props;
    let classNames = ['letter-slot'];
    let contents = ' ';
    if(guesses.includes(letter)) {
        contents = letter;
    }

    if (contents === ' ' && reveal) {
      classNames.push('revealed');
      contents = letter;
    }
    return (
      <div 
        key={index} 
        className={classNames.join(' ')}>
        {contents}
      </div>
    );
  }

  getSlots() {
    let letters = this.props.word.split('');
    return letters.map(this.getSlot);
  }

  render() {
    return (
      <div className='letter-slots'>
        {this.getSlots()}
      </div>
    );
  }

}

export default Letters;