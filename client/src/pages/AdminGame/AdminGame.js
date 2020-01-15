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
      scoreSeed: [],
      answer: "",
      currentGuess: ""
    };

    this.socket = io("localhost:3001");

    //when socket receives a current bet from a user, update the scoreSeed state
    this.socket.on("RECIEVE_MESSAGE", function(data) {
      //if there is a currentGuess, render to the page- may need to change
      if (data.currentGuess !== " " && data.playerName !== " ") {
        //bug - without the data.currentGuess !== " " statement, it renders empty cards on page load- as a result, we cannot empty the currentGuess display
        addUserInfo(data);
        console.log(
          "the guess " +
            data.currentGuess +
            " came from user " +
            data.playerName
        );
      }
    });

    const addUserInfo = data => {
      // console.log(data); // {playerName: "Tarzan", currentGuess: " "}
      this.setState(state => {
        var playerIndex = -1;
        var alreadyHere = false;
        //make sure we only update current players's guesses
        for (let i = 0; i < state.scoreSeed.length; i++) {
          if (state.scoreSeed[i].playerName == data.playerName) {
            //malfunctions if you use === - It behaves like the data types are different, when they SHOULD both be strings
            playerIndex = i;
            console.log("these names are matching!");
            alreadyHere = true;
            break;
          } else {
            console.log("hey these names don't match");
            alreadyHere = false;
          }
        }
        // Create a new card for new player
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

  //send house answer and player guesses to the server for calculation
  handleAnswer = value => {
    const houseAnswer = { answer: value };
    const toSend = this.state.scoreSeed.concat(houseAnswer);
    console.log(value);
    console.log(value);
    API.saveScore(toSend)
      .then(res => {
        // console.log(res.data);
        console.log("after that, ...");
        API.getScores().then(response => {
          console.log("here is your data :");
          console.log(response.data);
          //   this.setState(state => {
          //     var scoreSeed = state.scoreSeed;
          //     scoreSeed = response.data; //Note: updating state of array needs to be immutable
          // });
        });
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
