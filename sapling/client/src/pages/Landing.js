import React,{ useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/ourNavbar/index";
import "./assets/landing.css";
import {Carousel,Card,CardDeck,} from "react-bootstrap";
import { Link } from "react-router-dom"
import {useStoreContext} from "../utils/GlobalState"
import {TOP_WALMART_ITEMS,TOP_AMAZON_ITEMS,TOP_BESTBUY_ITEMS} from "../utils/actions"
import API from "../utils/API"

function LandingPage() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [state, dispatch] = useStoreContext();
  const list = []; 
  const amazonList = [];
  const bestBuyList = [];
  const upcList=[];

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
          amazonList.push(res.data.product.main_image)
          //console.log(res.data)
          dispatch({type:TOP_AMAZON_ITEMS,TopAmazonList:amazonList})
        })
        .catch(err => console.log(err))
        upcList.push(res.data.items[i].upc)
        dispatch({type:TOP_WALMART_ITEMS,TopWalmartList:list})
        BestBuyPics(upcList,0)
        //console.log(state.TopWalmartList)
        //   for(var b = 0 ; b < upcList.length;b++){
        //     API.getProductInfoBestbuy(upcList[b])
        //     .then(res => {
        //       bestBuyList.push(res.data.products)
        //     })
        //     .catch(err => console.log(err))
        //   }
      }
    })
    .catch(err => console.log(err))
    //console.log(upcList)
    // console.log(bestBuyList)
    // console.log(state.TopBestBuyList)

  }

  function BestBuyPics(arr, index){
    if(index < arr.length){
    API.getProductInfoBestbuy(arr[index])
    .then(res => {
      if(res.data.products){
      bestBuyList.push(res.data.products[0])
      }
    }).then(res =>{
      dispatch({type:TOP_BESTBUY_ITEMS,TopBestBuyList:bestBuyList})
      index++
      console.log(index)
      BestBuyPics(arr,index)
    })
    .catch(err =>(console.log(err)))
    }

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
              {state.TopWalmartList.map(item => (
              <div>
                  <Card key={item.itemId} style={{ width: '13rem', margin: '20px' }}>
                    <Card.Img variant="top" src={item.mediumImage} />
                    <Link  className="text-center bg-warning"to={"/product/" + item.itemId + "/" + item.upc}>Track Product</Link>
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
                    <Link to={"/product/" + item.itemId + "/" + item.upc}>Track Product</Link>
                  </Card>
                </div>
               )
              )}
            </CardDeck>
        </Carousel.Item>
        {/* <Carousel.Item>
            <CardDeck>
              {state.TopBestBuyList.map(item => (
              <div>
                  <Card style={{ width: '13rem', margin: '20px' }}>
                    <Card.Img variant="top" src={item.mediumImage} alt="item" />
                  </Card>
                
               </div>
              ))}
            </CardDeck>
        </Carousel.Item> */}
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