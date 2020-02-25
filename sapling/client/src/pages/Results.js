import React, { useEffect,useRef } from "react";
import { Form, FormControl, Button, Container, Col, CardColumns } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import { useStoreContext } from "../utils/GlobalState"
import { UPDATE_RESULT_LIST,SET_SEARCH_TERM } from "../utils/actions";
import API from "../utils/API"; 
import { Link } from "react-router-dom"
import "./assets/result.css"




const Results = () => {
    const [state, dispatch] = useStoreContext();


    useEffect(() => {
        getResults(state.searchTerm);
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
        <div id="background">
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
                                                <Link to={"/product/" + product.itemId + "/" + product.upc}>View Product</Link>
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