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
            searchBoard: 'allBoard',
            searchType: 'all',
            searchKeyword: '',
            isModalOpen: false,
            currentUser: { id: "" }
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

    searchBoard(searchBoard, searchType, searchKeyword){
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
        <div className="fixed-navbar" style={{overflow:'hidden'},{height:'auto'}}>                          
            <div className="btn_wrap text-right">
            {!this.state.userReady && (
                <button className="mainhomebtn" onClick={this.joinMember}>JOIN</button>)}
            {this.state.userReady && (
                <button className="mainhomebtn" onClick={()=>window.location.replace('/mypage-board')}>{currentUser.id}님의 my page</button>)}
            {!this.state.userReady && (
                <button className="mainhomebtn" onClick={this.openModal}>LOGIN</button>)}
            {this.state.userReady && (
                <button className="mainhomebtn" onClick={this.logOut}>LOGOUT</button>)}
              

            <SignIn isOpen={this.state.isModalOpen} close={this.closeModal} />
			</div>
			<div className="text-center">
				<h1 style={{fontSize:'30px'}}className="page-title" onClick = {this.goToList}>DZBZ</h1>
            <div id="adv-search" className="input-group">
				<form id="searchForm" style={{display:'inline-block'}} role="form">
					<div className="form-group" style={{display:'inline-block'}}>
						<input id="searchBar" type="text" value={this.state.searchKeyword} name="searchKeyword" onChange={this.changeKeywordHandler} className="form-control" style={{width:"450px", border:'none', border:'2px solid #2D6C4A'}} placeholder="DZBZ 상품 검색"/>
					</div>
                    <div className="form-group" style={{display:'inline-block'}}>
					    <button onClick = {() => this.searchBoard(this.state.searchType, this.state.searchKeyword)} className="form-control" style={{background: "#2D6C4A", height:'46px', border:'2px solid #2D6C4A'}}><span style={{color: "#ffffff"}} className="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                    </div>          
                </form>
	        </div>
			</div>

        
		</div>
        );
    }
}

export default withRouter(HeaderComponent);