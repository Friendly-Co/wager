import React, { Component } from "react";
import "./AdminBtns.css";
// import API from "../../utils/API";

class AdminBtns extends Component {
  //Socket emitting stuff??

  // handleAnswer = e => {
  //   console.log(e.target.value);
  // };

  // handleAnswer(e) {
  //   console.log(e.target.value);
  // }

  handleAnswer = value => {
    console.log(value);
  };

  render() {
    return (
      <div>
        <span
          className="btn btn-dark halt-bets"
          role="button"
          tabIndex="0"
          onClick={() => this.haltBets()}
        >
          Halt Bets
        </span>
        <div>
          <span
            className="btn btn-primary"
            role="button"
            tabIndex="0"
            onClick={() => this.handleAnswer("Run")}
          >
            Run
          </span>
          <span
            className="btn btn-primary"
            role="button"
            tabIndex="0"
            onClick={() => this.handleAnswer("Pass")}
          >
            Pass
          </span>
          <span
            className="btn btn-primary"
            role="button"
            tabIndex="0"
            onClick={() => this.handleAnswer("Kick")}
          >
            Kick
          </span>
          <span
            className="btn btn-primary"
            role="button"
            tabIndex="0"
            onClick={() => this.handleAnswer("Turnover")}
          >
            Turnover
          </span>
        </div>
      </div>
    );
  }
}

export default AdminBtns;
