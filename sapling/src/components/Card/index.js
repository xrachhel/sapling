import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


function MyCard() {
    return (
            <Card id="card" style={{ width: '8rem', margin: '20px'}}>
                <Card.Img variant="top" src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-mini-select-201911_FMT_WHH?wid=2000&amp;hei=2000&amp;fmt=jpeg&amp;qlt=80&amp;op_usm=0.5,0.5&amp;.v=1573825332486" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        $$
                </Card.Text>
                    <Button variant="success">Go somewhere</Button>
                </Card.Body>
            </Card>
    )
}

export default MyCard;