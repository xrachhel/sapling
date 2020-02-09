import React from "react";
import CardDeck from 'react-bootstrap/CardDeck'
import Card from "../Card/index"

function MyCardDeck() {
    return (
        <div>
            <CardDeck>
                <Card />
            </CardDeck>
        </div>

    )
}

export default MyCardDeck;