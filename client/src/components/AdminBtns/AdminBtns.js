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
        className="btn-3 squishy adminbutton halt-bets"
        role="button"
        tabIndex="0"
        onClick={() => {
          // props.haltBets();
          props.setModalHalt();
        }}
      ><span>
        Halt Bets</span>
      </Button>
      <div>
        <Button
          className="btn-1 squishy adminbutton"
          role="button"
          tabIndex="0"
          onClick={() => {
            props.handleAnswer("Run");
            props.setModalCorrect("Run");
          }}
        ><span>
          Run</span>
        </Button>
        <Button
          className="btn-1 squishy adminbutton"
          role="button"
          tabIndex="0"
          onClick={() => {
            props.handleAnswer("Pass");
            props.setModalCorrect("Pass");
          }}
        ><span>
          Pass</span>
        </Button>
        <Button
          className="btn-1 squishy adminbutton"
          role="button"
          tabIndex="0"
          onClick={() => {
            props.handleAnswer("Kick");
            props.setModalCorrect("Kick");
          }}
        ><span>
          Kick</span>
        </Button>
        <Button
          className="btn-1 squishy adminbutton"
          role="button"
          tabIndex="0"
          onClick={() => {
            props.handleAnswer("Turnover");
            props.setModalCorrect("Turnover");
          }}
        ><span>
          Turnover</span>
        </Button>
      </div>
    </div>
  );
}
// }

export default AdminBtns;
