import React from "react";
import "./style.css";

import {Carousel} from 'react-bootstrap'
// This carousel will auto-change over time through images
// images can be changed at any time (commented out images are forest themed)


function CarouselAboutUs() {
    return (
    <Carousel id="carousel">
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={require('./images/amazon-skyline.png')} height
            alt="First slide"
            id="image-1"
            />

            <Carousel.Caption>
            <h3>First slide</h3>
            <p>First slide description goes here.</p>
            </Carousel.Caption>
        </Carousel.Item>


        {/* <Carousel.Item>
            <img
            className="d-block w-100"
            src={require('./images/forest-3.jpg')}
            alt="Second slide"
            id="image-2"
            />

            <Carousel.Caption>
            <h3>Second slide</h3>
            <p>Second slide description goes here.</p>
            </Carousel.Caption>
        </Carousel.Item> */}


        <Carousel.Item>
            <img
            className="d-block w-100"
            src={require('./images/target-symbol.gif')}
            alt="Third slide"
            id="image-3"
            />

            <Carousel.Caption>
            <h3>Third slide</h3>
            <p>Third slide description goes here.</p>
            </Carousel.Caption>
        </Carousel.Item>


        {/* <Carousel.Item>
            <img
            className="d-block w-100"
            src={require('./images/forest-2.jpg')}
            alt="Fourth slide"
            id="image-4"
            />

            <Carousel.Caption>
            <h3>Fourth slide</h3>
            <p>Fourth slide description goes here.</p>
            </Carousel.Caption>
        </Carousel.Item> */}


        <Carousel.Item>
            <img
            className="d-block w-100"
            src={require('./images/macys-logo.jpg')}
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
            src={require('./images/walmart-logo.jpg')}
            alt="Sixth slide"
            id="image-6"
            />

            <Carousel.Caption>
            <h3>Sixth slide</h3>
            <p>Sixth slide description goes here.</p>
            </Carousel.Caption>
        </Carousel.Item>

    </Carousel>
    )
}


export default CarouselAboutUs;