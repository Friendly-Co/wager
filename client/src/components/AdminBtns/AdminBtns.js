// import React, { Component } from "react";
import React from "react";
import "./AdminBtns.css";
import Button from "react-bootstrap/Button";
// import io from "socket.io-client";
// import PlayerAPI from "../../utils/PlayerAPI";
// import Leaderboard from "../../components/Leaderboard";
// import DeleteBtn from "../DeleteBtn";

function AdminBtns(props) {
  // render() {
  return (
    <div className="center-buttons">
      <div
        className="btn-3 squishy adminbutton halt-bets"
        role="button"
        tabIndex="0"
        onClick={() => {
          props.setModalHalt();
        }}
      >
        <span>Halt Bets</span>
      </div>
      <div>
        <div
          className="btn-1 squishy adminbutton"
          role="button"
          tabIndex="0"
          onClick={() => {
            props.handleAnswer("Run");
            props.setModalCorrect("Run");
          }}
        >
          <span>Run</span>
        </div>
        <div
          className="btn-1 squishy adminbutton"
          role="button"
          tabIndex="0"
          onClick={() => {
            props.handleAnswer("Pass");
            props.setModalCorrect("Pass");
          }}
        >
          <span>Pass</span>
        </div>
        <div
          className="btn-1 squishy adminbutton"
          role="button"
          tabIndex="0"
          onClick={() => {
            props.handleAnswer("Kick");
            props.setModalCorrect("Kick");
          }}
        >
          <span>Kick</span>
        </div>
        <div
          className="btn-1 squishy adminbutton"
          role="button"
          tabIndex="0"
          onClick={() => {
            props.handleAnswer("Turnover");
            props.setModalCorrect("Turnover");
          }}
        >
          <span>Turnover</span>
        </div>
        <div
          className="btn-3 squishy adminbutton"
          role="button"
          tabIndex="0"
          onClick={() => {
            props.handleUndo();
            props.setUndoModal();
          }}
        >
          <span>Undo</span>
        </div>
      </div>
    </div>
  );
}
// }

export default AdminBtns;
