import React,{ useEffect, useState,useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Navbar from "../components/ourNavbar/index";
import "./assets/landing.css";
import "../components/ourNavbar/assets/css/style.css"
//import Login from "../components/logInModal/index";
import {Carousel,Card,CardDeck,Button, Col,FormControl,Form,Navbar,Nav} from "react-bootstrap";
import { Link } from "react-router-dom"
import {useStoreContext} from "../utils/GlobalState"
import {ITEMS_ONE,ITEMS_TWO,ITEMS_THREE,LOG_IN,SET_SEARCH_TERM} from "../utils/actions"
import API from "../utils/API"
//Set up search bar that will connect to results page 

function LandingPage() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [state, dispatch] = useStoreContext();
  const listOne = []; 
  const listTwo = []; 
  const listThree = []; 
  const SearchValue = useRef(null)
  const  handleSearch = (event) =>{
        event.preventDefault()
        console.log(SearchValue.current.value)
        dispatch({type:SET_SEARCH_TERM,searchTerm:SearchValue.current.value})
  }
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  
  };
 useEffect(()=>{
   topItemLoad()
 },[SearchValue])

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
      {!state.logIn ?(
      <Navbar id="guest-navbar" expand="lg">
        <Navbar.Brand id="app-nav-name" href="/home"><i id="sapling-nav-logo" className="fas fa-seedling"></i><span id="S">S</span>apling</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light"/>
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="mr-auto">
              <Button href="/home" id="nav-home-link">
                <i id="nav-home-icon" className="fas fa-home"></i>
                <p>Home</p>
              </Button>

              <Button href="#dashboard" id="nav-home-link" href="/dashboard">
                <i id="nav-home-icon" className="fas fa-chart-line"></i>
                <p>Dashboard</p>
              </Button>
            </Nav>


            <Form inline style={{width:500}}>
              <FormControl id="search-bar" type="text" placeholder="Search" ref={SearchValue} className="mr-sm-0"/>
              <Button variant="outline-success" id="search-button" onClick ={handleSearch}><Link to="/results">Search</Link></Button>
            </Form>

              <button href="#news" id="nav-news-link">
                <i id="nav-news-icon" className="fas fa-bell"></i>
                <p> </p>
              </button>


          <Nav>
            {/* <Login/> */}
          </Nav>

            <Nav>
              <button href="#logout" id="login-modal-button">
                <i id="login-button-icon" className="fas fa-sign-out-alt"></i>
                <p>Sign-Out</p>
              </button>
            </Nav>

          </Navbar.Collapse>
  </Navbar>
      ):(<h1>True</h1>)}
      <div>
        {/* Thsis is the about us Carasuel */}
      <Carousel id="carousel">
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={require('./assets/images/carousel-images/amazon-skyline.png')} 
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
            src={require('./assets/images/carousel-images/target-symbol.gif')}
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
            src={require('./assets/images/carousel-images/macys-logo.jpg')}
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
            src={require('./assets/images/carousel-images/walmart-logo.jpg')}
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






      <div>
      <Carousel id="carousel" activeIndex={index} direction={direction} onSelect={handleSelect}>

      <Carousel.Item>
            <CardDeck id="walmart-deck">
              {state.CarasuleItemOne.map(item => (
              <div className="mx-auto" id="walmart-card">
                  <Col className="text-center">
                    <Card key={item.itemId}>
                      <Card.Img variant="top" src={item.mediumImage} className="walmart-card-image" />
                        {/* <Link  className="text-center bg-warning"to={"/product/" + item.itemId + "/" + item.upc}>Go to Product</Link> */}
                        <Button id="view-button" className="mx-auto"> 
                          <Link  className="text-center" id="view-text"to={"/product/" + item.itemId + "/" + item.upc}> 
                            <i id="view-icon-leaf" className="fas fa-leaf"></i> View Item
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
                    <Card key={item.itemId}>
                      <Card.Img variant="top" src={item.mediumImage} className="walmart-card-image" />
                        {/* <Link  className="text-center bg-warning"to={"/product/" + item.itemId + "/" + item.upc}>Go to Product</Link> */}
                        <Button id="view-button" className="mx-auto"> 
                          <Link className="text-center" id="view-text"to={"/product/" + item.itemId + "/" + item.upc}> 
                            <i id="view-icon-leaf" className="fas fa-leaf"></i> View Item
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
                    <Card key={item.itemId}>
                      <Card.Img variant="top" src={item.mediumImage} className="walmart-card-image" />
                        {/* <Link  className="text-center bg-warning"to={"/product/" + item.itemId + "/" + item.upc}>Go to Product</Link> */}
                        <Button id="view-button" className="mx-auto"> 
                          <Link  className="text-center" id="view-text"to={"/product/" + item.itemId + "/" + item.upc}> 
                            <i id="view-icon-leaf" className="fas fa-leaf"></i> View Item
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

    </div>
  )
}





export default LandingPage;