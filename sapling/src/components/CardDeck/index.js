import React from "react";
import CardDeck from 'react-bootstrap/CardDeck';
import Card from "../Card/index";


function MyCardDeck() {
    return (
            <CardDeck>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            </CardDeck>
    )
}

export default MyCardDeck;