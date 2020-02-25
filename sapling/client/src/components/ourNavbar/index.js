import React from "react";
// import { Link } from "react-router-dom";
import './assets/css/style.css';

import Login from "../logInModal/index";
import { Navbar, Nav, Form, FormControl, Button, Row } from 'react-bootstrap'

function ourNavbar() {
    return (
      <Navbar id="guest-navbar" expand="lg">
          {/* <Row> */}
            <Navbar.Brand id="app-nav-name" href="#home"><i id="sapling-nav-logo" className="fas fa-seedling"></i> <a id="S">S</a>apling</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" id="nav-toggle" className="bg-light"/>
              <Navbar.Collapse id="basic-navbar-nav">

                <Nav className="mr-auto">
                  <button href="#home" id="nav-home-link">
                    <i id="nav-home-icon" className="fas fa-home"></i>
                    <p>Home</p>
                  </button>

                  <button href="#dashboard" id="nav-home-link">
                    <i id="nav-home-icon" className="fas fa-chart-line"></i>
                    <p>Dashboard</p>
                  </button>
                </Nav>


                {/* <Form> */}
                {/* <Row> */}
                  <FormControl id="search-bar" type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="outline-success">Search</Button>
                {/* </Row> */}

                  <button href="#news" id="nav-news-link">
                    <i id="nav-news-icon" className="fas fa-bell"></i>
                    <p></p>
                  </button>
                {/* </Form> */}


              <Nav>
                <Login/>
              </Nav>

                {/* <Nav>
                  <button href="#logout" id="login-modal-button">
                    <i id="login-button-icon" class="fas fa-sign-out-alt"></i>
                    <p>Sign-Out</p>
                  </button>
                </Nav> */}

              </Navbar.Collapse>
          {/* </Row> */}
      </Navbar>
    )
}
export default ourNavbar;