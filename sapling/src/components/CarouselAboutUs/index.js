import React from "react";
import "./style.css";


import {Carousel} from 'react-bootstrap'

// This carousel will auto-change over time through images

function CarouselAboutUs() {
    return (
    <Carousel>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="../images/amazon-skyline.png"
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
            src="holder.js/800x400?text=Second slide&bg=282c34"
            alt="Second slide"
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