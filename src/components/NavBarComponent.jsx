import React, { Component } from 'react';
import {Nav, Form, FormControl, Button, Modal, NavDropdown, Sidebar} from 'react-bootstrap';
import { Navbar } from 'rsuite';
import { withRouter } from 'react-router-dom';
import SignIn from "./SignIn";
import CategoryService from '../service/CategoryService';
import MemberService from '../service/MemberService';

class NavBarComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
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


        // 카테고리 눌렀을때 해당 카테고리 표시
        var header = document.getElementById("navbar");
        var btns = header.getElementsByClassName("mybtn");
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
            });
        }


        CategoryService.getCategory().then((res) => { //큰 카테고리 목록 뽑아오기
            this.setState({ 
              categories: res.data});
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
                <nav class="navbar navbar-dark bg-dark" style={{margin:"0px 0px 0px 0px"}}>
                <button  class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <button onClick={()=>this.props.history.push('/main-board')} class="mybtn active">Home</button>
                <button onClick={()=>this.props.history.push('/photo-board')} class="mybtn">Photo</button>
                <button onClick={()=>this.props.history.push('/qna-board')} class="mybtn">Q&amp;A</button>
                <button onClick={()=>this.props.history.push('/cs-board')} class="mybtn">Customer&nbsp;Service</button>

                </nav>
                <div class="collapse" id="navbarToggleExternalContent">
                    <div class="bg-dark p-4">                        
                    <Nav defaultActiveKey="/home" className="flex-column">
                    {
                        this.state.categories.map(
                        category => 
                            <li key = {category.category_no}>
                                <Nav.Link style={{display:'inline-block'},{padding:"14px 20px 0px 20px"}}  href={`/menu-board?`+category.category_no}>{category.category_no}</Nav.Link>
                                <div style={{display:'inline-block'},{padding:"14px 20px 0px 20px"}}>dddd</div>
                            </li>                      
                        )
                    }
                    </Nav>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(NavBarComponent);