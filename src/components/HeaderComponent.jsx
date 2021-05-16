import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import SignIn from "./SignIn";
import MemberService from '../service/MemberService';


class HeaderComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchBoardType: window.location.pathname,
            searchKeyword: '',
            isModalOpen: false,
            currentUser: { id: "" }
        }
        this.joinMember = this.joinMember.bind(this);
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

    searchBoard = (event) => {
        event.preventDefault();
        var searchBoardType = this.state.searchBoardType;
        var searchKeyword = this.state.searchKeyword;

        // searchBoard는 사용자 위치 반환      
        // qna에 있는지 // photo에 있는지 // main에서 전체 검색할건지(커뮤 두 개+아이템 전체) // 소카테고리(침실가구-침대) 들어가서 걔만 찾을건지 
        // 게시판 타입마다 렌더링 다르게 해줘야 하기 때문에 searchBoardComponent 여러개 구현

        if(searchBoardType=='/main-board' || searchBoardType=='/search-allboard'){
            window.location.replace(`/search-allboard?searchKeyword=${searchKeyword}`);
        }
        if(searchBoardType=='/qna-board' || searchBoardType=='/search-board'){
            window.location.replace(`/search-board?searchKeyword=${searchKeyword}`);
        }
        else if(searchBoardType=='/photo-board' || searchBoardType=='/search-photoboard'){
            window.location.replace(`/search-photoboard?searchKeyword=${searchKeyword}`);
        }
        else if(searchBoardType=='/menu-board' || searchBoardType=='/search-menuboard'){ // subCate
            const params = new URLSearchParams(window.location.search);
            window.location.replace(`/search-menuboard?searchKeyword=${searchKeyword}&cateNo=${params.get('cateNo')}&subcateNo=${params.get('subcateNo')}`);
        }
        else {
            window.location.replace(`/search-allboard?searchKeyword=${searchKeyword}`);
        }
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
<<<<<<< HEAD
                <button className="btn btn-primary waves-effect waves-light" onClick={this.joinMember}>JOIN</button>)}
            {this.state.userReady && (
                <button className="btn btn-primary waves-effect waves-light" onClick={()=>window.location.replace('/mypage-board')}>{currentUser.id}님의 my page</button>)}
            {!this.state.userReady && (
                <button className="btn btn-primary waves-effect waves-light" onClick={this.openModal}>LOGIN</button>)}
            {this.state.userReady && (
                <button className="btn btn-primary waves-effect waves-light" onClick={this.logOut}>LOGOUT</button>)}
=======
                <button className="mainhomebtn" onClick={this.joinMember}>JOIN</button>)}
            {this.state.userReady && (
                <button className="mainhomebtn" onClick={()=>window.location.replace('/mypage-board')}>{currentUser.id}님의 my page</button>)}
            {this.state.userReady && (
                <button className="mainhomebtn" onClick={()=>window.location.replace('/cart-board')}>CART</button>)}
            {!this.state.userReady && (
                <button className="mainhomebtn" onClick={this.openModal}>LOGIN</button>)}
            {this.state.userReady && (
                <button className="mainhomebtn" onClick={this.logOut}>LOGOUT</button>)}
>>>>>>> 8c4fad14df0e9bbeb576640f19a25503ec180052
              

            <SignIn isOpen={this.state.isModalOpen} close={this.closeModal} />
			</div>
			<div className="text-center">
<<<<<<< HEAD
				<h1 className="page-title" onClick = {this.goToList}>DZBZ</h1>
            <div id="adv-search" className="input-group">
				<form id="searchForm" style={{display:'inline-block'}} role="form">
					<div className="form-group" style={{display:'inline-block'}}>
						<input id="searchBar" type="text" value={this.state.searchKeyword} name="searchKeyword" onChange={this.changeKeywordHandler} className="form-control" style={{width:"400px", border:'none'}} placeholder="DZBZ 상품 검색"/>
					</div>
                    <div className="form-group" style={{display:'inline-block'}}>
					    <button onClick = {() => this.searchBoard(this.state.searchType, this.state.searchKeyword)} className="form-control" style={{background: "#1d84df", height:'42px'}}><span style={{color: "#ffffff"}} className="glyphicon glyphicon-search" aria-hidden="true"></span></button>
=======
				<h1 style={{fontSize:'30px'}}className="page-title" onClick = {this.goToList}><i class="fa fa-home"></i>&nbsp;DZBZ&nbsp;<i class="fa fa-home fa-flip-vertical"></i></h1>
            <div id="adv-search" className="input-group">
				<form id="searchForm" style={{display:'inline-block'}} role="form">
					<div className="form-group" style={{display:'inline-block'}}>
						<input id="searchBar" type="text" value={this.state.searchKeyword} name="searchKeyword" onChange={this.changeKeywordHandler} className="form-control" style={{width:"450px", border:'none', border:'2px solid #2D6C4A'}} placeholder="DZBZ 통합 검색"/>
					</div>
                    <div className="form-group" style={{display:'inline-block'}}>
<<<<<<< HEAD
					    <button onClick = {() => this.searchBoard(this.state.searchType, this.state.searchKeyword)} className="form-control" style={{background: "#2D6C4A", height:'46px', border:'2px solid #2D6C4A'}}><span style={{color: "#ffffff"}} className="glyphicon glyphicon-search" aria-hidden="true"></span></button>
>>>>>>> 8c4fad14df0e9bbeb576640f19a25503ec180052
=======
					    <button onClick = {this.searchBoard} className="form-control" style={{background: "#2D6C4A", height:'46px', border:'2px solid #2D6C4A'}}><span style={{color: "#ffffff"}} className="glyphicon glyphicon-search" aria-hidden="true"></span></button>
>>>>>>> 840d536be0884e6bfa08aa4a31f86075ebfcd1a6
                    </div>          
                </form>
	        </div>
			</div>

        
		</div>
        );
    }
}

export default withRouter(HeaderComponent);