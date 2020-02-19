import React from "react";
import {Jumbotron, Button} from 'react-bootstrap';
import "./style.css";



function renderJumbotron() {
    return (
    <Jumbotron>
  <h1>Checkout This Weeks Top Products!</h1>
  <p>
    The latest in all your favorite catagories at the lowest prices. 
  </p>
  <p>
    <Button variant="primary">Learn more</Button>
  </p>
    </Jumbotron>
    )
}

export default renderJumbotron;