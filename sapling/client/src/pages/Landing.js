import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/ourNavbar/index";
import Jumbotron from "../components/Footer/Index";
import CarouselOne from "../components/CarouselAboutUs/index";
import CarouselThree from "../components/CarouselLanding/index";


function LandingPage() {
  return (
    <div>
      <Navbar/>
      
      <div>
        <CarouselOne />
      </div>

      <div>
        <CarouselThree />
      </div>

      <Jumbotron/>
    </div>
  );
}





export default LandingPage;