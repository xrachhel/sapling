import React from "react";
// import { Link } from "react-router-dom";
import './assets/css/style.css';

import Login from "../logInModal/index";
import { Navbar, Nav, Form, FormControl, Button, Row } from 'react-bootstrap'
import { STATES } from "mongoose";

function ourNavbar() {
    return (
      <Navbar id="guest-navbar" expand="lg">
          {/* <Row> */}
            <Navbar.Brand id="app-nav-name" href="/home"><i id="sapling-nav-logo" class="fas fa-seedling"></i> <a id="S">S</a>apling</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light"/>
              <Navbar.Collapse id="basic-navbar-nav">

                <Nav className="mr-auto">
                  <Button href="/home" id="nav-home-link">
                    <i id="nav-home-icon" class="fas fa-home"></i>
                    <p>Home</p>
                  </Button>

                  <Button href="#dashboard" id="nav-home-link" href="/dashboard">
                    <i id="nav-home-icon" class="fas fa-chart-line"></i>
                    <p>Dashboard</p>
                  </Button>
                </Nav>


                {/* <Form> */}
                {/* <Row> */}
                  <FormControl id="search-bar" type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="outline-success">Search</Button>
                {/* </Row> */}

                  <button href="#news" id="nav-news-link">
                    <i id="nav-news-icon" class="fas fa-bell"></i>
                    <p> </p>
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