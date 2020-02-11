import React from "react";
// import { Link } from "react-router-dom";
import "./style.css";

import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'

function renderNoAuthNavbar() {
    return (
        <Navbar variant="dark" expand="lg">
        <Navbar.Brand href="#home">Best Buy</Navbar.Brand>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2 ml-5" />
          <Button variant="warning">Search</Button>
        </Form>
            <Nav className="float-right">
              <Nav.Link ><strong >login</strong></Nav.Link>
              <Nav.Link href="#link"><strong>SignUp</strong></Nav.Link>
              <Nav.Link href="#link"><strong><i class="fas fa-shopping-cart"></i></strong></Nav.Link>
            </Nav>
      </Navbar>
    )
}
export default renderNoAuthNavbar;