import React, { useEffect } from "react";
import { Navbar, Nav, Button, Container, FormControl, Col, CardColumns } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import { useStoreContext } from "../utils/GlobalState";
import { SET_DASHBOARD_LIST } from "../utils/actions";
import API from "../utils/API";
import { Link } from "react-router-dom";

const Dashboard = () => {

    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        getTrackedItems();
    }, []);

    const getTrackedItems = () => {
        API.getOneUser("5e4efb9517fcafdbdb20302c")
        .then(res => {
            console.log(res.data.trackedProducts)
            dispatch({type:SET_DASHBOARD_LIST, trackedList: res.data.trackedProducts})
        })
        .then(res => {
            console.log(state.trackedList)
        })
        .catch( err => console.log(err))
    };


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
             <h1>Products:</h1>
                    <Col className="md-4">
                        {!state.trackedList.length ? (
                            <h1>No products to display</h1>
                        ) : (<Container>
                            <CardColumns>
                                {state.trackedList.map(product => {
                                    return (
                                        <Card key={product.name} >
                                            <Card.Img variant="top" src={product.image} style={{ width: "45%" }} className="ml-5 pl-5 pt-5" />
                                            <Card.Body className="text-center">
                                                <Card.Title>{product.name}</Card.Title>
        
                                            </Card.Body>
                                        </Card>
                                    );
                                })}
                            </CardColumns>
                        </Container>
                            )}
                    </Col>
        </Container>







        </div>
    )


};




export default Dashboard;