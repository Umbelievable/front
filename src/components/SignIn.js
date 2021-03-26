import React, { Component } from "react";
import {Navbar, Nav, Form, FormControl, Button, Modal, NavDropdown, Sidebar} from 'react-bootstrap';
import { Link } from "react-router-dom";
import BoardService from '../service/MemberService';
import { withRouter } from 'react-router-dom';


class SignIn extends Component {
  state = {
    id: "",
    password: ""
  };

  loginHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }; 

  loginClickHandler = () => {
    const { id, password } = this.state;
    fetch("http://localhost:8080/api/member/"+this.state.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .then(this.props.history.push('/qna-board'));
  }; 

  render() {
    const { isOpen, close } = this.props;   //아까 버튼에서 props로 가져온것
    return (
      <>
        {isOpen ? (  
          <div onClick={close}>
              <Modal show={true} animation={false}>
                    <Modal.Header closeButton onClick={this.changeModalHandler}>
                      <Modal.Title>Enter your User ID and Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body onClick={isOpen}>
                      <Form>
                        <Form.Group controlId="formGroupId">
                          <Form.Label>User ID</Form.Label>
                          <Form.Control name="id" onChange={this.loginHandler} type="text" placeholder="User Id" />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control name="password" onChange={this.loginHandler} type="password" placeholder="Password" />
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={close} >
                        Close
                      </Button>
                      <Button variant="success" onClick={this.loginClickHandler} >
                        Login
                      </Button>
                    </Modal.Footer>
                  </Modal>                              

          </div>
        ) : null}
      </>
    );
  }
}

export default withRouter(SignIn);