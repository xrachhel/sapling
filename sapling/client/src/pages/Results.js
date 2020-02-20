import React, { useEffect } from "react";
import { Navbar, Nav, Form, FormControl, Button, Container, Col, CardColumns } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import { useStoreContext } from "../utils/GlobalState"
import { UPDATE_RESULT_LIST } from "../utils/actions";
import API from "../utils/API";
import { Link } from "react-router-dom"




const Results = () => {
    const [state, dispatch] = useStoreContext();


    useEffect(() => {
        getResults("sunglasses");
    }, []);


    const getResults = (search) => {
        API.searchProductWalmart(search)
        .then(res =>{ 
            console.log(res)
            dispatch({ type: UPDATE_RESULT_LIST, productList: res.data.items})})
        .catch(err => console.log(err));
    };

    // const trackProduct = () => {
    //     dispatch({ type: TRACK_PRODUCT, trackedList: state.currentProduct });
    // };


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
                        {!state.productList.length ? (
                            <h1>No products to display</h1>
                        ) : (<Container>
                            <CardColumns>
                                {state.productList.map(product => {
                                    return (
                                        <Card key={product.name} >
                                            <Card.Img variant="top" src={product.thumbnailImage} style={{ width: "45%" }} className="ml-5 pl-5 pt-5" />
                                            <Card.Body className="text-center">
                                                <Card.Title>{product.name}</Card.Title>
                                                <Card.Text>
                                                    <strong>Price: </strong> ${product.salePrice}
                                                </Card.Text>
                                                <Card.Text>
                                                    <strong>Rating:</strong>
                                                    {product.customerRating}/5
                                                </Card.Text>
                                                <Link to={"/product/" + product.itemId + "/" + product.upc}>Track Product</Link>
                                                {/* <Button variant="success" onClick={trackProduct}>Track Product</Button> */}
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
}



export default Results;