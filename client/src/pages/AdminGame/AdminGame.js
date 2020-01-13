import React, { Component } from "react";
import Leaderboard from "../../components/Leaderboard";
import AdminBtns from "../../components/AdminBtns";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import io from "socket.io-client";

class AdminGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreSeed: []
      // answer: ""
      // currentGuess: ""
    };

    this.socket = io("localhost:3001");

    //when socket receives a current bet from a user, update the scoreSeed state
    this.socket.on("RECIEVE_MESSAGE", function(data) {
      console.log(data);

      //if there is a currentGuess, render to the page- may need to change
      if (data.currentGuess !== " " && data.playerName !== " ") {
        //bug - without the data.currentGuess !== " " statement, it renders empty cards on page load- as a result, we cannot empty the currentGuess display
        addUserInfo(data);
      }
    });

    const addUserInfo = data => {
      console.log(data); // {playerName: "Tarzan", currentGuess: " "}
      this.setState(state => {
        var playerIndex = -1;
        var alreadyHere = false;
        for (let i = 0; i < state.scoreSeed.length; i++) {
          //bug- rendering some user bets twice
          if (state.scoreSeed[i].playerName === data.playerName) {
            //both if statements are firing??
            //malfunctions if you use === - It behaves like the data types are different, when they SHOULD both be strings
            playerIndex = i;
            console.log("these names are matching!");
            alreadyHere = true;
            break;
            // return;
          } else {
            console.log("hey these names don't match");
            alreadyHere = false;
          }
        }
        if (!alreadyHere) {
          const scoreSeed = state.scoreSeed.concat(data);
          return { scoreSeed };
        } else {
          var scoreSeed = state.scoreSeed;
          scoreSeed[playerIndex].currentGuess = data.currentGuess; //Note: updating state of array needs to be immutable
          playerIndex = -1;
          return { scoreSeed };
        }
      });
    };

    this.sendUserInfo = ev => {
      ev.preventDefault();
      this.socket.emit("SEND_MESSAGE", {
        user: this.state.scoreSeed.user,
        currentGuess: this.state.scoreSeed.currentGuess
      });
      this.setState({ currentGuess: "" });
      // this.setState({});
    };
  }

  haltBets = () => {
    console.log("halt bets button pressed");
    // io.socket.off();  //does not work yet
  };

  handleAnswer = value => {
    console.log(value);
    API.saveScore()
      .then(res => {
        //grab data and send in new route back to server.  Complete calculations there and then return the scores, assignt to scoreSeeds
        // console.log(res.data);
        // this.setState({
        //   scores: res.data
        // })
      })
      .catch(err => console.log(err));
    // this.setState({ answer: value });
    // console.log(this.state.scoreSeed); //undefined
  };

  deleteAllPlayers = () => {
    //function does not work as is.
    API.deleteAllPlayers()
      .then(res => this.setState({ scoreSeed: [] })) //Bug: completely breaks
      .catch(err => console.log(err));
    console.log("deletingggggg");
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Leaderboard
              scoreSeed={this.state.scoreSeed}
              deleteAllPlayers={this.deleteAllPlayers}
              currentGuess={this.state.currentGuess}
            />
          </Col>

          <Col size="md-6">
            <AdminBtns handleAnswer={this.handleAnswer} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminGame;
