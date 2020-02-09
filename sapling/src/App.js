import React, {useState} from 'react';
import {Modal,Button,Container,Row,Col} from "react-bootstrap";
import {Doughnut} from "react-chartjs-2";
import './App.css';


function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">Your Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
          <Row>
          <Col xs={6} md={4}>
            <img src = "https://m.media-amazon.com/images/I/61BLZqTXqeL._AC_AA180_.jpg" alt="broly"/>
          </Col>
            <Col xs={6} md={4}>
              <h2 className="font-weight-bold">Sold At:</h2><br></br>
              <h3>Amazon</h3><br></br>
              <h3>Target</h3><br></br>
              <h3>Walmart</h3><br></br>
              </Col>
              <Col xs={5} md={3}>
                  <img src = "https://m.media-amazon.com/images/I/61BLZqTXqeL._AC_AA180_.jpg" alt="broly"/>
                  <Doughnut
                  data=
                  width={100}
                  height={50}
                  options={{ maintainAspectRatio: false }}
                  />
              </Col>
              </Row>
        </Container>
        </Modal.Body>
      </Modal>
    </div>    
  );
}

export default App;
