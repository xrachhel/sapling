import React from "react";
import CardDeck from 'react-bootstrap/CardDeck';
import Card from "../Card/index";
import Container from 'react-bootstrap/Container';


function MyCardDeck() {
    return (
        <Container>
            <CardDeck>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            </CardDeck>
        </Container>
            
    )
}

export default MyCardDeck;