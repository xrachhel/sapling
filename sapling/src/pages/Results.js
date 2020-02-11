
import React from "react";
import Card from "../components/ResutlsCard/index"
import Navbar from "../components/ourNavbar/index"
import {Container, Row} from 'react-bootstrap'


function renderResultsList() {
    return (
    <div>
        <Navbar></Navbar>
        <Container>
            <h1 className="p-40">Results for XXXXX</h1>
                <Row><Card/></Row>
                <Row><Card/></Row>
                <Row><Card/></Row>
                <Row><Card/></Row>
                <Row><Card/></Row>
        </Container>
    </div>
    )
}

export default renderResultsList;