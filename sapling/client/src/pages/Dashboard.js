import React, { useEffect, useState,useRef } from "react";
import {Button, Container, FormControl, Col, CardColumns, Badge,Navbar,Nav } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom"
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import "../components/ourNavbar/assets/css/style.css"
import { useStoreContext } from "../utils/GlobalState";
import { SET_DASHBOARD_LIST, SET_CURRENT_PRODUCT, LOADING, SET_AMAZON_PRODUCT, SET_BESTBUY_PRODUCT,SET_SEARCH_TERM } from "../utils/actions";
import API from "../utils/API";
import { Line } from "react-chartjs-2"
import { set } from "mongoose";
import "./assets/dashboard.css"

const Dashboard = () => {
    const  handleSearch = (event) =>{
        event.preventDefault()
        console.log(SearchValue.current.value)
        dispatch({type:SET_SEARCH_TERM,searchTerm:SearchValue.current.value})
  }
    const [state, dispatch] = useStoreContext();
    const [show, setShow] = useState(false);
    const SearchValue = useRef(null)

    let walmartArr = [];
    let amazonArr = [];
    let bestbuyArr = [];

    useEffect(() => {
        getTrackedItems();
    }, []);

    console.log("tracked list", state.trackedList)

    const [lineData, setLineData] = useState({

        datasets: [
            {
                label: "Walmart",
                data: []

            },
            {
                label: "Amazon",
                data: [],
            },
            {
                label: "Best Buy",
                data: []
            }
        ],
        fill: false,
        backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)'
        ],
        borderWidth: 3
    });

    const [lineOptions, setLineOptions] = useState({
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "Price ($)"
                        }
                    }
                ],
            },
            title: {
                display: true,
                text: 'Price trends',
                fontSize: 25
            },
            legend: {
                display: true,
                position: 'top'
            }
        }
    });



    const handleClose = () => setShow(false);

    const getModal = value => {
        setShow(value);
        getInfo(value);
    };

    const getTrackedItems = () => {
        API.getOneUser("5e501cfb343503e52a09651f")
            .then(res => {
                console.log(res.data.trackedProducts)
                dispatch({ type: SET_DASHBOARD_LIST, trackedList: res.data.trackedProducts })
            })
            .catch(err => console.log(err))
    };

    const getInfo = (value) => {
        API.getProductInfoWalmart(state.trackedList[value].itemId)
            .then(res => {
                API.updateWalmarPrice(state.trackedList[value]._id, res.data.salePrice)
                    .then(result => {
                        console.log("*****Get WalMart")
                        console.log(result.data.recentPrices)
                        dispatch({ type: LOADING })
                        dispatch({
                            type: SET_CURRENT_PRODUCT, product: {
                                name: res.data.name,
                                image: res.data.thumbnailImage,
                                description: res.data.shortDescription,
                                price: res.data.salePrice,
                                upc: res.data.upc,
                                itemId: res.data.itemId,
                                link: res.data.productUrl,
                                recentPrices: result.data.recentPrices
                            }
                        })
                    }).then(bestbuy => {
                        API.getProductInfoBestbuy(state.trackedList[value].upc)
                            .then(res => {
                                API.updateBestbuyPrice(state.trackedList[value]._id, res.data.products.salePrice)
                                    .then(resultbestbuy => {
                                        console.log("*****Get BestBuy")
                                        console.log(resultbestbuy)
                                        if(res.data.products){
                                            dispatch({ type: LOADING })
                                            dispatch({
                                                type: SET_BESTBUY_PRODUCT, product: {
                                                    name: res.data.products.name,
                                                    link: res.data.products.url,
                                                    price: res.data.products.salePrice
                                                }
                                            })
                                        }
                                        
                                    })
                            })
                    })
                    .then(amazon => {
                        API.getProductInfoAmazon(state.trackedList[value].upc)
                            .then(res => {
                                API.updateAmazonPrice(state.trackedList[value]._id, res.data.product.buybox_winner.price.value)
                                    .then(resultamazon => {
                                        console.log("*****get Amazon")
                                        console.log(resultamazon)
                                        if(res.data.product){
                                            dispatch({ type: LOADING })
                                            dispatch({
                                                type: SET_AMAZON_PRODUCT, product: {
                                                    name: res.data.product.title,
                                                    link: res.data.product.link,
                                                    price: res.data.product.buybox_winner.price.value
                                                }
                                            })
                                        }
                                        
                                        setLineData({
                            ...lineData,
                            datasets: [
                                {
                                    label: "Walmart",
                                    data: resultamazon.data.recentPrices,
                                    borderColor: 'rgba(108,171,231)',
                                    fill: false
                                },
                                {
                                    label: "Best Buy",
                                    data: resultamazon.data.recentBestbuyPrices,
                                    borderColor:'rgba(10,74,191)',
                                    fill: false
                                },
                                {
                                    label: "Amazon",
                                    data: resultamazon.data.recentAmazonPrices,
                                    borderColor:
                                    'rgba(255,153,0)',
                                    fill: false
                                }
                            ]
                        })
                                    })
                            })
                    })
            })
    }



    // const getWalmart = (value) => {
    //     API.getProductInfoWalmart(state.trackedList[value].itemId)
    //         .then(res => {
    //             API.updateWalmarPrice(state.trackedList[value]._id, res.data.salePrice)
    //                 .then(result => {
    //                     console.log("*****Get WalMart")
    //                     console.log(result)
    //                     walmartArr = result.data.recentPrices
    //                     console.log(walmartArr)
    //                     dispatch({ type: LOADING })
    //                     dispatch({
    //                         type: SET_CURRENT_PRODUCT, product: {
    //                             name: res.data.name,
    //                             image: res.data.thumbnailImage,
    //                             description: res.data.shortDescription,
    //                             price: res.data.salePrice,
    //                             upc: res.data.upc,
    //                             itemId: res.data.itemId,
    //                             link: res.data.productUrl,
    //                             recentPrices: result.data.recentPrices
    //                         }
    //                     })
    //                 })
    //         })
    //         .catch(err => console.log(err))
    // };

    // const getAmazon = (value) => {
    //     API.getProductInfoAmazon(state.trackedList[value].upc)
    //         .then(res => {
    //             API.updateAmazonPrice(state.trackedList[value]._id, res.data.product.buybox_winner.price.raw)
    //                 .then(result => {
    //                     console.log("*****result")
    //                     console.log(result)
    //                     amazonArr = result.data.recentAmazonPrices
    //                     dispatch({ type: LOADING })
    //                     dispatch({
    //                         type: SET_AMAZON_PRODUCT, product: { 
    //                             name: res.data.product.title, 
    //                             link: res.data.product.link, 
    //                             price: res.data.product.buybox_winner.price.raw }
    //                     })
    //                 })
    //         })
    //         .catch(err => console.log(err))
    // };

    // const getBestBuy = (value) => {
    //     API.getProductInfoBestbuy(state.trackedList[value].upc)
    //         .then(res => {
    //             API.updateBestbuyPrice(state.trackedList[value]._id, res.data.products.salePrice)
    //                 .then(result => {
    //                     console.log("*****Get BestBuy")
    //                     console.log(result)
    //                     bestbuyArr = result.data.recentBestbuyPrices
    //                     dispatch({ type: LOADING })
    //                     dispatch({
    //                         type: SET_BESTBUY_PRODUCT, product: {
    //                             name: res.data.products.name,
    //                             link: res.data.products.url,
    //                             price: res.data.products.salePrice
    //                         }
    //                     })
    //                 })
    //         })
    //         .catch(err => console.log(err))
    // };

    const getRecentPrices = (value) => {
        API.getOneProduct(state.trackedList[value]._id)
            .then(res => {
                walmartArr = res.data.recentPrices
            })
    }


    return (
        <div>
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


            <Form inline  style={{width:500}}>
              <FormControl id="search-bar" type="text" placeholder="Search" ref={SearchValue} className="mr-sm-0"/>
              <Button variant="outline-success" onClick ={handleSearch}><Link  to="/results">Search</Link></Button>
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
      </div>

            <Container>
                <h1>Your Tracked Products:</h1>
                <Col className="md-4">
                    {!state.trackedList.length ? (
                        <h1>No products to display</h1>
                    ) : (<Container  id="background">
                        <CardColumns>
                            {state.trackedList.map((product, index) => (
                                <div>
                                    <Card key={product.name} >
                                        <Card.Img variant="top" src={product.image} style={{ width: "45%" }} className="ml-5 pl-5 pt-5" />
                                        <Card.Body className="text-center">
                                            <Card.Title>{product.name}</Card.Title>
                                            <Button variant="primary" onClick={() => getModal(index)}>See Product Info</Button>
                                        </Card.Body>
                                    </Card>
                                    <Modal show={show === index} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>{product.name}</Modal.Title>
                                        </Modal.Header>
                                        <div className="lineGraph">
                                            <Line data={lineData} options={lineOptions.options} />
                                        </div>
                                        <Button onClick={() => { getRecentPrices(index) }}>click</Button>

                                        <Modal.Body>Walmart price before: ${product.price}</Modal.Body>
                                        <Modal.Body>Walmart price now: ${state.currentProduct.price}</Modal.Body>
                                        <p><a href={state.currentProduct.link}> Go to Walmart's website</a></p>

                                        {product.recentAmazonPrices.length !== 0 ? (<div>
                                        <Modal.Body>Amazon price before: ${product.amazonPrice}</Modal.Body>
                                        <Modal.Body>Amazon price now: ${state.amazonProduct.price}</Modal.Body>
                                        <p><a href={state.amazonProduct.link}>Go to Amazon's website</a></p>
                                        </div>) : (
                                            <div></div>
                                        )}
                                        
                                        {product.recentBestbuyPrices.length !== 0  ? (<div>
                                        <Modal.Body>Best Buy price before: ${product.bestbuyPrice}</Modal.Body>
                                        <Modal.Body>Best Buy price now: ${state.bestbuyProduct.price}</Modal.Body>
                                        <p><a href={state.bestbuyProduct.link}>Go to Best Buy website</a></p>
                                        </div>) : (
                                            <div></div>
                                        )}
                                        
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                                </Button>
                                            <Button variant="primary" onClick={handleClose}>
                                                Save Changes
                                                </Button>
                                        </Modal.Footer>
                                    </Modal>

                                </div>
                            ))}
                        </CardColumns>

                    </Container>

                        )}
                </Col>
            </Container>
        </div>
    )


};




export default Dashboard;