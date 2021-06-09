import React, { Component } from "react";
import { Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import MemberService from "../service/MemberService";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const required = value => {
    if (!value) {
        return (<div className="alert alert-danger" role="alert">This field is required!</div>);
    }
};

class SignIn extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            id: "",
            password: "",
            loading: false,
            message: ""
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeId = this.onChangeId.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onChangeId(e) {
        this.setState({ id: e.target.value });
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    handleLogin(e) {
        e.preventDefault();
        this.setState({ message: "", loading: true });
        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
            MemberService.login(this.state.id, this.state.password).then(() => {
                window.location.href = "/main-board";
            },
            error => { const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            this.setState({ loading: false, message: resMessage });
            });
        } 
        else {
            this.setState({ loading: false });
        }
    }
    
    render() {
        const { isOpen, close } = this.props;   // 아까 버튼에서 props로 가져온것
        return (<>
        {isOpen ? (  
        <div onClick={close}>
            <Modal show={true} animation={false}>
                <Modal.Header closeButton onClick={this.changeModalHandler}>
                    <Modal.Title>Enter your User ID and Password</Modal.Title>
                </Modal.Header>
                <Modal.Body onClick={isOpen}>
                    <Form onSubmit={this.handleLogin} ref={c => {this.form = c;}}>
                        <div className="form-group">
                            <label style={{fontSize:'16px'}} htmlFor="id">Id</label>
                            <Input type="text" style={{height:'40px', fontSize:'16px'}} className="form-control" name="id" value={this.state.id} onChange={this.onChangeId} validations={[required]}/>
                        </div>

                        <div className="form-group">
                            <label style={{fontSize:'16px'}} htmlFor="password">Password</label>
                            <Input type="password" style={{height:'40px', fontSize:'16px'}} className="form-control" name="password" value={this.state.password} onChange={this.onChangePassword} validations={[required]}/>
                        </div>

                        <div className="form-group">
                            <button className="btn-main" style={{width:'100%', height:'40px'}} disabled={this.state.loading}>
                                {this.state.loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span style={{fontSize:'16px'}}>Login</span>
                            </button>
                        </div>

                        {this.state.message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">{this.state.message}</div>
                        </div>
                        )}
                        <CheckButton style={{ display: "none" }} ref={c => {this.checkBtn = c;}}/>
                    </Form>                 
              </Modal.Body>        
            </Modal>                              
        </div>) : null}</>);
    }
}

export default withRouter(SignIn);