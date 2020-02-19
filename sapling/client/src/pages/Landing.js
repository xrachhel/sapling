import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/ourNavbar/index";
import Jumbotron from "../components/Footer/Index";
import CarouselThree from "../components/CarouselLanding/index";
import "./assets/landing.css";
import {Carousel,Card,CardDeck} from "react-bootstrap";

function LandingPage() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };
  return (
    <div>
      <Navbar/>
      
      <div>
        {/* Thsis is the about us Carasuel */}
      <Carousel id="carousel">
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={require('./assets/images/amazon-skyline.png')} height
            alt="First slide"
            id="image-1"
            />

            <Carousel.Caption>
            <h3>First slide</h3>
            <p>First slide description goes here.</p>
            </Carousel.Caption>
        </Carousel.Item>


        <Carousel.Item>
            <img
            className="d-block w-100"
            src={require('./assets/images/target-symbol.gif')}
            alt="Third slide"
            id="image-3"
            />

            <Carousel.Caption>
            <h3>Third slide</h3>
            <p>Third slide description goes here.</p>
            </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
            <img
            className="d-block w-100"
            src={require('./assets/images/macys-logo.jpg')}
            alt="Fifth slide"
            id="image-5"
            />

            <Carousel.Caption>
            <h3>Fifth slide</h3>
            <p>Fifth slide description goes here.</p>
            </Carousel.Caption>
        </Carousel.Item>


        <Carousel.Item>
            <img
            className="d-block w-100"
            src={require('./assets/images/walmart-logo.jpg')}
            alt="Sixth slide"
            id="image-6"
            />

            <Carousel.Caption>
            <h3>Sixth slide</h3>
            <p>Sixth slide description goes here.</p>
            </Carousel.Caption>
        </Carousel.Item>

    </Carousel>
      </div>
      {/* This is the items cards  */}
      <div>
      <Carousel id="carousel" activeIndex={index} direction={direction} onSelect={handleSelect}>
        <Carousel.Item>
            <CardDeck>
                  <Card style={{ width: '18rem', margin: '20px' }}>
                    <Card.Img variant="top" src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MV7N2?wid=1144&hei=1144&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1551489688005" />
                  </Card>
                  <Card style={{ width: '18rem', margin: '20px' }}>
                    <Card.Img variant="top" src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MV7N2?wid=1144&hei=1144&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1551489688005" />
                  </Card>
                  <Card style={{ width: '18rem', margin: '20px' }}>
                    <Card.Img variant="top" src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MV7N2?wid=1144&hei=1144&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1551489688005" />
                  </Card>
                  <Card style={{ width: '18rem', margin: '20px' }}>
                    <Card.Img variant="top" src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MV7N2?wid=1144&hei=1144&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1551489688005" />
                  </Card>
            </CardDeck>
        </Carousel.Item>
{/* 
        <Carousel.Item>
            <CardDeck>
                <CardLanding></CardLanding>
                <CardLanding></CardLanding>
                <CardLanding></CardLanding>
                <CardLanding></CardLanding>
            </CardDeck>
        </Carousel.Item> */}
    </Carousel>
      </div>

    </div>
  );
}





export default LandingPage;