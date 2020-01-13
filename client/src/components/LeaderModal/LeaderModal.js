import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./style.css";


function LeaderModal(props) {
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                <h2>
              LeaderBoard
                </h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{props.username} : {props.score}</h4>
            
            <table id="leaderboard">
            <tbody>
                <tr>
                <th>Rank</th>
                <th>User Name</th>
                <th>Score</th>
                </tr>
                {props.leaderboard}
                </tbody>
            </table>
            
        
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }

export default LeaderModal;