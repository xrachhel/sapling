import React, { useState } from 'react';
import {Button, Modal, Container, InputGroup, FormControl} from 'react-bootstrap';
//import "./style.css";



function LoginModal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [showUp, setShowSign] = useState(false);
    const handleCloseSignUp = () => setShowSign(false);
    const handleShowSignUp = () => setShowSign(true);


    return (
        <Container>
            <>
            <Button variant="primary" onClick={handleShow}>
                Launch modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title> <i className="fas fa-seedling"></i> Modal heading</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">
                            <i className="fas fa-sun"></i> Email
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon2">
                                <i className="fas fa-cloud-rain"></i> Password
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon2"
                        type="password"
                        />
                    </InputGroup>

                </Modal.Body>


                <Modal.Footer>
                <Button id="sign-in" variant="primary" onClick={handleClose}>
                    <i className="fas fa-tree"></i> Sign-In
                </Button>

                <Button id="sign-up" variant="primary" onClick={handleShowSignUp}>
                    <i className="fas fa-seedling"></i> Sign-Up
                </Button>   
                </Modal.Footer>
            </Modal>
            </>

{/* ==================================================         =========================================================================== */}
{/* ================================================== Sign-Up =========================================================================== */}
{/* ==================================================         =========================================================================== */}
            <>
            <Modal show={showUp} onHide={handleCloseSignUp}>
            <Modal.Header closeButton>
            <Modal.Title> Modal heading</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">
                        <i className="fas fa-leaf"></i> First Name
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    placeholder="FirstName"
                    aria-label="FirstName"
                    aria-describedby="basic-addon1"
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">
                        <i className="fas fa-seedling"></i> Last Name
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    placeholder="LastName"
                    aria-label="LastName"
                    aria-describedby="basic-addon2"
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">
                        <i className="fas fa-sun"></i> Email
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    placeholder="EmailSignUp"
                    aria-label="EmailSignUp"
                    aria-describedby="basic-addon3"
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon2">
                            <i className="fas fa-cloud"></i> Password
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon4"
                    type="password"
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon2">
                            <i className="fas fa-cloud-rain"></i> Confirm
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    placeholder="Confirm"
                    aria-label="Confirm"
                    aria-describedby="basic-addon5"
                    type="password"
                    />
                </InputGroup>

            </Modal.Body>


            <Modal.Footer>
            <Button id="submit" variant="primary" onClick={handleCloseSignUp}>
                <i className="fas fa-tree"></i> Submit
            </Button>
            </Modal.Footer>
            </Modal>
            </>

        </Container>
    )
}


export default LoginModal;