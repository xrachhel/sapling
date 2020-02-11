import React, { useState } from 'react';
import {Button, Modal, Container, InputGroup, FormControl} from 'react-bootstrap';
import "./style.css";



function LoginModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container>
            <>
            <Button variant="primary" onClick={handleShow}>
                Launch modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon2">Password</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon2"
                        />
                    </InputGroup>

                    {/* <input id="userName" type="text">Username</input>

                    <input id="password" type="password">Password</input> */}
                </Modal.Body>


                <Modal.Footer>
                <Button id="sign-in" variant="primary" onClick={handleClose}>
                    Sign-In
                </Button>

                <Button id="sign-up" variant="primary" onClick={handleClose}>
                    Sign-Up
                </Button>
                </Modal.Footer>
            </Modal>
            </>

        </Container>
    )
}


export default LoginModal;