import "./style.css";
import React, { Component } from "react";
import Logo from "../../components/Logo";
import GuessButtons from "../../components/GuessButtons";
import GuessState from "../../components/GuessState";
import Score from "../../components/Score";
import API from "../../utils/API";
import LeaderModal from "../../components/LeaderModal/LeaderModal";
import CorrectModal from "../../components/CorrectModal/CorrectModal";
import HaltModal from "../../components/HaltModal/HaltModal";
import io from "socket.io-client";

// let guess = " ";
let score;
let username;

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score,
      guess: " ",
      username,
      setModalShow: false,
      setModalHalt: false,
      setModalCorrect: false,
      leaderboard: [],
      scoreSeed: [],
      answer: " ",
    };

    this.socket = io("localhost:3001");

    
    this.socket.on("RECIEVE_MESSAGE", (data) => {
      console.log("here is the data I got from the admin: ");
    //   console.log(data);
      
      this.toggleModalHalt(data.setModalHalt);
      this.toggleModalCorrect(data.setModalCorrect);
      console.log("this is sent from admin, set modal = " + data.setModalCorrect);
      console.log(data.answer);
      this.acceptAnswer(data.answer);
      //here, data immediately passes back after the player makes a guess- the admin does not have to hit anything for it to trigger.
      //are we passing props here from admin scoreseed? would filtering through that be faster than getting the score from the database?
      //how can we trigger a message when the admin calculates the score?
      //possible solution: when currentGuess == " ", then filter through for player info, and render
      //unfortunately, this will trigger a LOT of API calls, esp in the beginning of the game and between when the admin inputs an answer and before the player chooses the next answer
      //OR- when the modal pops up with calculated scores, when the player closes the modal, update the score
    });

    this.sendGuess = ev => {
      // ev.preventDefault();
      if(this.state.setModalHalt) {
        console.log("check check mic check")
      } else {
        this.socket.emit("SEND_MESSAGE", {
          playerName: this.state.username,
          currentGuess: this.state.guess
        })
      }
    
      // this.setState({guess: ''});
      // console.log(this.state.username); //undefined
      // console.log(this.state.guess);
      // this.setState({})
    };
  
    
  }
      toggleModalHalt = (data) => {
        this.setState( state => { 
          state.setModalHalt = data})
      };
      
      toggleModalCorrect = (data) => {
        this.setState( state => { 
          state.setModalCorrect = data})
      };
  
      acceptAnswer = (data) => {
        this.setState( state => {
          state.answer = data
        })
      };

  componentDidMount = () => {
    username = this.props.match.params.username;
    this.setState({
      username: username
    });
    // console.log(username);
    this.loadScore(); //does not fire on page reload
    this.loadLeaderboard();
    // console.log("this.scoreSeed is console logging: ");
    // console.log(this.scoreSeed); //undefined
  }


  // Loads score and sets them to this.state.scores
  loadScore = () => {
    API.getPlayerScore(username)
      .then(res => {
        // console.log(res.data);
        this.setState({
          score: res.data[0].currScore
        });
      })

      .catch(err => console.log(err));
  };

  loadLeaderboard = () => {
    this.loadScore();
    API.getScores()
      .then(res => {
        this.setState({ leaderboard: res.data.splice(0,10) });
        // console.log(this.state.leaderboard);
      })
      .catch(err => console.log(err));
  };

  // function that updates guess state with onClick
  // guessUpdate = (value) => {
  //     this.setState({ guess: value});
  // };

  toggleModal = () => {
    if (!this.state.setModalShow) {
      this.loadLeaderboard();
      this.setState({ setModalShow: true });
    } else {
      this.setState({ setModalShow: false });
    }
  };

 toggleModalCorrectOff = () => {
      this.loadScore();
      this.setState({ setModalCorrect: false });
  };
 
  toggleCorrect = () => {
      this.setState({ setModalCorrect: true })
  };
 
  toggleHalt = () => {    
    if (this.state.setModalCorrect) {
      this.setState({ setModalHalt: false })
    }
  };

  // setInterval = () => {
  //   loadScore();
  // }, (100000);

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
    console.log(Object.keys(this.state.leaderboard).length);
    if (Object.keys(this.state.leaderboard).length > 0) {
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
          toggleModalOn={this.toggleModal}
        />
        <LeaderModal
          username={this.state.username}
          score={this.state.score}
          show={this.state.setModalShow}
          leaderboard={tableBody}
          onHide={() => this.toggleModal()}
        />
        <CorrectModal
            score={this.state.score}
            answer={this.state.answer}
            show={this.state.setModalCorrect}
            onHide={() => this.toggleModalCorrectOff()}
            />
        <HaltModal 
            show={this.state.setModalHalt}
            onHide={() => this.toggleHalt()}
            />
      </div>
    );
  }
}

export default User;