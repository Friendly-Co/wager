import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./style.css";


function HaltModal(props) {
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                <img alt="football field" src="https://media.istockphoto.com/vectors/american-football-field-background-illustration-vector-id478540218?k=6&m=478540218&s=612x612&w=0&h=a_29HZiRtjFZwA1io1IkcI7G3HbS-NMNx9QN8o9MoKc="></img>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div id="watch">
                <h2>No more bets!</h2>
                <h4>Put down your phones and watch the game!</h4>
            </div>
        
            
        
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }

export default HaltModal;