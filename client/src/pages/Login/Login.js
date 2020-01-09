import React, { Component } from "react";
import API from "../../utils/API";
import { FormBtn, Input } from "../../components/Form";

class Login extends Component {
  // Setting our component's initial state
  state = {
    username: "",
    message: ""
  };

  //handles form input change
  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  //search the database for any matching usernames.
  //If matching, alert the user to change their name
  handleSave = event => {
    event.preventDefault();
    //verify unique username
    if (this.state.username) {
      API.getScores()
        .then(res => {
          console.log(res.data);
          for (let i = 0; i < res.data.length; i++) {
            if (this.state.username === res.data[i].playerName) {
              this.setState({
                message: alert(
                  "This username has been taken. Please enter a unique name."
                )
              });
              return false;
            }
          }
          //handle save
          var toSave = {
            playerName: this.state.username
          };
          API.saveScore(toSave).then(
            this.setState({ message: alert("Your username has been saved") })
          );
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div className="container">
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
