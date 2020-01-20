import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./style.css";


var instructionCopy = {
    heading1: "Welcome!",
    subheading1: "How to Play:",
    copy1:
        "Welcome to Just a Friendly Wager! Please enter your host-provided ID and a User Name to get started playing",
    subheading2: "Watch the Game:",
    copy2:
        "As your watching the football game on the television, try to guess what the next play will be: a RUN, a PASS, a KICK, or a TURNOVER (Turnovers are worth extra points!) <br> When the ball is snapped, the house will stop taking guesses until the correct answer is marked by the Host. Then it's time for the next play!",
    subheading3: "Earn Points:",
    copy3: "Guesses of RUN, PASS, AND KICK will earn you +5 points if you're correct. Guessing TURNOVERS correctly will net a you a cool +10 points! But beware, wrong answers will cost you!",
    copy4: "For every play you do not make a guess for, -1 point will be deducted from your score. ",
    subheading4: "PRIZES:",
    copy5: "Winners receive special drink and food deals throughout the game--stay tuned for messages from the Host! "
    };
    
    function InstructionsModal(props) {
        return (
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
              <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h1>{instructionCopy.heading1}</h1>                
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div id="watch">
                    <h2>{instructionCopy.subheading1}</h2>
                    <p>{instructionCopy.copy1}}</p>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>
          );
        }
    
    export default InstructionsModal;
