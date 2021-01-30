import React, { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { AuthContext } from "../App";

function MenuComp() {
  const { state, dispacth } = useContext(AuthContext);
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">JWT-App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
          <Nav.Link href="#link" className="ml-auto">
            <Button
              variant="dark"
              onClick={() =>
                dispacth({
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
