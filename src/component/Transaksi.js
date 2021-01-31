import React, { useContext } from "react";
import { Button, Jumbotron, Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";

function Transaksi() {
  const { state } = useContext(AuthContext);
  if (!state.isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <Jumbotron>
      <Container>
        <h1>Transaksi</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Container>
    </Jumbotron>
  );
}

export default Transaksi;
