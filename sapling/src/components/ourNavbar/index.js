import React from "react";
// import { Link } from "react-router-dom";
import "./style.css";
import Navbar from 'react-bootstrap/Navbar'

function ourNavbar() {
    return (
      <Navbar expand="lg" variant="light" bg="light">
          <Navbar.Brand href="#">Navbar</Navbar.Brand>
      </Navbar>

    )
}
export default ourNavbar;