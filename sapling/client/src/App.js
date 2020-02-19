import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/ourNavbar/index";
import Container from "./components/Container/index";
import Jumbotron from "./components/Footer/Index";

// Everything below will be called in other components
// import Button from "./components/Button/index";
// import Card from "./components/Card/index";
// import Columns from "./components/Columns/index";
// import Graph from "./components/Graph/index";
// import Rows from "./components/Rows/index";

//Bringing pages into play
import AuthPro from "./pages/AuthProduct"


function App() {

  return (
    <div>
      <Navbar/>
    </div>
  );
}





export default App;
