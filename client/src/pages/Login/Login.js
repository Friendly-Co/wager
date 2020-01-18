import React, { Component } from "react";
import API from "../../utils/API";
import AdminAPI from "../../utils/AdminAPI";
import { FormBtn, Input } from "../../components/Form";
import Logo from "../../components/Logo";

class Login extends Component {
  // Setting our component's initial state
  state = {
    username: "",
    message: "",
    adminLoginBoolean: false,
    adminEmail: "",
    adminName: ""
  };

  //handles form input change for all fields
  handleInputChange = event => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value
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

  //======================Admin Function ====================================

  handleAdminSave = event => {
    event.preventDefault();
    //verify unique username
    if (this.state.adminName) {
      console.log("this.state.adminName: ");
      console.log(this.state.adminName);
      AdminAPI.getAllAdmin()
        .then(res => {
          console.log(res.data);
          //if there is an admin already in the system, they were logged out
          // make sure their email and name match the database
          //then log them back in
          if (res.data.length) {
            if (
              this.state.adminName !== res.data[0].adminName &&
              this.state.adminEmail !== res.data[0].adminEmail
            ) {
              this.setState({
                message: alert(
                  "This username and email do not match our database. Please try again"
                )
              });
              //email username option...add button to email
              return false;
            }

            if (this.state.adminName !== res.data[0].adminName) {
              this.setState({
                message: alert(
                  "This username does not match our database. Please try again"
                )
              });
              //email username option...add button to email
              return false;
            }

            if (this.state.adminEmail !== res.data[0].adminEmail) {
              this.setState({
                message: alert(
                  "This email does not match our database. Please try again"
                )
              });
              //change email option?
              return false;
            }

            // if already in the database and their input matches, load the admin page
            else if (
              this.state.adminName === res.data[0].adminName &&
              this.state.adminEmail === res.data[0].adminEmail
            ) {
              window.location = "/admingame/admin/" + this.state.adminName;
            }
          }
          // if no admin are in the database, save info and log in
          else if (!res.data.length) {
            var toSave = {
              adminName: this.state.adminName,
              adminEmail: this.state.adminEmail
            };
            AdminAPI.saveAdmin(toSave).then(res => {
              console.log(
                "this is the response we got back after saving your login: "
              );
              console.log(res);
              this.setState({
                message: alert("Your username and email have been saved")
              });

              window.location = "/admingame/admin/" + this.state.adminName;
            });
          }
        })
        .catch(err => console.log(err));
    }
  };

  //boolean to control rendering for login as admin and login as user
  toggleLogin = event => {
    this.setState(prevState => ({
      adminLoginBoolean: !prevState.adminLoginBoolean
    }));
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
            <button onClick={this.toggleLogin}>Login as Admin</button>
          </form>
        ) : (
          <form className="form-inline">
            <Input
              value={this.state.adminName}
              onChange={this.handleInputChange}
              name="adminName"
              placeholder="Username (required)"
            ></Input>
            <Input
              value={this.state.adminEmail}
              onChange={this.handleInputChange}
              name="adminEmail"
              placeholder="Email (required)"
            ></Input>
            <FormBtn
              disabled={!this.state.adminName || !this.state.adminEmail}
              onClick={this.handleAdminSave}
            >
              Submit
            </FormBtn>
            <button onClick={this.toggleLogin}>Login as Player</button>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
