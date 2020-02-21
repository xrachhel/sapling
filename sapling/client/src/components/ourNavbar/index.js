import React from "react";
// import { Link } from "react-router-dom";
import './assets/css/style.css';

import Login from "../logInModal/index";
import { Navbar, Nav, Form, FormControl, Button, Row } from 'react-bootstrap'

function ourNavbar() {
    return (
      <Navbar id="guest-navbar" expand="lg">
          <Row>
            <Navbar.Brand id="app-nav-name" href="#home"><i id="sapling-nav-logo" class="fas fa-seedling"></i> <a id="S">S</a>apling</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">

                <Nav className="mr-auto">
                  <button href="#home" id="nav-home-link">
                    <i id="nav-home-icon" class="fas fa-home"></i>
                    <p>Home</p>
                  </button>
                </Nav>

                {/* <Form> */}
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="outline-success">Search</Button>
                  <Login/>
                {/* </Form> */}

              </Navbar.Collapse>
          </Row>
      </Navbar>
    )
}
export default ourNavbar;