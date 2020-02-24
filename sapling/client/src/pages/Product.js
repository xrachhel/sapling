import React, { useEffect } from "react";
import { Navbar, Nav, Button, Container, FormControl } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import { useStoreContext } from "../utils/GlobalState";
import { SET_CURRENT_PRODUCT, SET_AMAZON_PRODUCT, SET_BESTBUY_PRODUCT, LOADING, TRACK_PRODUCT } from "../utils/actions";
import API from "../utils/API";
import { Link } from "react-router-dom";

const Product = props => {

    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        getProduct()
        // getAmazon();
        getBestBuy();
    }, []);

    const getProduct = () => {
        API.getProductInfoWalmart(props.match.params.itemId)
            .then(res => {
                dispatch({ type: LOADING })
                dispatch({ type: SET_CURRENT_PRODUCT, product: { name: res.data.name, image: res.data.thumbnailImage, description: res.data.shortDescription, price: res.data.salePrice, upc: res.data.upc, itemId: res.data.itemId, link: res.data.productUrl } })
            })
            .catch(err => console.log(err))
    };

    // const getAmazon = () => {
    //     API.getProductInfoAmazon(props.match.params.upc)
    //     .then(res => {
    //         console.log(res.data.product.buybox_winner.price.value)
    //         dispatch({type: LOADING})
    //         dispatch({type: SET_AMAZON_PRODUCT, product:{name:res.data.product.title, link:res.data.product.link, price:res.data.product.buybox_winner.price.raw}})
    //     })
    //     .catch(err => console.log(err))
    // };

    const getBestBuy = () => {
        API.getProductInfoBestbuy(props.match.params.upc)
            .then(res => {
                console.log(res.data)
                dispatch({ type: LOADING })
                dispatch({ type: SET_BESTBUY_PRODUCT, product: { name: res.data.products.name, link: res.data.products.url, price: res.data.products.salePrice } })
            })
            .catch(err => console.log(err))
    };

    const trackProduct = (event) => {
        event.preventDefault();
        console.log(state.currentProduct.upc)
        const productObj = { 
            name: state.currentProduct.name, 
            upc: state.currentProduct.upc, 
            itemId: state.currentProduct.itemId,
            price: state.currentProduct.price, 
            image: state.currentProduct.image,
            amazonPrice: state.amazonProduct.price,
            bestbuyPrice: state.bestbuyProduct.price
        }
        API.trackProduct("5e501cfb343503e52a09651f", productObj)
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: TRACK_PRODUCT,
                    product: state.currentProduct
                });
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



                <Card className="shadow-sm">
                    <Card.Title>{state.currentProduct.name}</Card.Title>
                    <Card.Img src={state.currentProduct.image} variant="top" style={{ width: "45%" }} className="ml-5 pl-5 pt-5" />
                    <Card.Text>Description: {state.currentProduct.description}</Card.Text>
                    <Button variant="success" onClick={trackProduct}>Track Product</Button>

                </Card>
                {/* 
        {state.loading ? (<Spinner animation="border" className="loading"/>) : (
            <Card>
            <Card.Title>Amazon:</Card.Title>
            <Card.Text>{state.amazonProduct.name}</Card.Text>
            <Card.Text>Price: {state.amazonProduct.price} </Card.Text>
            <Card.Text><a href={state.amazonProduct.link}>Go to site</a></Card.Text>
        </Card>
        )}
         */}

                <Card>
                    <Card.Title>Best Buy:</Card.Title>
                    <Card.Text>{state.bestbuyProduct.name}</Card.Text>
                    <Card.Text>Price: {state.bestbuyProduct.price} </Card.Text>
                    <Card.Text><a href={state.bestbuyProduct.link}>Go to site</a></Card.Text>
                </Card>

            </Container>
        </div>
    );
};

export default Product;