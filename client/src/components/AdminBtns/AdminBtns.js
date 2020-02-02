// import React, { Component } from "react";
import React from "react";
import "./AdminBtns.css";
import Button from 'react-bootstrap/Button';
// import io from "socket.io-client";
// import PlayerAPI from "../../utils/PlayerAPI";
// import Leaderboard from "../../components/Leaderboard";
// import DeleteBtn from "../DeleteBtn";

function AdminBtns(props) {
  // render() {
  return (
    <div className="center-buttons">
      <Button
        // className="btn btn-dark halt-bets"
        role="button"
        tabIndex="0"
        onClick={() => {
          // props.haltBets();
          props.setModalHalt();
        }}
      >
        Halt Bets
      </Button>
      <div>
        <Button
          // className="btn btn-main"
          role="button"
          tabIndex="0"
          onClick={() => {
            props.handleAnswer("Run");
            props.setModalCorrect("Run");
          }}
        >
          Run
        </Button>
        <Button
          // className="btn btn-main"
          role="button"
          tabIndex="0"
          onClick={() => {
            props.handleAnswer("Pass");
            props.setModalCorrect("Pass");
          }}
        >
          Pass
        </Button>
        <Button
          // className="btn btn-main"
          role="button"
          tabIndex="0"
          onClick={() => {
            props.handleAnswer("Kick");
            props.setModalCorrect("Kick");
          }}
        >
          Kick
        </Button>
        <Button
          // className="btn btn-main"
          role="button"
          tabIndex="0"
          onClick={() => {
            props.handleAnswer("Turnover");
            props.setModalCorrect("Turnover");
          }}
        >
          Turnover
        </Button>
      </div>
    </div>
  );
}
// }

export default AdminBtns;
