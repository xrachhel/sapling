
import React from "react";
import "./style.css";
import {Form, Button, Col, Container, Row, Navbar, FormControl} from 'react-bootstrap'


function renderResultsList() {
    return (
    <div>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Sapling</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    <Container>
        <Row>
            <Col>Place the results inide multiple cols</Col>
        </Row>
    </Container>
    </div>
    )
}

export default renderResultsList;