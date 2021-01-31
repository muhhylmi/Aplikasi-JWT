import React from "react";
import { Button, Jumbotron } from "react-bootstrap";

function Public() {
  return (
    <Jumbotron>
      <Container>
        <h1>Home Public Page</h1>
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

export default Public;
