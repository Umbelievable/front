import { findAllByDisplayValue } from '@testing-library/dom';
import React, { Component } from 'react';
import {Navbar, Nav, Form, FormControl, Button, Modal, NavDropdown, Sidebar} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';



class HeaderComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchType:'all',
            searchKeyword:'',
            isModalOpen:false

        }
        this.joinMember = this.joinMember.bind(this);
        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.changeKeywordHandler = this.changeKeywordHandler.bind(this);	

    }
    
    changeTypeHandler = (event) => {
        this.setState({searchType: event.target.value});
    }
    
    changeKeywordHandler = (event) => {
        this.setState({searchKeyword: event.target.value});
    }

    changeModalHandler = (event) => {
        this.setState({isModalOpen: !this.state.isModalOpen,});
      }

    searchBoard(searchType, searchKeyword){
        this.props.history.push(`/search-board?searchType=${searchType}&searchKeyword=${searchKeyword}`);
       
    }

    goToList() {
        window.location.replace('/main-board');
    }

    joinMember(){
        this.props.history.push('/member-join');
    }

    render() {
        return (
        <div class="fixed-navbar" style={{overflow:'hidden'},{height:'auto'}}>
            {this.state.isModalOpen && (
                <Modal show={true} animation={false}>
                    <Modal.Header closeButton onClick={this.changeModalHandler}>
                      <Modal.Title>Enter your User ID and Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group controlId="formGroupId">
                          <Form.Label>User ID</Form.Label>
                          <Form.Control type="text" placeholder="User Id" />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={this.changeModalHandler} >
                        Close
                      </Button>
                      <Button variant="success" onClick={this.changeModalHandler} >
                        Login
                      </Button>
                    </Modal.Footer>
                  </Modal>                                   
            )}                
                <div class="btn_wrap text-right">
                    <button class="btn btn-primary waves-effect waves-light" onClick={this.joinMember}>JOIN</button>
                    <button class="btn btn-primary waves-effect waves-light" onClick={this.changeModalHandler}>LOGIN</button>
			    </div>
			    <div class="text-center">
				    <h1 class="page-title" onClick = {this.goToList}>DZBZ</h1>
        <div id="adv-search" class="input-group">
				<form id="searchForm" style={{display:'inline-block'}} role="form">
					<div class="form-group" style={{display:'inline-block'}}>
						<select value={this.state.searchType} onChange={this.changeTypeHandler} name="searchType" class="form-control" style={{width:"100px"},{height:"44px"}}>
                            <option value="all" >전체</option>
                            <option value="title" >제목</option>
							<option value="content" >내용</option>
							<option value="writer" >작성자</option>
						</select>
					</div>

					<div class="form-group" style={{display:'inline-block'}}>
						<input type="text" value={this.state.searchKeyword} name="searchKeyword" onChange={this.changeKeywordHandler} class="form-control"  style={{width:"300px"}} placeholder="키워드를 입력해 주세요."/>
					</div>

          <div class="form-group" style={{display:'inline-block'}}>
					  <button onClick = {() => this.searchBoard(this.state.searchType, this.state.searchKeyword)} class="form-control" style={{background: "#1d84df"}}><span style={{color: "#ffffff"}} class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
          </div>          
        </form>
	      </div>
			    </div>

        <div class="pos-f-t">
          <nav class="navbar navbar-light bg-light" style={{margin:"0px 0px 0px 0px"}}>
          <button  class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <a class="nav-link" href="/photo-board">Photo</a>
          <a class="nav-link" href="/qna-board">Q&amp;A</a>
          <a class="nav-link" href="/cs-board">Customer Service</a>

          </nav>
          <div class="collapse" id="navbarToggleExternalContent">
            <div class="bg-dark p-4">
              <h4 class="text-white">Collapsed content</h4>
              <span class="text-muted">Toggleable via the navbar brand.</span>
            </div>
          </div>
        </div>
		</div>
        );
    }
}

export default withRouter(HeaderComponent);