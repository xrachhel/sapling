import React, { useEffect,useRef } from "react";
import { Button, Container, FormControl, Row, Col, Image,Navbar,Nav, CardDeck, CardColumns } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import "../components/ourNavbar/assets/css/style.css"
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import { useStoreContext } from "../utils/GlobalState";
import { SET_CURRENT_PRODUCT, SET_AMAZON_PRODUCT, SET_BESTBUY_PRODUCT, LOADING, TRACK_PRODUCT,SET_SEARCH_TERM } from "../utils/actions";
import API from "../utils/API";
import { Link } from "react-router-dom";
import "./assets/product.css"

const Product = props => {

    const [state, dispatch] = useStoreContext();
    const SearchValue = useRef(null)

    console.log("Best buy state price", state)

    useEffect(() => {
        getProduct()
        getAmazon();
        getBestBuy();
    }, []);
    const handleSearch = (event) =>{
        event.preventDefault()
        console.log(SearchValue.current.value)
        dispatch({type:SET_SEARCH_TERM,searchTerm:SearchValue.current.value})
    }

    const getProduct = () => {
        API.getProductInfoWalmart(props.match.params.itemId)
            .then(res => {
                dispatch({ type: LOADING })
                dispatch({ type: SET_CURRENT_PRODUCT, product: { name: res.data.name, image: res.data.largeImage, description: res.data.shortDescription, price: res.data.salePrice, upc: res.data.upc, itemId: res.data.itemId, link: res.data.productUrl } })
            })
            .catch(err => console.log(err))
    };

    const getAmazon = () => {
        API.getProductInfoAmazon(props.match.params.upc)
        .then(res => {
            if(res.data.product){
                dispatch({type: LOADING})
                dispatch({type: SET_AMAZON_PRODUCT, product:{name:res.data.product.title, link:res.data.product.link, price:res.data.product.buybox_winner.price.raw}})
            }
            console.log("amazon", res.data.product.buybox_winner.price.value)
            
        })
        .catch(err => console.log(err))
    };

    const getBestBuy = () => {
        API.getProductInfoBestbuy(props.match.params.upc)
            .then(res => {
                console.log(res.data.products)
                if (res.data.products.name){
                    dispatch({ type: LOADING })
                    dispatch({ type: SET_BESTBUY_PRODUCT, 
                        product: { 
                            name: res.data.products.name, 
                            link: res.data.products.url, 
                            price: res.data.products.salePrice 
                        }})
                }
              
            })
            
            .catch(err => console.log(err))
    };

    const trackProduct = (event) => {
        event.preventDefault();
        console.log(state.currentProduct.upc)
        const productObj = {
            name: state.currentProduct.name,
            upc: state.currentProduct.upc,
            itemId: state.currentProduct.itemId,
            price: state.currentProduct.price,
            image: state.currentProduct.image,
            amazonPrice: state.amazonProduct.price,
            bestbuyPrice: state.bestbuyProduct.price
        }
        API.trackProduct("5e501cfb343503e52a09651f", productObj)
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: TRACK_PRODUCT,
                    product: state.currentProduct
                });
            })
            .catch(err => console.log(err))

    };


    return (
      <div id="background">
      {!state.logIn ?(
      <Navbar id="guest-navbar" expand="lg">
        <Navbar.Brand id="app-nav-name" href="/home"><i id="sapling-nav-logo" className="fas fa-seedling"></i><span id="S">S</span>apling</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light"/>
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="mr-auto">
              <Button href="/home" id="nav-home-link">
                <i id="nav-home-icon" className="fas fa-home"></i>
                <p>Home</p>
              </Button>

              <Button href="#dashboard" id="nav-home-link" href="/dashboard">
                <i id="nav-home-icon" className="fas fa-chart-line"></i>
                <p>Dashboard</p>
              </Button>
            </Nav>


            <Form inline style={{width:500}}>

              <FormControl id="search-bar" type="text" placeholder="Search" ref={SearchValue} className="mr-sm-0"/>
              <Button variant="outline-success" onClick={() => handleSearch()}><Link  to="/results">Search</Link></Button>

            </Form>

              <button href="#news" id="nav-news-link">
                <i id="nav-news-icon" className="fas fa-bell"></i>
                <p> </p>
              </button>


          <Nav>
            {/* <Login/> */}
          </Nav>

            <Nav>
              <button href="#logout" id="login-modal-button">
                <i id="login-button-icon" className="fas fa-sign-out-alt"></i>
                <p>Sign-Out</p>
              </button>
            </Nav>

          </Navbar.Collapse>
  </Navbar>
      ):(<h1>True</h1>)}
            <Container>
                <Row className="justify-content-center">
                    <Col>
                        <Image id="main-image" src={state.currentProduct.image} />
                    </Col>
                    <Col className="text-center" id="item-description">
                        <h4 className="font-weight-bold"> {state.currentProduct.name} </h4>
                        <div className="m-4">
                            <p>Description:  {state.currentProduct.description}</p>
                        </div>
                        <Button variant="success" onClick={trackProduct}>Track Product</Button>

                    </Col>
                </Row>

                <CardDeck className="justify-content-around">
                <CardColumns>
                    <Card id="walMart-card" className="text-center">
                        <Card.Title>
                    <Card.Img id="walMart-image" src={require("./assets/images/logos/walmart-logo.png")}/>
                        </Card.Title>
                        <Row>
                        <Col>
                        <Card.Text id="price">Price: ${state.currentProduct.price} </Card.Text>
                        </Col>  
                        <Col>
                        <Card.Text><a href={state.currentProduct.link} target="_blank">Go to site</a></Card.Text>
                        </Col>
                        </Row>
                    </Card>

                {state.amazonProduct.name !== "" ? (
                        <Card id="amazon-card"className="text-center">
                        <Card.Title>
                            <Card.Img id="amazon-image"src={require("./assets/images/logos/amazon-logo.png")}/>
                            </Card.Title>
                        <Row>
                        <Col className="ml-4">
                        <Card.Text id="price">Price: {state.amazonProduct.price} </Card.Text>
                        </Col>
                        <Col>
                        <Card.Text><a href={state.amazonProduct.link} target="_blank">Go to site</a></Card.Text>
                        </Col>
                        </Row>
                    </Card>     
                    ) : ( <div></div>
                    
                )}

                {state.bestbuyProduct.name !== "" ? (
                
                    <Card className="justify-content-center">
                    <Card.Title>
                        <Card.Img id="bestbuy-image"src={require("./assets/images/logos/amazon-logo.png")}/>
                    </Card.Title>
                    <Row>
                    <Col>
                    <Card.Text className="ml-4"id="price">Price: ${state.bestbuyProduct.price} </Card.Text>
                    </Col>
                    <Col>      
                    <Card.Text><a href={state.bestbuyProduct.link} target="_blank">Go to site</a></Card.Text>
                    </Col>
                    </Row>
                </Card>   
                ) : (
                    <div></div>
                )}
              </CardColumns>  
            </CardDeck>
            </Container>
        </div>
    );
};

export default Product;