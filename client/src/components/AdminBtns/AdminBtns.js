import React, { Component } from "react";
import "./AdminBtns.css";
// import API from "../../utils/API";

class AdminBtns extends Component {
  haltBets = () => {
    console.log("halt bets button pressed");
    //Socket emitting stuff??
  };

  handleAnswer = value => {
    console.log(value);
    //Socket emitting stuff??
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
