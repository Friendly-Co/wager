import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./style.css";


var instructionCopy = {
    heading1: "How to Play",
    subheading1: "Welcome!",
    copy1:
        "Welcome to Just a Friendly Wager! Please enter your host-provided ID and a User Name to get started playing",
    subheading2: "Watch the Game",
    copy2:
        "As you're watching the football game on the television, try to guess what the next play will be: a RUN, a PASS, a KICK, or a TURNOVER (Turnovers are worth extra points!) When the ball is snapped, the house will stop taking guesses until the correct answer is marked by the Host. Then it's time for the next play!",
    subheading3: "Earn Points",
    copy3: "Guesses of RUN and PASS will earn you +3 points if you're correct, with KICK only being worth +1. Guessing TURNOVERS correctly will net a you a cool +10 points! But beware, wrong answers will cost you!",
    subheading4: "Stay Active",
    copy4: "For every play you do not make a guess for, 1 point will be deducted from your score.",
    subheading5: "Win Prizes",
    copy5: "Winners receive special drink and food deals throughout the game--stay tuned for messages from the Host!"
    };
    
    function InstructionsModal(props) {
      let subheading;
      let copy;
      switch (props.page) {
        case 1:
          subheading = instructionCopy.subheading1;
          copy = instructionCopy.copy1;
          break;
        case 2:
          subheading = instructionCopy.subheading2;
          copy = instructionCopy.copy2;
          break;
        case 3:
          subheading = instructionCopy.subheading3;
          copy = instructionCopy.copy3;
          break;
        case 4:
          subheading = instructionCopy.subheading4;
          copy = instructionCopy.copy4;
          break;
        case 5:
          subheading = instructionCopy.subheading5;
          copy = instructionCopy.copy5;
      }
        return (
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
              <Modal.Header style={{marginRight: 35 + 'px'}} closeButton onClick={props.toggleIntro}>
                <Modal.Title className="col-12 text-center" id="contained-modal-title-vcenter">
                    <h1 id="introh1">{instructionCopy.heading1}</h1>                
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div id="intro">
                    <h2>{subheading}</h2>
                    <p>{copy}</p>
                    <br />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={props.onHide}>{props.nextOrClose}</Button>
              </Modal.Footer>
            </Modal>
          );
        }
    
    export default InstructionsModal;
