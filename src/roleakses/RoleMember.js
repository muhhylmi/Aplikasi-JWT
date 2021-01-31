import React, { useContext } from "react";
import { Button, Container, Jumbotron } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";

function RoleMember() {
  const { state } = useContext(AuthContext);
  if (!state.isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <Jumbotron>
      <Container>
        <h1>
          Hello, {state.role} yaitu {state.user}
        </h1>
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

export default RoleMember;
