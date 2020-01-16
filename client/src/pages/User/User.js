import "./style.css";
import React, { Component } from "react";
import Logo from "../../components/Logo";
import GuessButtons from "../../components/GuessButtons";
import GuessState from "../../components/GuessState";
import Score from "../../components/Score";
import API from "../../utils/API";
import LeaderModal from "../../components/LeaderModal/LeaderModal";
// import CorrectModal from "../../components/CorrectModal/CorrectModal";
// import HaltModal from "../../components/HaltModal/HaltModal";
import io from "socket.io-client";

let guess = " ";
let score;
let username;
let tempboard = [];

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score,
      guess,
      username,
      setModalShow: false,
      leaderboard: [],
      scoreSeed: []
    };

    this.socket = io("localhost:3001");

    this.socket.on("RECIEVE_MESSAGE", function(data) {
      console.log("here is the data I got from the admin: ");
      console.log(data);
      //here, data immediately passes back after the player makes a guess- the admin does not have to hit anything for it to trigger.
      //are we passing props here from admin scoreseed? would filtering through that be faster than getting the score from the database?
      //how can we trigger a message when the admin calculates the score?
      //possible solution: when currentGuess == " ", then filter through for player info, and render
      //unfortunately, this will trigger a LOT of API calls, esp in the beginning of the game and between when the admin inputs an answer and before the player chooses the next answer
      //OR- when the modal pops up with calculated scores, when the player closes the modal, update the score
    });

    this.sendGuess = ev => {
      // ev.preventDefault();
      this.socket.emit("SEND_MESSAGE", {
        playerName: this.state.username,
        currentGuess: this.state.guess
      });
      // this.setState({guess: ''});
      console.log(this.state.username);
      console.log(this.state.guess);
      // this.setState({})
    };
  }

  componentDidMount() {
    username = this.props.match.params.username;
    this.setState({
      username: username
    });
    console.log(username);
    this.loadScore(); //does not fire on page reload
    this.loadLeaderboard();
    // console.log("this.scoreSeed is console logging: ");
    // console.log(this.scoreSeed); //undefined
  }

  // Loads score and sets them to this.state.scores
  loadScore = () => {
    API.getPlayerScore(username)
      .then(res => {
        console.log(res.data);
        this.setState({
          score: res.data[0].currScore
        });
  })
      .catch(err => console.log(err));
  };

  loadLeaderboard = () => {
    API.getScores()
      .then(res => {
        tempboard = [];
        for (let i = 0; i < 10; i++) {
          // console.log(res.data[i]);
          tempboard.push(res.data[i]);
        }
        this.setState({ leaderboard: tempboard });
        console.log(this.state.leaderboard);
      })
      .catch(err => console.log(err));
  };

  // function that updates guess state with onClick
  // guessUpdate = (value) => {
  //     this.setState({ guess: value});
  // };

  toggleModalOn = () => {
    this.loadLeaderboard();
    this.setState({ setModalShow: true });
  };

  toggleModalOff = () => {
    this.setState({ setModalShow: false });
  };

  // function that updates guess state with onClick
  guessUpdate = value => {
    this.setState({
      guess: value
    });
    const toSave = {
      playerName: this.state.username,
      currentGuess: value
    };
    console.log(toSave);
    console.log({
      name: username,
      guess: value
    });
    this.savePlayerGuess(toSave);
  };

  // function that saves players' guesses to the database
  savePlayerGuess = toSave => {
    API.saveScore(toSave)
      .then(res =>
        this.setState({
          score: res.data.currScore
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    var tableBody;
    if (this.state.sortedLeaderboard) {
      const sortedLeaderboard = this.state.leaderboard;
      tableBody = sortedLeaderboard.map((player, index) => (
        <tr key={player._id}>
          <td>{index + 1} </td>
          <td>{player.playerName} </td>
          <td>{player.currScore} </td>
        </tr>
      ));
    } else {
      tableBody = "No Scores to Display";
    }
    return (
      <div>
        <Logo />
        <Score user={this.state.username} score={this.state.score} />
        <GuessState onChange={this.sendGuess()} guess={this.state.guess} />
        <GuessButtons
          guessUpdate={this.guessUpdate}
          toggleModalOn={this.toggleModalOn}
        />
        <LeaderModal
          username={this.state.username}
          score={this.state.score}
          show={this.state.setModalShow}
          leaderboard={tableBody}
          onHide={() => this.toggleModalOff()}
        />
        {/* <CorrectModal

            score={this.state.score}
            show={this.state.setModalShow}
            onHide={() => this.toggleModalOff()}
            /> */}
        {/* <HaltModal 
            show={this.state.setModalShow}
            onHide={() => this.toggleModalOff()}
            /> */}
      </div>
    );
  }
}

export default User;
