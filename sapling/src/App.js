// ========================= Carousels ==================================================
// CarouselOne = CarouselAboutUs
// CarouselTwo = CarouselSuggestions
// CarouselThree = CarouselLanding

import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import CarouselOne from "./components/CarouselAboutUs/index";
import CarouselTwo from "./components/CarouselSuggestions/index";
import CarouselThree from "./components/CarouselLanding/index";
// import { Carousel } from 'react-bootstrap';


class App extends Component {
    state = {
        frontCards: frontCards,
        suggestCards : suggestCards
    }

    render() {
    return (
        <div className="App"> 

        <CarouselOne />
        
        {this.state.frontCards.map(card => (
          <CarouselTwo
              id={card.id}
              key={card.id}
              image={card.image}
              name={card.name}
              cardSelected={this.cardSelected} // function to detect chosen card (?)
          />
        ))}

        {this.state.suggestCards.map(card => (
          <CarouselThree
              id={card.id}
              key={card.id}
              image={card.image}
              name={card.name}
              cardSelected={this.cardSelected} // function to detect chosen card (?)
          />
        ))}

        </div>
    );
  }
}

export default App;