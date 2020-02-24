import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./style.css";


function CorrectModal(props) {
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
            <div className="imgContainer">
                <img className="modalImg" alt="football field" src="https://media.istockphoto.com/vectors/american-football-field-background-illustration-vector-id478540218?k=6&m=478540218&s=612x612&w=0&h=a_29HZiRtjFZwA1io1IkcI7G3HbS-NMNx9QN8o9MoKc="></img>
                </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>You guessed</h4>
            <div id={props.rightOrWrong} className="bigStyle">
                {props.rightOrWrong}!
                </div>
            <h4>The correct answer was</h4>
            <div id="answer" className="bigStyle">
                {props.answer}
                </div>

            
        
          </Modal.Body>
          <Modal.Footer>
            <Button id="leaderBttn" onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }

export default CorrectModal;