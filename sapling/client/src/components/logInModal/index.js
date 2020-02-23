import React, { useState } from "react";
import {
  Button,
  Modal,
  Container,
  InputGroup,
  FormControl
} from "react-bootstrap";
import API from "../../utils/API";

function Signup() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showUp, setShowSign] = useState(false);
  const handleCloseSignUp = () => setShowSign(false);
  const handleShowSignUp = () => setShowSign(true);

  const handleFirstName = e => {
    setFirstName(e.target.value);
  };
  const handleLastName = e => {
    setLastName(e.target.value);
  };
  const handleEmail = e => {
    setEmail(e.target.value);
  };
  const handlePassword = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = e => {
    console.log("handleSubmit");
    console.log(email);
    e.preventDefault();
    API.createUser({ firstName, lastName, email, password })
      .then(response => {
        console.log(response);
        if (!response.data.errmsg) {
          console.log("successful signup");
          handleCloseSignUp();
          handleClose();
        } else {
          console.log("This user has already exist");
        }
      })
      .catch(error => {
        console.log("signup error: ");
        console.log(error);
      });
  };

  // const handleSignIn = e => {
  //   console.log("handleSignIN");
  //   console.log(password);
  //   e.preventDefault();
  //   API.getOneUser({ email, password })
  //     .then(response => {
  //       console.log(response);
  //       if (!response.data.errmsg) {
  //         console.log("successful Login");
  //         handleClose();
  //       } else {
  //         console.log("No user exit");
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  return (
    <Container>
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch modal
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {" "}
              <i className="fas fa-seedling"></i> Modal heading
            </Modal.Title>
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
      {/* Signup */}
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
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleFirstName}
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
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleLastName}
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
                type="text"
                name="email"
                value={email}
                onChange={handleEmail}
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
                name="password"
                value={password}
                onChange={handlePassword}
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
            <Button id="submit" variant="primary" onClick={handleSubmit}>
              <i className="fas fa-tree"></i> Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </Container>
  );
}

export default Signup;
