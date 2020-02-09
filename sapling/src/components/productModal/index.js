import React from "react";
import "./style.css";
import {Modal,Button} from "react-bootstrap";
 

function productModal(props){
    
    return (
        <div>
        <Button variant="primary" onClick={props.handleShow}>
        Launch demo modal
      </Button>
        <Modal show={props.show} onHide={porps.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        
        </div>
    )
}

export default productModal;

{/* <Modal.Dialog>
<Modal.Header closeButton>
  <Modal.Title>Your poduct</Modal.Title>
</Modal.Header>

<Modal.Body>
      <div className="float-left">
          <div className="card row">
              <div className="card-body">
                  <p>ldgdsgshgdhjsagdhjsagdhjagfjhagshfgdhfghjsdagfhjgfhgahfgdhsjgfjhsadkgfhgsa</p>
                  </div>

          </div>
          <div className="row">
              <h3>Sold At:</h3><br></br>
              <h3>Amazon</h3><br></br>
              <h3>Target</h3><br></br>
              <h3>Walmart</h3><br></br>
              </div>
              <div className="row">
                  <Doughnut
                  data={props.data}
                  width={100}
                  height={50}
                  options={{maintainAspectRatio: false}}
                  />
              </div>
      </div>
</Modal.Body>

<Modal.Footer>
  <Button variant="secondary">Close</Button>
  <Button variant="primary">Save changes</Button>
</Modal.Footer>
</Modal.Dialog> */}
