import React from "react";
import Card from 'react-bootstrap/Card';
import "./style.css"

function CardProduct() {
    return (
        <Card style={{ width: '18rem', margin: '20px' }}>
            <Card.Img variant="top" src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MV7N2?wid=1144&hei=1144&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1551489688005" />

        </Card>
    )
}

export default CardProduct;