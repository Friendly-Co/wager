import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./style.css";

var endCopy = {
  heading1: "GAME OVER",
  NoWinHead: "Sorry, you did not win any prizes this time around",
  noWinCopy: "Stay tuned for future games of Just a Friendly Wager",
  WinHead: "YOU WON!",
  WinCopy:
    "See your host to redeem your prize! Use Win Code: #######. Thank you for playing `Just a Friendly Wager`!",
  general1:
    "`Just a Friendly Wager` was developed by Sarah Arnold, Taylor Ellis, and Grant Bowen",
  github:
    "For more information about this project, please vist our Github at: https://github.com/Friendly-Co/wager"
};

function EndGameModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title
          className="col-12 text-center"
          id="contained-modal-title-vcenter"
        >
          <h1>{endCopy.heading1}</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div id="watch">
          <h2>{endCopy.WinHead}</h2>
          <p>{endCopy.WinCopy}</p>
          <br />
          <h2>{endCopy.NoWinHead}</h2>
          <p>{endCopy.noWinCopy}</p>
          <br />
          <h2>{endCopy.general1}</h2>
          <p>{endCopy.github}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EndGameModal;
