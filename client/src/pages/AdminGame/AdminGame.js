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

    this.socket.on("RECIEVE_MESSAGE", function(data) {
      addUserInfo(data);
      console.log(data);
    });

    const addUserInfo = data => {
      console.log(data); // {player: "Tarzan", currentGuess: " "}
      // this.setState({ currentGuess: data.currentGuess, data }); // here
      // if (Object.values(data).includes("")) {
      if (data.player != " ") {
        //BUG objects are always truthy :/
        this.setState(state => {
          var scoreSeed = state.scoreSeed.concat(data);
          return { scoreSeed };
        });
        console.log(this.state.currentGuess);
      }
    };

    this.sendUserInfo = ev => {
      ev.preventDefault();
      this.socket.emit("SEND_MESSAGE", {
        user: this.state.scoreSeed.user,
        currentGuess: this.state.scoreSeed.currentGuess
      });
      this.setState({ currentGuess: "" });
      this.setState({});
      // console.log({ currentGuess });
    };
  }

  // componentDidMount() {
  //   this.loadScores();
  // }

  // loadScores = () => {
  //   this.setState({
  //     scoreSeed: [
  //       {
  //         playerName: "Annabelle",
  //         currScore: 35,
  //         currentGuess: "Run"
  //       },
  //       {
  //         playerName: "Jose",
  //         currScore: 70,
  //         currentGuess: "Run"
  //       },
  //       {
  //         playerName: "Luz",
  //         currScore: 50,
  //         currentGuess: "Turnover"
  //       }
  //     ]
  //   });
  // };

  haltBets = () => {
    console.log("halt bets button pressed");
    // io.socket.off();  //does not work yet
    //Socket emitting stuff??
  };

  handleAnswer = value => {
    console.log(value);
    API.getScores()
      .then(res => {
        console.log(res.data);
        // this.setState({
        //   scores: res.data
        // })
      })
      .catch(err => console.log(err));
    //Socket emitting stuff??
    this.setState({ answer: value });
    console.log(this.state.scoreSeed); //undefined
  };

  deleteAllPlayers = () => {
    API.deleteAllPlayers()
      .then(res => this.loadScores()) //Bug: deletes all, but does not reload
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
