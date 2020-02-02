import React from "react";
import "./style.css";
import { Container, Row, Col } from "../Grid";

function GuessButtons(props) {
    return(
        <div>
            <Row>
                {/* <Col size='lg-4 md-6'> */}
                    <div className="guessButton squishy btn-1" onClick={() => {
                        props.guessUpdate("RUN");
                    }}>
                        <span value="RUN" id="runBttn">RUN</span>
                    </div>
                {/* </Col> */}
                
                {/* <Col size='lg-4 md-6'>     */}
                        <div className="guessButton squishy btn-1" onClick={() => {
                            // insert onclick functions here 
                            props.guessUpdate("PASS");
                        }}>
                            <span value="PASS" id="passBttn">PASS</span>
                        </div>
                {/* </Col>  */}
            
            </Row>
            <Row>
        <div className="guessButton squishy btn-1" onClick={() => {
            // insert onclick functions here 
            props.guessUpdate("KICK");
        }}>
            <span value="KICK" id="kickBttn">KICK</span>
        </div>
        <div className="guessButton squishy btn-1" onClick={() => {
            // insert onclick functions here
            props.guessUpdate("TURNOVER");
            // props.toggleModalOn();

        }}>
            <span value="TURNOVER" id="turnoverBttn">TURNOVER</span>
        </div>
        </Row>
        <div className="guessButton squishy btn-3" onClick={() => {
            // insert onclick functions here
            props.toggleModalOn();
            console.log("leaderboard clicked");

        }}>
            <span>LEADERBOARD</span>
        </div>
        </div>
    );
}

export default GuessButtons;