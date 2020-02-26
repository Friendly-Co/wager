import React from "react";
import Alert from "react-bootstrap/Alert";

function AlertMessages(props) {
  let show = props.alertVisible;
  let mess;
  let color;
  switch (props.message) {
    case 1:
      mess =
        "This username has dropped below zero points in this game.  Create a new player to continue playing this game. Better luck next time!";
      color = "danger";
      break;
    case 2:
      mess = "Welcome Back!";
      color = "primary";
      break;
    case 3:
      mess =
        "This email or username does not match our database for this game. Please try again. If you would like an email sent to your registered account, click 'Email Login Info'";
      color = "danger";
      break;
    case 4:
      mess = "Your username has been saved! Redirecting to your game page.";
      color = "primary";
      break;
    case 5:
      mess = `A new ${props.newGame} game has been created with the username: ${props.adminName} and associated email: ${props.adminEmail}.`;
      color = "primary";
      break;
    case 6:
      mess =
        "This username and email do not match our database. Please try again";
      color = "danger";
      break;
    case 7:
      mess =
        'This username does not match our database for this game. Please try again. If you would like an email reminder of your username, click "Email Login Info"';
      color = "danger";
      break;
    case 8:
      mess =
        "This email does not match our database for this user's game. Please try again. If you would like an email sent to your registered account, click 'Email Login Info'";
      color = "danger";
      break;
    case 9:
      mess = "Must be a valid email format, ex: myName@email.com";
      color = "danger";
      break;
    case 10:
      mess = "Username must be 32 characters or less";
      color = "danger";
      break;
  }

  return (
    <div>
      <Alert
        show={show}
        variant={color}
        onClose={() => props.setShow()}
        dismissible
      >
        <p>{mess}</p>
      </Alert>
    </div>
  );
}

export default AlertMessages;
