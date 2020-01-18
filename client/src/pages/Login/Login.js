import React, { Component } from "react";
import API from "../../utils/API";
import { FormBtn, Input } from "../../components/Form";
import Logo from "../../components/Logo";

class Login extends Component {
  // Setting our component's initial state
  state = {
    username: "",
    message: "",
    adminLoginBoolean: false,
    adminName: "",
    adminEmail: "",
    adminUsername: "",
    email: ""
  };

  //handles form input change
  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    // const { name, value } = event.target;
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value
    });
  };
  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

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
              //clear field
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
          window.location = "/user/" + this.state.username;
        })
        .catch(err => console.log(err));
    }
  };

  //booleans to control rendering for login as admin and login as user
  adminLogin = event => {
    this.setState({ adminLoginBoolean: true });
  };

  loginasUser = event => {
    this.setState({ adminLoginBoolean: false });
  };

  render() {
    return (
      <div className="container">
        <Logo />
        {!this.state.adminLoginBoolean ? (
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
            <button onClick={this.adminLogin}>Login as Admin</button>
          </form>
        ) : (
          <form className="form-inline">
            <Input
              value={this.state.adminUsername}
              onChange={this.handleInputChange}
              name="adminUsername"
              placeholder="Username (required)"
            ></Input>
            <Input
              value={this.state.email}
              onChange={this.handleInputChange}
              name="email"
              placeholder="Email (required)"
            ></Input>
            <FormBtn
              disabled={!this.state.adminName || !this.state.adminEmail}
              onClick={this.handleAdminSave}
            >
              Submit
            </FormBtn>
            <button onClick={this.loginasUser}>Login as Player</button>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
