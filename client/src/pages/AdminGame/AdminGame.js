import React, { Component } from "react";
import Leaderboard from "../../components/Leaderboard";
import AdminBtns from "../../components/AdminBtns";
import { Col, Row, Container } from "../../components/Grid";

class AdminGame extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Leaderboard />
          </Col>

          <Col size="md-6">
            <AdminBtns />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminGame;
