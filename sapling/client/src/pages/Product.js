import React, { useEffect } from "react";
import { Navbar, Nav, Form, FormControl, Button, Container, Col, CardColumns } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import { useStoreContext } from "../utils/GlobalState"
import { SET_CURRENT_PRODUCT, SET_AMAZON_PRODUCT } from "../utils/actions";
import API from "../utils/API";

const Product = props => {

    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        getProduct()
        getAmazon();
    }, []);

    const getProduct = () => {
        API.getProductInfoWalmart(props.match.params.itemId)
        .then(res => {
            dispatch({type: SET_CURRENT_PRODUCT, product: res.data})})
        .catch(err => console.log(err))
    };

    const getAmazon = () => {
        console.log("*******",props.match.params.upc)
        API.getProductInfoAmazon(props.match.params.upc)
        .then(res => {
            console.log(res.data)
            dispatch({type: SET_AMAZON_PRODUCT, product: res.data})
        })
        .catch(err => console.log(err))
    };

    const getBestBuy = () => {

    }



    return(
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



        <Card style={{width:"18rem"}} className="shadow-sm">
            <Card.Title>{state.currentProduct.name}</Card.Title>
            <Card.Img src={state.currentProduct.thumbnailImage} variant="top" style={{ width: "45%" }} className="ml-5 pl-5 pt-5"/>
            <Card.Text>Description: {state.currentProduct.shortDescription}</Card.Text>

            
        </Card>

        <Card>
            <Card.Title>Amazon:</Card.Title>
            <Card.Text>{state.amazonProduct.product.title}</Card.Text>
        </Card>

        {/* <Card>
            <Card.Title>Best Buy:</Card.Title>
        </Card>  */}

</Container>
        </div>
    );
};

export default Product;