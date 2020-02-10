import React from "react";
import "./style.css";

import {Carousel} from 'react-bootstrap'
// this carousel appears on the product page (suggestions)
// gives related products to user
// user will be able to button through options and auto-scroll
// Cards will go here (Racheal is making cards)


function CarouselLanding(props) {

    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
      setDirection(e.direction);
    };

    return (
    <Carousel id="carousel" activeIndex={index} direction={direction} onSelect={handleSelect}>>
        <Carousel.Item>
            <img
            className="card" // (?)
            src={props.image}
            alt={props.name}
            />

            <Carousel.Caption>
            <h3>{props.name}</h3>
            <p>{props.description}</p>
            </Carousel.Caption>
        </Carousel.Item>


        {/* example */}
        {/* <Carousel.Item>
            <img
            className="d-block w-100"
            src={require('../images/walmart-logo.jpg')}
            alt="Sixth slide"
            id="image-3"
            />

            <Carousel.Caption>
            <h3>Sixth slide</h3>
            <p>Sixth slide description goes here.</p>
            </Carousel.Caption>
        </Carousel.Item> */}

    </Carousel>
    )
}

export default CarouselLanding;