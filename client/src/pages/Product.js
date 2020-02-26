import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import CardDeck from "react-bootstrap/CardDeck";
import { useStoreContext } from "../utils/GlobalState";
import {
  SET_CURRENT_PRODUCT,
  SET_AMAZON_PRODUCT,
  SET_BESTBUY_PRODUCT,
  LOADING,
  TRACK_PRODUCT,
  REMOVE_PRODUCT
} from "../utils/actions";
import API from "../utils/API";
import "./assets/product.css";

let userId = localStorage.getItem("userID");

const Product = props => {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    getProduct();
    getAmazon();
    getBestBuy();
  }, []);
  const getProduct = () => {
    API.getProductInfoWalmart(props.match.params.itemId)
      .then(res => {
        dispatch({ type: LOADING });
        dispatch({
          type: SET_CURRENT_PRODUCT,
          product: {
            name: res.data.name,
            image: res.data.largeImage,
            description: res.data.shortDescription,
            price: res.data.salePrice,
            upc: parseInt(res.data.upc),
            itemId: res.data.itemId,
            link: res.data.productUrl
          }
        });
      })
      .catch(err => console.log(err));
  };

  const getAmazon = () => {
    API.getProductInfoAmazon(props.match.params.upc)
      .then(res => {
        console.log("WHERE IS PRICE",res.data.product);
        if (res.data.product) {
          if(res.data.product.buybox_winner){
            dispatch({ type: LOADING });
            dispatch({
              type: SET_AMAZON_PRODUCT,
              product: {
                name: res.data.product.title,
                link: res.data.product.link,
                price: res.data.product.buybox_winner.price.value
              }
            });
          }else{
            dispatch({type: LOADING});
            dispatch({
              type: SET_AMAZON_PRODUCT,
              product: {
                name: "",
                link: "",
                price: 0
              }
            });
          }
        } else{
          dispatch({type: LOADING});
          dispatch({
            type: SET_AMAZON_PRODUCT,
            product: {
              name: "",
              link: "",
              price: null
            }
          });
        }
      })
      .catch(err => console.log(err));
  };

  const getBestBuy = () => {
    API.getProductInfoBestbuy(props.match.params.upc)
      .then(res => {
        if (res.data.products.name) {
          dispatch({ type: LOADING });
          dispatch({
            type: SET_BESTBUY_PRODUCT,
            product: {
              name: res.data.products.name,
              link: res.data.products.url,
              price: res.data.products.salePrice
            }
          });
        } else{
          dispatch({type: LOADING});
          dispatch({
            type: SET_BESTBUY_PRODUCT,
            product:{
              name: "",
              link: "",
              price: null
            }
          });
        }
      })
      .catch(err => console.log(err));
  };

  const trackProduct = event => {
    event.preventDefault();
    console.log("CHECK MY UPC",state.currentProduct.upc);
    const productObj = {
      name: state.currentProduct.name,
      upc: state.currentProduct.upc,
      itemId: state.currentProduct.itemId,
      price: state.currentProduct.price,
      image: state.currentProduct.image,
      amazonPrice: state.amazonProduct.price,
      bestbuyPrice: state.bestbuyProduct.price,
      recentPrices: [state.currentProduct.price],
      recentAmazonPrices: [state.amazonProduct.price],
      recentBestbuyPrices: [state.bestbuyProduct.price]
    };
    console.log(productObj);
    API.trackProduct(userId, productObj)
      .then(res => {
        console.log(res.data);
        dispatch({
          type: TRACK_PRODUCT,
          product: state.currentProduct
        });
      })
      .catch(err => console.log(err));
  };

  const stopTracking = () => {
    API.getProductId(state.currentProduct.itemId).then(res => {
      API.deleteProduct(userId, res.data._id).then(res => {
        dispatch({
          type: REMOVE_PRODUCT,
          itemId: state.currentProduct.itemId
        });
      });
    });
  };

  const checkTrackedList = () => {
    for (var i = 0; i < state.trackedList.length; i++) {
      if (state.currentProduct.itemId === state.trackedList[i].itemId) {
        return true;
      }
    }
    return false;
  };

  return (
    <div id="background">
                  
      <Container>
                        
        <Row className="justify-content-center">
                              
          <Col>
                                    
            <Image id="main-image" src={state.currentProduct.image} />
                                
          </Col>
                              
          <Col className="text-center" id="item-description">
                                    
            <h4 className="font-weight-bold"> {state.currentProduct.name} </h4>
                                    
            <div className="m-4">
                                          
              <p>Description:  {state.currentProduct.description}</p>
                                      
            </div>
                                    
            {!userId || userId === "" ? (
              <div></div>
            ) : (
              <div>
                {checkTrackedList() ? (
                  <Button variant="danger" onClick={stopTracking}>
                    Stop Tracking
                  </Button>
                ) : (
                  <Button variant="success" onClick={trackProduct}>
                    Track Product
                  </Button>
                )}
              </div>
            )}
                                
          </Col>
                          
        </Row>
        <CardDeck className="justify-content-around">
          <CardColumns>
                                
            <Card id="walMart-card" className="text-center">
                                      
              <Card.Title>
                <Card.Img
                  id="walMart-image"
                  src={require("./assets/images/logos/walmart-logo.png")}
                />
              </Card.Title>
              <Row>
                <Col>
                                          
                  <Card.Text id="price">
                    Price: ${state.currentProduct.price} 
                  </Card.Text>
                </Col>
                <Col>
                                          
                  <Card.Text>
                    <a href={state.currentProduct.link} target="_blank">
                      Go to site
                    </a>
                  </Card.Text>
                </Col>
              </Row>
                                  
            </Card>
                            
            {state.amazonProduct.name !== "" ? (
              <Card id="amazon-card" className="text-center">
                                        
                <Card.Title>
                  <Card.Img
                    id="amazon-image"
                    src={require("./assets/images/logos/amazon-logo.png")}
                  />
                </Card.Title>
                <Row>
                  <Col className="ml-4">
                                            
                    <Card.Text id="price">
                      Price: ${state.amazonProduct.price} 
                    </Card.Text>
                  </Col>
                  <Col>
                                            
                    <Card.Text>
                      <a href={state.amazonProduct.link} target="_blank">
                        Go to site
                      </a>
                    </Card.Text>
                  </Col>
                </Row>
                                    
              </Card>
            ) : (
              <div></div>
            )}
                            
            {state.bestbuyProduct.name !== "" ? (
              <Card className="justify-content-center">
                                    
                <Card.Title>
                  <Card.Img
                    id="bestbuy-image"
                    src={require("./assets/images/logos/amazon-logo.png")}
                  />
                </Card.Title>
                <Row>
                  <Col>
                                        
                    <Card.Text className="ml-4" id="price">
                      Price: ${state.bestbuyProduct.price} 
                    </Card.Text>
                  </Col>
                  <Col>
                                        
                    <Card.Text>
                      <a href={state.bestbuyProduct.link} target="_blank">
                        Go to site
                      </a>
                    </Card.Text>
                  </Col>
                </Row>
                                
              </Card>
            ) : (
              <div></div>
            )}
                          
          </CardColumns>
            
        </CardDeck>
                    
      </Container>
              
    </div>
  );
};

export default Product;
