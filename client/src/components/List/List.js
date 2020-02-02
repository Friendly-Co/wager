import React from "react";
import "./List.css";
import Table from 'react-bootstrap/Table';

export function List({ children }) {
  return (
    <div className="container">
      <Table striped bordered hover>{children}</Table>
    </div>
  );
}
