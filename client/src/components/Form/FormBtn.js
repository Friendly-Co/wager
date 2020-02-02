import React from "react";
import "./Form.css";

export function FormBtn(props) {
  return (
    <div
      {...props}
      type="submit"
      className="btn-1 squishy guessButton"
    ><span>
      {props.children}
      </span>
    </div>
  );
}
