import React, { Component } from "react";
import API from "../../utils/API";
import DeleteBtn from "../../components/DeleteBtn";
import { List, ListItem } from "../../components/List";

class AdminLeaderboard extends Component {
  // Setting our component's initial state
  state = {
    scores: [],
    playerName: "",
    playerScore: ""
  };

  // When the component mounts, load all scores and save them to this.state.scores
  componentDidMount() {
    this.loadScores();
  }

  // Loads all books  and sets them to this.state.scores
  loadScores = () => {
    API.getScores()
      .then(res =>
        this.setState({
          scores: res.data,
          playerName: "",
          playerScore: ""
        })
      )
      .catch(err => console.log(err));
  };

  // Deletes a score from the database with a given id, then reloads scores from the db
  deletePlayer = id => {
    API.deletePlayer(id)
      .then(res => this.loadScores())
      .catch(err => console.log(err));
  };
  // Deletes all scores from the database, then reloads scores from the db
  deleteAllPlayers = () => {
    API.deleteAllPlayers()
      .then(res => this.loadScores()) //deletes all, but does not reload all players
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>Player Scores</h1>
        <DeleteBtn onClick={() => this.deleteAllPlayers()}>
          Delete All
        </DeleteBtn>
        <div className="container">
          {this.state.scores.length ? (
            <List>
              {this.state.scores.map(score => {
                return (
                  <ListItem key={score._id}>
                    <DeleteBtn onClick={() => this.deletePlayer(score._id)}>
                      Delete Player
                    </DeleteBtn>
                    <strong>
                      <h3>{score.playerName}</h3>
                      <p>Current Score: {score.currScore}</p>
                    </strong>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <h3>No Scores to Display</h3>
          )}
        </div>
      </div>
    );
  }
}

export default AdminLeaderboard;
