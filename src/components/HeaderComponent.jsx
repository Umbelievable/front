import { findAllByDisplayValue } from '@testing-library/dom';
import React, { Component } from 'react';
import {Navbar, Nav, Form, FormControl, Button, Modal, NavDropdown, Sidebar} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import SignIn from "./SignIn";
import CategoryService from '../service/CategoryService';
import MemberService from '../service/MemberService';


class HeaderComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchBoard:'allBoard',
            searchType:'all',
            searchKeyword:'',
            isModalOpen:false,
            currentUser: { username: "" }
        }
        this.joinMember = this.joinMember.bind(this);
        this.changeBoardHandler=this.changeBoardHandler.bind(this);
        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.changeKeywordHandler = this.changeKeywordHandler.bind(this);	

    }

    componentDidMount() {
        const currentUser = MemberService.getCurrentUser();
        
        if (!currentUser){
            this.setState({ currentUser: "guest", userReady: false });
        }
        else{
            this.setState({ currentUser: currentUser, userReady: true });
        } 
 
    }
    
    changeBoardHandler = (event) => {
        this.setState({searchBoard: event.target.value});
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

    openModal = (event) => {
      this.setState({ isModalOpen: true });
    }
  
    closeModal = (event) => {
      this.setState({ isModalOpen: false });
    }

    searchBoard(searchBoard,searchType, searchKeyword){
        this.props.history.push(`/search-board?searchBoard=${searchBoard}&searchType=${searchType}&searchKeyword=${searchKeyword}`);
    }

    goToList() {
        window.location.replace('/main-board');
    }

    joinMember(){
        this.props.history.push('/member-join');
    }

    logOut() {
        MemberService.logout();
        window.location.replace('/main-board');
    }

    render() {
        const { currentUser } = this.state;
        return (
        <div class="fixed-navbar" style={{overflow:'hidden'},{height:'auto'}}>                          
          <div class="btn_wrap text-right">
          {!this.state.userReady && (
              <button class="btn btn-primary waves-effect waves-light" onClick={this.joinMember}>JOIN</button>)}
         {this.state.userReady && (
             <button class="btn btn-primary waves-effect waves-light" onClick={()=>window.location.replace('/mypage-board')}>{currentUser.username}님의 my page</button>)}
        
          {!this.state.userReady && (
              <button class="btn btn-primary waves-effect waves-light" onClick={this.openModal}>LOGIN</button>)}
        {this.state.userReady && (
              <button class="btn btn-primary waves-effect waves-light" onClick={this.logOut}>LOGOUT</button>)}
              
              
              
              <SignIn isOpen={this.state.isModalOpen} close={this.closeModal} />
			    </div>
			    <div class="text-center">
				    <h1 class="page-title" onClick = {this.goToList}>DZBZ</h1>
        <div id="adv-search" class="input-group">
				<form id="searchForm" style={{display:'inline-block'}} role="form">

                <div class="form-group" style={{display:'inline-block'}}>
                <select value={this.state.searchBoard} onChange={this.changeBoardHandler} name="searchBoard" class="form-control" style={{width:"100px"},{height:"44px"}}>
                            <option value="allBoard" >전체</option>
                            <option value="photo" >Photo</option>
							<option value="qna" >Q&amp;A</option>
						</select>
                </div>

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
					  <button onClick = {() => this.searchBoard(this.state.searchBoard, this.state.searchType, this.state.searchKeyword)} class="form-control" style={{background: "#1d84df"}}><span style={{color: "#ffffff"}} class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
          </div>          
        </form>
	      </div>
			    </div>

        
		</div>
        );
    }
}

export default withRouter(HeaderComponent);