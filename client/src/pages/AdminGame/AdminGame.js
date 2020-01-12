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
      answer: ""
    };
  }

  componentDidMount() {
    this.loadScores();
  }

  loadScores = () => {
    this.setState({
      scoreSeed: [
        {
          playerName: "Annabelle",
          currScore: 35,
          currentGuess: "Run"
        },
        {
          playerName: "Jose",
          currScore: 70,
          currentGuess: "Run"
        },
        {
          playerName: "Elli",
          currScore: 30,
          currentGuess: "Run"
        },
        {
          playerName: "Roland",
          currScore: 75,
          currentGuess: "Pass"
        },
        {
          playerName: "Denisha",
          currScore: 41,
          currentGuess: "Run"
        },
        {
          playerName: "John",
          currScore: 31,
          currentGuess: "Run"
        },
        {
          playerName: "Maria",
          currScore: 15,
          currentGuess: "Turnover"
        },
        {
          playerName: "Luz",
          currScore: 50,
          currentGuess: "Turnover"
        }
      ]
    });
  };

  haltBets = () => {
    console.log("halt bets button pressed");
    io.socket.off();
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
