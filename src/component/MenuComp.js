import React, { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { AuthContext } from "../App";

function MenuComp() {
  const { state, dispatch } = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">JWT-App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/homepage">Home</Nav.Link>
          </Nav>
          <Nav.Link className="ml-auto">
            <Button
              variant="dark"
              onClick={() =>
                dispatch({
                  type: "LOGOUT",
                })
              }
            >
              {state.isAuthenticated && "LOGOUT"}
            </Button>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MenuComp;
