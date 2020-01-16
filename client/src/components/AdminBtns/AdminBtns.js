// import React, { Component } from "react";
import React from "react";
import "./AdminBtns.css";
// import io from "socket.io-client";
// import API from "../../utils/API";
// import Leaderboard from "../../components/Leaderboard";
import DeleteBtn from "../DeleteBtn";


function AdminBtns(props) {
  // render() {
  return (
    <div>
      <span
        className="btn btn-dark halt-bets"
        role="button"
        tabIndex="0"
        onClick={() => props.haltBets()}
      >
        Halt Bets
      </span>
      <div>
        <span
          className="btn btn-main"
          role="button"
          tabIndex="0"
          onClick={() => props.handleAnswer("Run")}
        >
          Run
        </span>
        <span
          className="btn btn-main"
          role="button"
          tabIndex="0"
          onClick={() => props.handleAnswer("Pass")}
        >
          Pass
        </span>
        <span
          className="btn btn-main"
          role="button"
          tabIndex="0"
          onClick={() => props.handleAnswer("Kick")}
        >
          Kick
        </span>
        <span
          className="btn btn-main"
          role="button"
          tabIndex="0"
          onClick={() => props.handleAnswer("Turnover")}
        >
          Turnover
        </span>
        
        
      </div>
    </div>
  );
}
// }

export default AdminBtns;
