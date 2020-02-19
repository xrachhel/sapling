import React, { useState } from "react";
import CardLanding from "../CardProduct/index";
// import Card from "../Card/index";
import {Carousel, CardDeck} from 'react-bootstrap';



// this carousel appears on the landing page
// gives random products to user...or possibly top products (maybe one per store)
// user will be able to button through options and auto-scroll
// Cards will go here (Racheal is making cards)


function CarouselLanding() {

    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
      setDirection(e.direction);
    };


    return (
    <Carousel id="carousel" activeIndex={index} direction={direction} onSelect={handleSelect}>
        <Carousel.Item>
            <CardDeck>
                <CardLanding></CardLanding>
                <CardLanding></CardLanding>
                <CardLanding></CardLanding>
                <CardLanding></CardLanding>
            </CardDeck>
        </Carousel.Item>

        <Carousel.Item>
            <CardDeck>
                <CardLanding></CardLanding>
                <CardLanding></CardLanding>
                <CardLanding></CardLanding>
                <CardLanding></CardLanding>
            </CardDeck>
        </Carousel.Item>
    </Carousel>
    )
}

export default CarouselLanding;