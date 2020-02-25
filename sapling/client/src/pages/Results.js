import React, { useEffect,useRef } from "react";
import { Form, FormControl, Button, Container, Col, CardColumns,Nav,Navbar } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import { useStoreContext } from "../utils/GlobalState"
import { UPDATE_RESULT_LIST,SET_SEARCH_TERM } from "../utils/actions";
import API from "../utils/API"; 
import { Link } from "react-router-dom"
import "./assets/result.css"
import "../components/ourNavbar/assets/css/style.css"




const Results = () => {
    const [state, dispatch] = useStoreContext();
    const SearchValue = useRef(null)


    useEffect(() => {
        getResults(state.searchTerm);
    }, []);


    const getResults = (search) => {

        API.searchProductWalmart(search)
        .then(res =>{ 
            console.log(res)
            dispatch({ type: UPDATE_RESULT_LIST, productList: res.data.items})})
        .catch(err => console.log(err));
      
    };
    const handleSearch = (event) =>{
      if(SearchValue.current.value){
        dispatch({type:SET_SEARCH_TERM,searchTerm:""})
        event.preventDefault()
        console.log(state.searchTerm)
        dispatch({type:SET_SEARCH_TERM,searchTerm:SearchValue.current.value})
        console.log(state.searchTerm)
        getResults(state.searchTerm)
      }
    }

    // const trackProduct = () => {
    //     dispatch({ type: TRACK_PRODUCT, trackedList: state.currentProduct });
    // };


    return (
        <div id="background">
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
              
              <Button type="submit" variant="outline-success" onClick={handleSearch}><Link  to="/results">Search</Link></Button>

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
             <h1>Products:</h1>
                    <Col className="md-4">
                        {!state.productList.length ? (
                            <h1>No products to display</h1>
                        ) : (<Container>
                            <CardColumns>
                                {state.productList.map(product => {
                                    return (
                                        <Card key={product.name} >
                                            <Card.Img variant="top" src={product.thumbnailImage} style={{ width: "45%" }} className="ml-5 pl-5 pt-5" />
                                            <Card.Body className="text-center">
                                                <Card.Title>{product.name}</Card.Title>
                                                <Card.Text>
                                                    <strong>Price: </strong> ${product.salePrice}
                                                </Card.Text>
                                                <Card.Text>
                                                    <strong>Rating:</strong>
                                                    {product.customerRating}/5
                                                </Card.Text>
                                                <Link to={"/product/" + product.itemId + "/" + product.upc}>View Product</Link>
                                                {/* <Button variant="success" onClick={trackProduct}>Track Product</Button> */}
                                            </Card.Body>
                                        </Card>
                                    );
                                })}
                            </CardColumns>
                        </Container>
                            )}
                    </Col>
        </Container>

        </div>
    )
}



export default Results;