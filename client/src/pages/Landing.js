import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/landing.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";
import {
  ITEMS_ONE,
  ITEMS_TWO,
  ITEMS_THREE,
  LOG_IN,
  SET_SEARCH_TERM
} from "../utils/actions";
import API from "../utils/API";
//Set up search bar that will connect to results page

let userId = localStorage.getItem("userID");

function LandingPage() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [state, dispatch] = useStoreContext();
  const listOne = [];
  const listTwo = [];
  const listThree = [];

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };
  useEffect(() => {
    topItemLoad();
  }, []);

  const topItemLoad = () => {
    API.getWalmartTopProduct()
      .then(res => {
        for (var a = 0; a < res.data.items.length - 11; a++) {
          listOne.push(res.data.items[a]);
          dispatch({ type: ITEMS_ONE, CarasuleItemOne: listOne });
        }
        console.log(listOne);
        for (var b = 4; b < res.data.items.length - 7; b++) {
          listTwo.push(res.data.items[b]);
          dispatch({ type: ITEMS_TWO, CarasuleItemTwo: listTwo });
        }
        console.log(listTwo);
        for (var c = 8; c < res.data.items.length - 3; c++) {
          listThree.push(res.data.items[c]);
          dispatch({ type: ITEMS_THREE, CarasuleItemThree: listThree });
        }
        console.log(listThree);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <div>
        {/* This is the about us Carasuel */}
        <Carousel id="carousel">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={require("./assets/images/carousel-images/amazon-skyline.png")}
              alt="First slide"
              id="image-1"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={require("./assets/images/carousel-images/best-buy-logo.jpg")}
              alt="Third slide"
              id="image-3"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={require("./assets/images/carousel-images/walmart-logo.jpg")}
              alt="Sixth slide"
              id="image-6"
            />
          </Carousel.Item>
        </Carousel>
      </div>

      <div>
        {/* <h1 className="mx-auto">Best Sellers:</h1> */}
        <Carousel
          id="carousel"
          activeIndex={index}
          direction={direction}
          onSelect={handleSelect}
        >
          <Carousel.Item>
            <CardDeck id="walmart-deck">
              {state.CarasuleItemOne.map(item => (
                <div className="mx-auto" id="walmart-card">
                  <Col className="text-center">
                    <Card.Title id="top-seller-text">Best Seller</Card.Title>
                    <Card key={item.itemId}>
                      <Card.Img
                        variant="top"
                        src={item.mediumImage}
                        className="walmart-card-image"
                      />
                      {/* <Link  className="text-center bg-warning"to={"/product/" + item.itemId + "/" + item.upc}>Go to Product</Link> */}
                      <Button id="view-button" className="mx-auto">
                        <Link
                          className="text-center"
                          id="view-text"
                          to={"/product/" + item.itemId + "/" + item.upc}
                        >
                          <i id="view-icon-leaf" className="fas fa-leaf"></i>{" "}
                          View Item
                        </Link>
                      </Button>
                    </Card>
                  </Col>
                </div>
              ))}
            </CardDeck>
          </Carousel.Item>

          <Carousel.Item>
            <CardDeck id="walmart-deck">
              {state.CarasuleItemTwo.map(item => (
                <div className="mx-auto" id="walmart-card">
                  <Col className="text-center">
                    <Card.Title id="top-seller-text">Best Seller</Card.Title>
                    <Card key={item.itemId}>
                      <Card.Img
                        variant="top"
                        src={item.mediumImage}
                        className="walmart-card-image"
                      />
                      {/* <Link  className="text-center bg-warning"to={"/product/" + item.itemId + "/" + item.upc}>Go to Product</Link> */}
                      <Button id="view-button" className="mx-auto">
                        <Link
                          className="text-center"
                          id="view-text"
                          to={"/product/" + item.itemId + "/" + item.upc}
                        >
                          <i id="view-icon-leaf" className="fas fa-leaf"></i>{" "}
                          View Item
                        </Link>
                      </Button>
                    </Card>
                  </Col>
                </div>
              ))}
            </CardDeck>
          </Carousel.Item>

          <Carousel.Item>
            <CardDeck id="walmart-deck">
              {state.CarasuleItemThree.map(item => (
                <div className="mx-auto" id="walmart-card">
                  <Col className="text-center">
                    <Card.Title id="top-seller-text">Best Seller</Card.Title>
                    <Card key={item.itemId}>
                      <Card.Img
                        variant="top"
                        src={item.mediumImage}
                        className="walmart-card-image"
                      />
                      {/* <Link  className="text-center bg-warning"to={"/product/" + item.itemId + "/" + item.upc}>Go to Product</Link> */}
                      <Button id="view-button" className="mx-auto">
                        <Link
                          className="text-center"
                          id="view-text"
                          to={"/product/" + item.itemId + "/" + item.upc}
                        >
                          <i id="view-icon-leaf" className="fas fa-leaf"></i>{" "}
                          View Item
                        </Link>
                      </Button>
                    </Card>
                  </Col>
                </div>
              ))}
            </CardDeck>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
}

export default LandingPage;
