import React, { Component } from "react"
import Logo from "../../components/Logo"
import GuessButtons from "../../components/GuessButtons";
import GuessState from "../../components/GuessState";
import Score from "../../components/Score";
import API from "../../utils/API";
import io from 'socket.io-client';

let guess = " "
let score;
class User extends Component {
    constructor(props){
        super(props);
    this.state = {
        score,
        guess
    };

    this.socket = io('localhost:3001');

    this.socket.on('RECIEVE_MESSAGE', function(data) {

    });

    this.sendGuess = ev => {
        ev.preventDefault();
        this.socket.emit('SEND_MESSAGE', {
            currentGuess: this.state.guess,
        });
        this.setState({guess: ''});
        this.setState({})
    }
}


    componentDidMount() {
        this.loadScore();
      }
    
      // Loads score and sets them to this.state.scores
      loadScore = () => {
        API.getScores()
          .then(res =>
            this.setState({
              score: res.data
            })
          )
          .catch(err => console.log(err));
      };

    // function that updates guess state with onClick
guessUpdate = (value) => {
    this.setState({ guess: value});
};




render() {
    return (
        <div>
            <Logo/>
            <Score
                score={this.state.score}
            />
            <GuessState 
                guess={this.state.guess}
            />
            <GuessButtons
            guessUpdate={this.guessUpdate}
            />
        </div>
    )
}

}

export default User;