import React from "react";
import "./List.css";

export function ListItem({ children }) {
  return <div className="card list-group-item">{children}</div>;
}
