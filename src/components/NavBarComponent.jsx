import React, { Component } from 'react';
import {Nav} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import CategoryService from '../service/CategoryService';
import MemberService from '../service/MemberService';

class NavBarComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            bed_categories: [],
            kitchen_categories: [],
            library_categories: [],
            livingroom_categories: [],
            storage_categories: [],
            currentUser: { username: "" }

        }
        this.myFunction = this.myFunction.bind(this);

    }

    
    componentDidMount() {
        const currentUser = MemberService.getCurrentUser();
        
        if (!currentUser){
            this.setState({ currentUser: "guest", userReady: false });
        }
        else{
            this.setState({ currentUser: currentUser, userReady: true });
        } 


        // 스크롤 이벤트 적용
        window.addEventListener('scroll', this.myFunction);

        CategoryService.getCategory().then((res) => { //큰 카테고리 목록 뽑아오기
            this.setState({ 
              categories: res.data});
        });
        CategoryService.getBedCategory().then((res) => { //큰 카테고리 목록 뽑아오기
            this.setState({ 
              bed_categories: res.data});
        });
        CategoryService.getKitchenCategory().then((res) => { //큰 카테고리 목록 뽑아오기
            this.setState({ 
              kitchen_categories: res.data});
        });
        CategoryService.getLibraryCategory().then((res) => { //큰 카테고리 목록 뽑아오기
            this.setState({ 
              library_categories: res.data});
        });
        CategoryService.getStorageCategory().then((res) => { //큰 카테고리 목록 뽑아오기
            this.setState({ 
              storage_categories: res.data});
        });
        CategoryService.getLivingroomCategory().then((res) => { //큰 카테고리 목록 뽑아오기
            this.setState({ 
              livingroom_categories: res.data});
        });
    }
   

    // Get the navbar
    // Get the offset position of the navbar
    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    myFunction () {
        var navbar = document.getElementById("navbar");
        if (window.pageYOffset >= 190) {
            navbar.classList.add("sticky");
        } 
        else {
            navbar.classList.remove("sticky");
        }
    }

    isLogin = (event) => {
        const { currentUser } = this.state;
        if(currentUser.username == "guest"){ // 안했으면 alert창 띄워서 로그인 시키기
            window.confirm("로그인 후 이용해주세요.\n");
            this.props.history.push('/main-board');
        }
        else{ // 로그인 했으면 return true;
            return true;
        }   
    }

    render() {
        return (
            <div id="navbar">
            <nav className="navbar navbar-light bg-light" style={{margin:'0px 0px 60px'}}>
                <div className="justify-content-start mr-auto">
                    <a className="navbar-brand" style={{margin:'0px', fontSize:'20px'}}>Shopping&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</a>
                    
                    {
                        this.state.categories.map(
                        category =>
                        <div className="dropdown" key = {category.cateNo} style={{display:'inline', float:'left'}}> 
                            <button className="dropbtn" onClick={()=>this.props.history.push(`/category-board?cateNo=`+category.cateNo)} >
                                {category.cateNo}
                            </button>
                            <div className="dropdown-content" style={{left:'0'}}>
                            {category.cateNo == "거실가구" && this.state.livingroom_categories.map(
                                    livingroom_category => 
                                    <a href={`/menu-board?cateNo=거실가구&thisCateNo=`+livingroom_category.thisCateNo} style={{display:'inline-block', padding:'14px 20px 0px 20px', color:'black'}} key = {livingroom_category.cateNo, livingroom_category.thisCateNo}>
                                        {livingroom_category.thisCateNo}
                                    </a>                      
                                )}

                                {category.cateNo == "서재/사무용가구" && this.state.library_categories.map(
                                    library_category => 
                                    <a href={`/menu-board?cateNo=서재/사무용가구&thisCateNo=`+library_category.thisCateNo} style={{display:'inline-block', padding:'14px 20px 0px 20px', color:'black'}} key = {library_category.cateNo, library_category.thisCateNo}>
                                        {library_category.thisCateNo}
                                    </a>                       
                                )}

                                {category.cateNo == "수납가구" && this.state.storage_categories.map(
                                    storage_category => 
                                    <a href={`/menu-board?cateNo=수납가구&thisCateNo=`+storage_category.thisCateNo} style={{display:'inline-block', padding:'14px 20px 0px 20px', color:'black'}} key = {storage_category.cateNo, storage_category.thisCateNo}>
                                        {storage_category.thisCateNo}
                                    </a>                       
                                )}

                                {category.cateNo == "주방가구" && this.state.kitchen_categories.map(
                                    kitchen_category => 
                                    <a href={`/menu-board?cateNo=주방가구&thisCateNo=`+kitchen_category.thisCateNo} style={{display:'inline-block', padding:'14px 20px 0px 20px', color:'black'}} key = {kitchen_category.cateNo, kitchen_category.thisCateNo}>
                                        {kitchen_category.thisCateNo}
                                    </a>                      
                                )}

                                {category.cateNo == "침실가구" && this.state.bed_categories.map(
                                    bed_category => 
                                    <a href={`/menu-board?cateNo=침실가구&thisCateNo=`+bed_category.thisCateNo} style={{display:'inline-block', padding:'14px 20px 0px 20px', color:'black'}} key = {bed_category.cateNo, bed_category.thisCateNo}>
                                        {bed_category.thisCateNo}
                                    </a>                      
                                )}
                            </div>
                          </div>                                            
                            )
                    }
                    
                </div>

                <div className="justify-content-start ml-auto">
                    <a className="navbar-brand" style={{margin:'0px', fontSize:'20px'}}>Community&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</a>
                    <button onClick={()=>this.props.history.push('/qna-board')} className="mybtn" id="qnabtn">Q&amp;A Community</button>
                    <button onClick={()=>this.props.history.push('/photo-board')} className="mybtn" id="photobtn">Photo Community</button>
                </div>
            </nav>
            </div>
        );
    }
}

export default withRouter(NavBarComponent);