import React, { useContext } from "react";
import { Jumbotron, Button, Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";

function HomeComp() {
  const { state } = useContext(AuthContext);

  if (!state.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  if (state.role === 2) {
    return <Redirect to="/admin" />;
  } else if (state.role === 3) {
    return <Redirect to="/staff" />;
  } else if (state.role === 4) {
    return <Redirect to="/member" />;
  }

  return (
    <Jumbotron>
      <Container>
        <h1>Hello, {state.user}</h1>
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

export default HomeComp;
