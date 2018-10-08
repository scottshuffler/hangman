import React, {
  Component
} from 'react';
import hangman from './hangmanNone.svg';
import hangmanStrike1 from './hangmanStrike1.svg';
import hangmanStrike2 from './hangmanStrike2.svg';
import hangmanStrike3 from './hangmanStrike3.svg';
import hangmanStrike4 from './hangmanStrike4.svg';
import hangmanStrike5 from './hangmanStrike5.svg';
import hangmanStrike6 from './hangmanStrike6.svg';
import hangmanGameover from './hangmanGameover.svg';
import hangmanWin from './hangmanWin.svg';

import Keeb from './keeb';
import Letters from './letters';
import wordbank from './workbank';

import './App.css';

let loss = {
  color: 'red',
};

let win = {
  color: 'green',
};

let alphabet = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10
}

class App extends Component {
  constructor(props) {
    super(props);
    var rand = wordbank[Math.floor(Math.random()*wordbank.length)];
    var randarr = rand.split('');
    var letter, i, sum = 0;
    for (i = 0; i < rand.length; i++) {
        letter = rand[i];
        sum += alphabet[letter];
    }
    this.state = {
      logo: hangman,
      strike: 0,
      word: rand,
      arrword: randarr,
      guesses: [],
      gameover: false,
      won: false,
      score: sum,
    };
    this.toggleLegs = this.toggleLegs.bind(this);
    this.checkLetter = this.checkLetter.bind(this);
    this.arrayContainsArray = this.arrayContainsArray.bind(this);
    this.newGame = this.newGame.bind(this);

    
  }

  newGame() {
    var rand = wordbank[Math.floor(Math.random()*wordbank.length)];
    var randarr = rand.split('');
    this.setState({
      logo: hangman,
      strike: 0,
      word: rand,
      arrword: randarr,
      guesses: [],
      gameover: false,
      won: false
    });
  }

  arrayContainsArray (superset, subset) {
    if (0 === subset.length) {
      return false;
    }
    return subset.every(function (value) {
      return (superset.indexOf(value) >= 0);
    });
  }

  toggleLegs(e) {
    // e.preventDefault();
    switch (this.state.strike) {
      case 0:
        this.setState({
          logo: hangmanStrike1,
          strike: this.state.strike + 1
        });
        break;
      case 1:
        this.setState({
          logo: hangmanStrike2,
          strike: this.state.strike + 1
        });
        break;
      case 2:
        this.setState({
          logo: hangmanStrike3,
          strike: this.state.strike + 1
        });
        break;
      case 3:
        this.setState({
          logo: hangmanStrike4,
          strike: this.state.strike + 1
        });
        break;
      case 4:
        this.setState({
          logo: hangmanStrike5,
          strike: this.state.strike + 1
        });
        break;
      case 5:
        this.setState({
          logo: hangmanStrike6,
          strike: this.state.strike + 1
        });
        break;
      case 6:
        this.setState({
          logo: hangmanGameover,
          strike: this.state.strike + 1,
          gameover: true

        });
        break;
      default:
        this.setState({
          logo: hangman,
          strike: 0,
          gameover: false
        });
        break;
    }
  }

  checkLetter(l) {
    var joined = this.state.guesses.concat(l);
    this.setState({ guesses: joined },function(){
      console.log(this.state.guesses);
      if(this.state.word.includes(l)) {
        if(this.arrayContainsArray(this.state.guesses,this.state.arrword)) {
          this.setState({
            gameover: true,
            won: true,
            logo: hangmanWin
          });
          console.log('game over, you win');
        }
      } else {
        this.toggleLegs();
      }
    })
    
  }
  

  render() {
    return ( 
      <div className = "App" >

      <header className = "App-header" >
      <h1>Hangman!</h1> 
      <h4 style={loss} className={(this.state.gameover === true && this.state.won === false) ? '' : 'hide'}>You lose!</h4>
      <h4 style={win} className={(this.state.gameover === true && this.state.won === true) ? '' : 'hide'}>You Win!</h4>
      <p className={(this.state.gameover === false) ? '' : 'hide'}>Guesses: {this.state.strike}/6</p>
      <img src = {this.state.logo} className = "App-logo" alt = "logo"/>
      <Letters
          word={this.state.word}
          reveal={this.state.gameover}
          guesses={this.state.guesses}/>
      <Keeb
          onPress={this.checkLetter}
          enabled={!this.state.gameover}
          disabledLetters={this.state.guesses}/>
      <button className='hangman-keyboard' onClick={this.newGame}>New Game</button>
      </header > 
      </div>
    );
  }
}

export default App;