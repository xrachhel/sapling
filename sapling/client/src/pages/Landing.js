import React,{ useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/ourNavbar/index";
import "./assets/landing.css";
import {Carousel,Card,CardDeck,} from "react-bootstrap";
import { Link } from "react-router-dom"
import {useStoreContext} from "../utils/GlobalState"
import {ITEMS_ONE,ITEMS_TWO,ITEMS_THREE} from "../utils/actions"
import API from "../utils/API"

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
 useEffect(()=>{
   topItemLoad()
 },[])

  const topItemLoad = () =>{
    API.getWalmartTopProduct()
    .then(res => {
      for(var a = 0; a < res.data.items.length - 11;a++){
        listOne.push(res.data.items[a])
        dispatch({type:ITEMS_ONE,CarasuleItemOne:listOne})
      }
      console.log(listOne)
      for(var b = 4; b < res.data.items.length - 7;b++){
        listTwo.push(res.data.items[b])
        dispatch({type:ITEMS_TWO,CarasuleItemTwo:listTwo})
      }
      console.log(listTwo)
      for(var c =8; c < res.data.items.length - 3;c++){
        listThree.push(res.data.items[c])
        dispatch({type:ITEMS_THREE,CarasuleItemThree:listThree})
      }
      console.log(listThree)
    })
    .catch(err => console.log(err))
  }

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
              {state.CarasuleItemOne.map(item => (
              <div>
                  <Card key={item.itemId} style={{ width: '13rem', margin: '20px' }}>
                    <Card.Img variant="top" src={item.mediumImage} />
                    <Link  className="text-center bg-warning"to={"/product/" + item.itemId + "/" + item.upc}>Go to Product</Link>
                  </Card>
                </div>
               )
              )}
            </CardDeck>
        </Carousel.Item>
        <Carousel.Item>
            <CardDeck>
              {state.CarasuleItemTwo.map(item => (
              <div>
                  <Card key={item.itemId} style={{ width: '13rem', margin: '20px' }}>
                    <Card.Img variant="top" src={item.mediumImage} />
                    <Link  className="text-center bg-warning"to={"/product/" + item.itemId + "/" + item.upc}>Go to Product</Link>
                  </Card>
                </div>
               )
              )}
            </CardDeck>
        </Carousel.Item>
        <Carousel.Item>
            <CardDeck>
              {state.CarasuleItemThree.map(item => (
              <div>
                  <Card key={item.itemId} style={{ width: '13rem', margin: '20px' }}>
                    <Card.Img variant="top" src={item.mediumImage} />
                    <Link  className="text-center bg-warning"to={"/product/" + item.itemId + "/" + item.upc}>Go to Product</Link>
                  </Card>
                </div>
               )
              )}
            </CardDeck>
        </Carousel.Item>

    </Carousel>
      </div>

    </div>
  )
}





export default LandingPage;