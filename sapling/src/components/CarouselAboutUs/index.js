import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import "./style.css";

import 'bootstrap/dist/css/bootstrap.min.css';

// import { Carousel } from 'react-bootstrap';

// This carousel will auto-change over time through images

function CarouselAboutUs() {
    return (
    <Carousel>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="../images/amazon-dog-3.gif"
            alt="First slide"
            />

            <Carousel.Caption>
            <h3>First slide</h3>
            <p>First slide description goes here.</p>
            </Carousel.Caption>
        </Carousel.Item>


        <Carousel.Item>
            <img
            className="d-block w-100"
            src="../images/target-symbol.gif"
            alt="Third slide"
            />

            <Carousel.Caption>
            <h3>Second slide</h3>
            <p>Second slide description goes here.</p>
            </Carousel.Caption>
        </Carousel.Item>


        <Carousel.Item>
            <img
            className="d-block w-100"
            src="../images/macys-logo.gif"
            alt="Third slide"
            />

            <Carousel.Caption>
            <h3>Third slide</h3>
            <p>Third slide description goes here.</p>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
    )
}


export default CarouselAboutUs;