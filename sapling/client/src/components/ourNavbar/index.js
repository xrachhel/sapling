import React from "react";
import { Link } from "react-router-dom";
import './assets/css/style.css';

import Login from "../logInModal/index";
import { Navbar, Nav, Form, FormControl, Button, Row } from 'react-bootstrap'
import { STATES } from "mongoose";
import { useRef } from 'react';
import {SET_SEARCH_TERM,UPDATE_RESULT_LIST} from "../../utils/actions"
import {useStoreContext} from "../../utils/GlobalState"
import API from "../../utils/API"

function OurNavbar() {
  const SearchValue = useRef(null)
  const [state, dispatch] = useStoreContext();
  const getResults = (search) => {

    API.searchProductWalmart(search)
    .then(res =>{ 
        console.log(res)
        dispatch({ type: UPDATE_RESULT_LIST, productList: res.data.items})})
    .catch(err => console.log(err));
  
};

  const  handleSearch = () =>{
    console.log(SearchValue.current.value)
    dispatch({type:SET_SEARCH_TERM,searchTerm:SearchValue.current.value})
    getResults(state.searchTerm)
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
              
              <Button type="submit" id="search-button-style" onClick={handleSearch}><Link id="search-button-style-text" to="/results">Search</Link></Button>

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
    )
}
export default OurNavbar;