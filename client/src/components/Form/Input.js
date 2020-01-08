import React from "react";
import "./Form.css";

export function Input(props) {
  return (
    <div className="form-group form-inline mx-sm-3 mb-2">
      <input className="form-control" {...props} />
    </div>
  );
}
