import React, { useState } from "react";
import {
  Button,
  Modal,
  Container,
  InputGroup,
  FormControl
} from "react-bootstrap";
import ShowSignUp from "../signUpModal/index";
import API from "../../utils/API";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showUp, setShowSign] = useState(false);
  const handleCloseSignUp = () => setShowSign(false);
  // const handleShowSignUp = () => ShowSignUp(true);

  // function handleShowSignUp() {
  //   console.log("handleShowSignUp");
  //   ShowSignUp();
  // }

  const handleEmail = e => {
    setEmail(e.target.value);
  };
  const handlePassword = e => {
    setPassword(e.target.value);
  };

  const handleSignIn = e => {
    console.log("handleSignIn");
    // console.log(email);
    // console.log(password);
    e.preventDefault();
    API.getOneUser({ email: email, password: password })
      .then(response => {
        console.log(response);
        if (response.data) {
          console.log("successful Login");
          // login: true,
          // username: response.data.username
          handleClose();
        } else {
          console.log("No user exit");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Container>
      {/* Login */}
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch Login
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {"Login"}
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
                value={email}
                onChange={handleEmail}
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
                value={password}
                onChange={handlePassword}
              />
            </InputGroup>
          </Modal.Body>

          <Modal.Footer>
            <Button id="sign-in" variant="primary" onClick={handleSignIn}>
              <i className="fas fa-tree"></i> Sign-In
            </Button>

            <Button id="sign-up" variant="primary">
              {/* <i className="fas fa-seedling"></i> Sign-Up */}
              <ShowSignUp />
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </Container>
  );
}

export default Login;
