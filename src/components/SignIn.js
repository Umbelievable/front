import React, { Component } from "react";
import { Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import MemberService from "../service/MemberService";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeId = this.onChangeId.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      id: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeId(e) {
    this.setState({
      id: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      MemberService.login(this.state.id, this.state.password).then(
        () => {
          this.props.history.push("/main-board");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }
   
  
  render() {
    const { isOpen, close } = this.props;   // 아까 버튼에서 props로 가져온것
    return (
      <>
        {isOpen ? (  
          <div onClick={close}>
            <Modal show={true} animation={false}>
              <Modal.Header closeButton onClick={this.changeModalHandler}>
                <Modal.Title>Enter your User ID and Password</Modal.Title>
              </Modal.Header>
              <Modal.Body onClick={isOpen}>
                <Form onSubmit={this.handleLogin} ref={c => {this.form = c;}}>
                <div className="form-group">
                  <label htmlFor="id">Id</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="id"
                    value={this.state.id}
                    onChange={this.onChangeId}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <button
                    className="btn btn-primary btn-block"
                    disabled={this.state.loading}
                  >
                    {this.state.loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                  </button>
                </div>

                {this.state.message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {this.state.message}
                    </div>
                  </div>
                )}
              <CheckButton style={{ display: "none" }} ref={c => {this.checkBtn = c;}}/>
                </Form>                 
              </Modal.Body>        
            </Modal>                              
          </div>
        ) : null}
      </>
    );
  }
}

export default withRouter(SignIn);