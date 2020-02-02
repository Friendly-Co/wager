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
          <Modal.Header>
            <Modal.Title className="col-12 text-center" id="contained-modal-title-vcenter">
              <div id="leaderTitle">
                <h2>LeaderBoard</h2>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h4 id="leaderRank">Your Rank: <span className="rankNscore">{props.currentrank}</span></h4>
              </div>
              <div>
                <h4 id="leaderScore">Your Score: <span className="rankNscore">{props.score}</span></h4>
                </div>
            
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