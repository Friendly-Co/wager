import "./style.css";
import React, { Component } from "react";
import Logo from "../../components/Logo";
import GuessButtons from "../../components/GuessButtons";
import GuessState from "../../components/GuessState";
import Score from "../../components/Score";
import PlayerAPI from "../../utils/PlayerAPI";
import LeaderModal from "../../components/LeaderModal/LeaderModal";
import CorrectModal from "../../components/CorrectModal/CorrectModal";
import HaltModal from "../../components/HaltModal/HaltModal";
import io from "socket.io-client";
import { Container, Row, Col } from "../../components/Grid";

let score;
let username;
let playerId;
let gameId;

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score,
      guess: " ",
      username,
      playerId,
      gameId,
      setModalShow: false,
      setModalHalt: false,
      setModalCorrect: false,
      leaderboard: [],
      scoreSeed: [],
      answer: " ",
      rightOrWrong: " ",
      currentRank: 0
    };

    this.socket = io("https://justafriendlywager.herokuapp.com/", {
      transports: ["websocket"]
    });

    this.socket.on("modal_on", data => {
      // this.setState({setModalHalt: true})
      // console.log(this.state.setModalHalt);
      if (data.setModalHalt) {
        this.toggleHalt();
      } else {
        this.acceptAnswer(data.answer);
        this.lastGuess();
        this.toggleCorrect();
        this.toggleHaltOff();
      }
    });

    this.sendGuess = ev => {
      // ev.preventDefault();
      this.socket.emit("SEND_MESSAGE", {
        playerName: this.state.username,
        currentGuess: this.state.guess,
        gameId: gameId,
        playerId: playerId
      });
    };
  }

  acceptAnswer = data => {
    this.setState(state => {
      state.answer = data;
    });
  };

  componentDidMount = () => {
    username = this.props.match.params.username;
    playerId = this.props.match.params.playerId;
    gameId = this.props.match.params.gameId;
    this.setState(state => {
      state.username = username;
      state.playerId = playerId;
      state.gameId = gameId;
    });
    // if player scores differ from 50, start player off at the average
    PlayerAPI.getPlayers(gameId).then(res => {
      //if the curent array of players has a length > 2 (including the new player, who starts out at 50), then this may be a later player and shoulw start out at the average score
      if (res.data.length > 2) {
        // Filter out the all scores of 50 from the array. If there are scores other than 50, the game is in session and this is a late player
        const aboveOrBelow50 = res.data.filter(
          person => person.currScore !== 50
        );
        if (aboveOrBelow50.length) {
          PlayerAPI.getPlayerScore(playerId).then(response => {
            if (response.data.newPlayer === true) {
              console.log(res.data);
              //create an array of the currScore properties
              const getCurrScores = item => item.currScore;
              const scoreArray = res.data.map(getCurrScores);
              //find the sum of all scores
              const addScores = (runningTotal, playerId) =>
                runningTotal + playerId;
              const scoreSum = scoreArray.reduce(addScores, 0);
              //find the average of all scores
              const averageScore = scoreSum / scoreArray.length;
              console.log("avarage:" + averageScore);
              const toSave = { _id: playerId, currScore: averageScore };
              PlayerAPI.savePlayer(toSave).then(r => {
                console.log(r);
                this.setState({
                  score: Math.floor(averageScore)
                });
              });
            }
          });
        }
        //if no player score is above or below 50, this.loadScores
      } else {
        this.loadScore();
      }
    });
    this.loadLeaderboard();
    this.getRank();
  };

  // Loads score and sets them to this.state.scores
  loadScore = () => {
    console.log("loadscore function");
    PlayerAPI.getPlayerScore(playerId)
      .then(res => {
        this.setState({
          score: res.data.currScore
        });
      })

      .catch(err => console.log(err));
  };

  loadLeaderboard = () => {
    this.loadScore();
    PlayerAPI.getPlayers(gameId)
      .then(res => {
        this.setState({ leaderboard: res.data.splice(0, 10) });
      })
      .catch(err => console.log(err));
  };

  // all the Modal Functions
  toggleModal = () => {
    if (!this.state.setModalShow) {
      this.getRank();
      this.loadLeaderboard();
      this.setState({ setModalShow: true });
    } else {
      this.setState({ setModalShow: false });
    }
  };

  toggleModalCorrectOff = () => {
    this.loadScore();
    this.setState({ setModalCorrect: false, guess: " " });
    // if (this.state.currScore < 0) {
    //   this.setState({
    //     message: alert(
    //       "Your points have dropped below 0. Better luck next time!"
    //     )
    //   });
    //   const toSave =
    //     { gameId: gameId, _id: playerId }
    //   PlayerAPI.kickOutPlayer(toSave);
    //   window.location = "/";
    // }
  };

  toggleCorrect = () => {
    this.setState({ setModalCorrect: true });
  };

  toggleHalt = () => {
    this.setState({ setModalHalt: true });
  };

  toggleHaltOff = () => {
    if (this.state.setModalCorrect) {
      this.setState({ setModalHalt: false });
    }
  };

  // function that updates guess state with onClick
  guessUpdate = value => {
    this.setState({
      guess: value
    });
    const toSave = {
      playerId: playerId,
      currentGuess: value
    };
    this.savePlayerGuess(toSave);
  };

  // function that saves players' guesses to the database
  savePlayerGuess = toSave => {
    PlayerAPI.savePlayer(toSave)
      .then(res => {
        this.setState({
          score: res.data.currScore
        });
        // if (res.data.currScore < 0) {
        //   this.setState({
        //     message: alert(
        //       "Your points have dropped below 0. Better luck next time!"
        //     )
        //   });
        //   const toSave =
        //     { gameId: gameId, _id: playerId }
        //   PlayerAPI.kickOutPlayer(toSave);
        //   window.location = "/";
        // }
      })
      .catch(err => console.log(err));
  };

  // logic to check players answer with correct answer to display in modal if guessed right or wrong
  lastGuess = () => {
    if (this.state.guess.toLowerCase() === this.state.answer.toLowerCase()) {
      this.setState({ rightOrWrong: "Right" });
    } else {
      this.setState({ rightOrWrong: "Wrong" });
    }
  };

  // function to get player's current rank of all players
  getRank = () => {
    // let names = [];
    PlayerAPI.getPlayers(gameId)
      .then(res => {
        let names = res.data.map(obj => obj.playerName);
        const rank = names.indexOf(this.state.username);
        this.setState({ currentRank: rank + 1 });
        console.log(this.state.currentRank);
      })
      .catch(err => console.log(err));
  };

  render() {
    var tableBody;
    // console.log(Object.keys(this.state.leaderboard).length);
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
        <Row>
          <Col size='12'>
            <div className='wrapper bglayer2'>

              <Row>
                <Col size='lg-4 md-2'></Col>
                <div className='col-lg-4 col-md-8 col-m-12' >
                  <Logo />
                </div>
                <Col size="lg-4 md-2"></Col>
              </Row>
              
              <Row>
                {/* <Col size='lg-4 md-2'></Col> */}
                  <Col size='12'>
                    <Score user={this.state.username} score={this.state.score} />
                  </Col>
                {/* <Col size='lg-4 md-2'></Col> */}
              </Row>
        
              <Row>
                <Col size='12'>
                  <GuessState onChange={this.sendGuess()} guess={this.state.guess} />
                </Col>
              </Row>
        
              <Row>
                  {/* <Col size='lg-4 md-2'>
                  </Col>
                  <Col size='lg-4 md-8 sm-12'> */}
                      <div className="btnformat">
                      <GuessButtons
                        guessUpdate={this.guessUpdate}
                        toggleModalOn={this.toggleModal}
                      />
                      </div>
                  {/* </Col>
                  <Col size='lg-4 md-2'>
                  </Col> */}
              </Row>
            </div>
              
          </Col>
          
        </Row>
        <LeaderModal
          username={this.state.username}
          score={this.state.score}
          currentrank={this.state.currentRank}
          show={this.state.setModalShow}
          leaderboard={tableBody}
          onHide={() => this.toggleModal()}
        />
        <CorrectModal
          score={this.state.score}
          answer={this.state.answer}
          rightOrWrong={this.state.rightOrWrong}
          show={this.state.setModalCorrect}
          onHide={() => this.toggleModalCorrectOff()}
        />
        <HaltModal
          show={this.state.setModalHalt}
          onHide={() => this.toggleHaltOff()}
        />

      </div>
      
    );
  }
}

export default User;
