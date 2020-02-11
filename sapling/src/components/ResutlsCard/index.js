
import React from "react";
import {Card, Row, Button, Col} from 'react-bootstrap';



function renderResultsCard() {
    return (
        <Row className="justify-content-center">
            <Card id="card" style={{ width: '100%', margin: '10px'}}>
                <Row>
                    <Col className="col-3">
                <Card.Img variant="top" style={{ width: '50%'}} src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-mini-select-201911_FMT_WHH?wid=2000&amp;hei=2000&amp;fmt=jpeg&amp;qlt=80&amp;op_usm=0.5,0.5&amp;.v=1573825332486" />
                <Card.Body className="pt-0">
                    <Card.Title><strong>Card Title</strong></Card.Title>
                        <Card.Text>
                            $$
                        </Card.Text>
                    <Button variant="success btn-sm">Product page</Button>
                </Card.Body>
                </Col>
                    <Col>
                        <Card.Body className="float-right text-left">
                                <Card.Text className="align-middle">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Row>
    )
}

export default renderResultsCard;