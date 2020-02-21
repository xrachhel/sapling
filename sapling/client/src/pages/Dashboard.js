import React, { useEffect, useState } from "react";
import { Navbar, Nav, Button, Container, FormControl, Col, CardColumns } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import { useStoreContext } from "../utils/GlobalState";
import { SET_DASHBOARD_LIST, SET_CURRENT_PRODUCT, LOADING } from "../utils/actions";
import API from "../utils/API";
import { Link } from "react-router-dom";

const Dashboard = () => {

    const [state, dispatch] = useStoreContext();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const getModal = value => {
        setShow(value)
        getWalmart(value)
    };

    useEffect(() => {
        getTrackedItems();
    }, []);

    const getTrackedItems = () => {
        API.getOneUser("5e501cfb343503e52a09651f")
            .then(res => {
                console.log(res.data.trackedProducts)
                dispatch({ type: SET_DASHBOARD_LIST, trackedList: res.data.trackedProducts})
            })
            .catch(err => console.log(err))
    };
 
    const getWalmart = (value) => {
        API.getProductInfoWalmart(state.trackedList[value].itemId)
            .then(res => {
                console.log(res.data)
                dispatch({ type: LOADING })
                dispatch({ type: SET_CURRENT_PRODUCT, product: { name: res.data.name, image: res.data.thumbnailImage, description: res.data.shortDescription, price: res.data.salePrice, upc: res.data.upc, itemId: res.data.itemId } })
            })
            .catch(err => console.log(err))
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
                <h1>Your Tracked Products:</h1>
                <Col className="md-4">
                    {!state.trackedList.length ? (
                        <h1>No products to display</h1>
                    ) : (<Container>
                        <CardColumns>
                            {state.trackedList.map((product, index) => (
                                <div>
                                    <Card key={product.name} >
                                        <Card.Img variant="top" src={product.image} style={{ width: "45%" }} className="ml-5 pl-5 pt-5" />
                                        <Card.Body className="text-center">
                                            <Card.Title>{product.name}</Card.Title>
                                            <Button variant="primary" onClick={() => getModal(index)}>See Product Info</Button>
                                        </Card.Body>
                                    </Card>
                                    <Modal show={show === index} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>{product.name}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>Walmart price before : ${product.price}</Modal.Body>
                                        <Modal.Body>Walmart price now: ${state.currentProduct.price}</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                                </Button>
                                            <Button variant="primary" onClick={handleClose}>
                                                Save Changes
                                                </Button>
                                        </Modal.Footer>
                                    </Modal>

                                </div>
                            ))}
                        </CardColumns>

                    </Container>

                        )}
                </Col>
            </Container>



        </div>
    )


};




export default Dashboard;