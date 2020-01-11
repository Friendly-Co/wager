import React, { Component } from "react"
import Logo from "../../components/Logo"
import GuessButtons from "../../components/GuessButtons";
import GuessState from "../../components/GuessState";
import Score from "../../components/Score";
import API from "../../utils/API";

let guess = " "
let score;
class User extends Component {
    state = {
        score,
        guess
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
}



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