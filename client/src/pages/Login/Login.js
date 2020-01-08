import React, { Component } from "react";
import API from "../../utils/API";
import { FormBtn, Input } from "../../components/Form";

class Login extends Component {
  // Setting our component's initial state
  state = {
    username: "",
    message: ""
  };

  // When the component mounts, load all scores and save them to this.state.scores
  //   componentDidMount() {
  //     this.loadScores();
  //   }

  //handles form input change
  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleSave = event => {
    event.preventDefault();
    if (this.state.username) {
      var toSave = {
        playerName: this.state.username
      };
      API.saveScore(toSave).then(
        this.setState({ message: alert("Your username has been saved") })
      );
    }
  };

  // Loads all books  and sets them to this.state.scores
  //   loadScores = () => {
  //     API.getScores()
  //       .then(res =>
  //         this.setState({
  //           scores: res.data
  //         })
  //       )
  //       .catch(err => console.log(err));
  //   };

  // Deletes a score from the database with a given id, then reloads scores from the db
  //   deletePlayer = id => {
  //     API.deletePlayer(id)
  //       .then(res => this.loadScores())
  //       .catch(err => console.log(err));
  //   };

  render() {
    return (
      <div className="container">
        {/* <DeleteBtn onClick={() => this.deletePlayer(score._id)}>
                      Delete Player
                    </DeleteBtn> */}
        <form className="form-inline">
          <Input
            value={this.state.username}
            onChange={this.handleInputChange}
            name="username"
            placeholder="Username (required)"
          ></Input>
          <FormBtn disabled={!this.state.username} onClick={this.handleSave}>
            Submit
          </FormBtn>
        </form>
      </div>
    );
  }
}

export default Login;
