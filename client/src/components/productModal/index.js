import React from "react";
import "./style.css";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import { Bar, Line, Pie } from "react-chartjs-2";
 

function productModal(props){
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
          <Col xs={5} md={3}>
            <img src = "https://m.media-amazon.com/images/I/61BLZqTXqeL._AC_AA180_.jpg" alt="broly"/>
          </Col>
            <Col xs={5} md={3}>
              <h3 className="font-weight-bold">Sold At:</h3><br></br>
              <h3>Amazon</h3><br></br>
              <h3>Target</h3><br></br>
              <h3>Walmart</h3><br></br>
              </Col>
              <Col xs={5} md={5}>
                
                  <Line
                  data={{
                    labels:["Day 1","Day 2","Day 3","Day 4","Day 5","Day 6","Day 7"],
                    datasets:[{
                      label:"Item price",
                      data:[
                        110.00,
                        14.00,
                        20.00,
                        5000.00,
                        100.00,
                        20.00,
                        40.00
                      ],
                      backgroundColor:[

                      ]
                    }]
                  }}
                  width={10000}
                  height={10000}
                  options={{ 
                    title:{
                      display:true,
                      text:"Your item History"
                    }
                  }}
                  />

              </Col>
              </Row>
        </Container>
        </Modal.Body>
      </Modal>
    </div>    
  );
}

export default productModal;