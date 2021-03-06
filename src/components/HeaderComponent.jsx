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
        if(!MemberService.getCurrentUser()){
            alert('로그인 후 이용 가능합니다.');
            this.openModal();
        }
        else{
            var searchBoardType = this.state.searchBoardType;
            var searchKeyword = this.state.searchKeyword;

            // searchBoard는 사용자 위치 반환      
            // qna에 있는지 // photo에 있는지 // main에서 전체 검색할건지(커뮤 두 개+아이템 전체) // 소카테고리(침실가구-침대) 들어가서 걔만 찾을건지 
            // 게시판 타입마다 렌더링 다르게 해줘야 하기 때문에 searchBoardComponent 여러개 구현

            if(searchBoardType=='/main-board' || searchBoardType=='/search-allboard'){
                window.location.href = `/search-allboard?searchKeyword=${searchKeyword}`;
            }
            if(searchBoardType=='/qna-board' || searchBoardType=='/search-board'){
                window.location.href = `/search-board?searchKeyword=${searchKeyword}`;
            }
            else if(searchBoardType=='/photo-board' || searchBoardType=='/search-photoboard'){
                window.location.href = `/search-photoboard?searchKeyword=${searchKeyword}`;
            }
            else if(searchBoardType=='/menu-board' || searchBoardType=='/search-menuboard'){ // subCate
                const params = new URLSearchParams(window.location.search);
                window.location.href = `/search-menuboard?searchKeyword=${searchKeyword}&cateNo=${params.get('cateNo')}&subcateNo=${params.get('subcateNo')}`;
            }
            else {
                window.location.href = `/search-allboard?searchKeyword=${searchKeyword}`;
            }
        }
        
    }

    goToList() {
        window.location.href='/main-board';
    }

    logOut() {
        MemberService.logout();
        window.location.href = '/main-board';
    }

    render() {
        const { currentUser } = this.state;

        return (
        <div className="fixed-navbar" style={{overflow:'hidden', height:'auto'}}>                          
            <div className="btn_wrap text-right">
                {!this.state.userReady && (
                    <button className="mainhomebtn" onClick={()=>window.location.href = '/member-join'}>JOIN</button>)}
                {this.state.userReady && (
                    <button className="mainhomebtn" onClick={()=>window.location.href = '/mypage-board'}>{currentUser.id}님의 my page</button>)}
                {this.state.userReady && (
                    <button className="mainhomebtn" onClick={()=>window.location.href = '/cart-board'}>CART</button>)}
                {!this.state.userReady && (
                    <button className="mainhomebtn" onClick={this.openModal}>LOGIN</button>)}
                {this.state.userReady && (
                    <button className="mainhomebtn" onClick={this.logOut}>LOGOUT</button>)}
                <SignIn isOpen={this.state.isModalOpen} close={this.closeModal} />
			</div>

			<div className="text-center">
				<div style={{verticalAlign:'middle', fontSize:'36px', color:'rgb(73,117,104)'}} onClick = {this.goToList}>
                    <img style={{width:'300px', height:'77px'}} src={process.env.PUBLIC_URL + '/res/resources/image/dzbzlogo.png'}/>
                </div><br/>
                <div id="adv-search" className="input-group">
                    <form id="searchForm" style={{display:'inline-block'}} role="form">
                        <div className="form-group" style={{display:'inline-block'}}>
                            <input id="searchBar" type="text" value={this.state.searchKeyword} name="searchKeyword" onChange={this.changeKeywordHandler} className="form-control" style={{width:"450px", border:'none', height:'46px', border:'2px solid rgb(73,117,104)', fontSize:'15px'}} placeholder="DZBZ 통합 검색"/>
                        </div>
                        <div className="form-group" style={{display:'inline-block'}}>
                            <button onClick = {this.searchBoard} className="form-control" style={{background: "rgb(73,117,104)", height:'46px', width:'46px', border:'2px solid rgb(73,117,104)'}}><span style={{color: "#ffffff", fontSize:'20px'}} className="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                        </div>          
                    </form>
                    <br/>
                </div>
			</div>
		</div>
        );
    }
}

export default withRouter(HeaderComponent);