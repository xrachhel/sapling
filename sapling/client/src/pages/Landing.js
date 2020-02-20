import React,{useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Navbar from "../components/ourNavbar/index";
import Navbar from "../components/ourNavbar/index";
import "./assets/landing.css";
import {Carousel,Card,CardDeck} from "react-bootstrap";
import {useStoreContext} from "../utils/GlobalState"
import {TOP_WALMART_ITEMS,TOP_AMAZON_ITEMS} from "../utils/actions"
import API from "../utils/API"

function LandingPage() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [state, dispatch] = useStoreContext();
  const list = [] 
  const upcList = []

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
      for(var i = 0; i < 4;i++){
        list.push(res.data.items[i])
        API.getProductInfoAmazon(res.data.items[i].upc)
        .then(res => {
          //console.log(res.data.product.main_image.link)
          upcList.push(res.data.product.main_image)
          console.log(upcList)
          dispatch({type:TOP_AMAZON_ITEMS,TopAmazonList:upcList})
        })
        .catch(err => console.log(err))
      }
      dispatch({type:TOP_WALMART_ITEMS,TopWalmartList:list})
      console.log(list)
    })
    .catch(err => console.log(err))
  }
  return (
    <div>
      {/* <Navbar/> */}
      
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
              {state.TopWalmartList.map(item => (
              <div>
                  <Card key={item.itemId} style={{ width: '13rem', margin: '20px' }}>
                    <Card.Img variant="top" src={item.mediumImage} />
                  </Card>
                </div>
               )
              )}
            </CardDeck>
        </Carousel.Item>
        <Carousel.Item>
            <CardDeck>
              {state.TopAmazonList.map(item => (
              <div>
                  <Card style={{ width: '13rem', margin: '20px' }}>
                    <Card.Img variant="top" src={item.link} />
                  </Card>
                </div>
               )
              )}
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
         {/* {state.TopWalmartList.map(item => (
              <div>
                  <Card style={{ width: '18rem', margin: '20px' }}>
                    <Card.Img variant="top" src={item.mediumImage} />
                  </Card>
                </div>
               )
              )} */}
    </Carousel>
      </div>

    </div>
  )
}





export default LandingPage;