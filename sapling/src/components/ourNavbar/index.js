import React from "react";
// import { Link } from "react-router-dom";
import "./style.css";
// import Navbar from 'react-bootstrap/Navbar'
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'

function ourNavbar() {
    return (
      <Navbar variant="dark" expand="lg">
      <Navbar.Brand href="#home">Best Buy</Navbar.Brand>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2 ml-5" />
        <Button variant="success">Search</Button>
      </Form>
          <Nav className="float-right">
            <Nav.Link href="#link"><strong>Useer Name</strong></Nav.Link>
            <Nav.Link href="#link"><strong><i class="fas fa-shopping-cart"></i></strong></Nav.Link>
          </Nav>
    </Navbar>
    )
}
export default ourNavbar;

