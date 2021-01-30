import React, { useContext } from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";

function HomeComp() {
  const { state, dispatch } = useContext(AuthContext);

  if (!state.isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <Jumbotron>
      <h1>Hello, {state.user}</h1>
      <p>
        This is a simple hero unit, a simple jumbotron-style component for
        calling extra attention to featured content or information.
      </p>
      <p>
        <Button variant="primary">Learn more</Button>
      </p>
    </Jumbotron>
  );
}

export default HomeComp;
