import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/ourNavbar/index";
import Login from "./components/LoginModal/index";

// import Jumbotron from "./components/Footer/Index";

// All Carousels imported from components
import CarouselOne from "./components/CarouselAboutUs/index";
// import CarouselTwo from "./components/CarouselSuggestions/index";
import CarouselThree from "./components/CarouselLanding/index";


function App() {
  return (
    <div>
      <Navbar/>
      <Login/>
      

      <div>
        <CarouselOne />
      </div>

      <div>
        <CarouselThree />
      </div>

      {/* <Jumbotron/> */}
    </div>
  );
}





export default App;
