import React, { useContext } from "react";
import { Button, Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../App";

function MenuAdmin() {
  const { dispatch } = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">JWT-App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink to="/dashboard" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/transaksi" className="nav-link">
              Transaksi
            </NavLink>
            <NavLink to="/mahasiswa" className="nav-link">
              Mahasiswa
            </NavLink>
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
              Logout
            </Button>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MenuAdmin;
