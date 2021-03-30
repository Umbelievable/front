import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Navbar, Nav, Form, FormControl, Button, Modal, NavDropdown, Sidebar} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import SignIn from "./SignIn";
import CategoryService from '../service/CategoryService';

class NavBarComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: []

        }
        this.myFunction = this.myFunction.bind(this);
    }

    
    componentDidMount() {
        // 스크롤 이벤트 적용
        window.addEventListener('scroll', this.myFunction);

        CategoryService.getCategory().then((res) => {
            this.setState({ 
              categories: res.data});
        });
    }

    

    // Get the navbar
    // Get the offset position of the navbar
    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    myFunction () {
        var navbar = document.getElementById("navbar");
        if (window.pageYOffset >= 220) {
            navbar.classList.add("sticky");
        } 
        else {
            navbar.classList.remove("sticky");
        }
    }

    
 
    
    render() {
        return (
            <div id="navbar">
                <nav class="navbar navbar-dark bg-dark" style={{margin:"0px 0px 0px 0px"}}>
                <button  class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <a class="nav-link" href="/photo-board">Photo</a>
                <a class="nav-link" href="/qna-board">Q&amp;A</a>
                <a class="nav-link" href="/cs-board">Customer Service</a>

                </nav>
                <div class="collapse" id="navbarToggleExternalContent">
                    <div class="bg-dark p-4">                        
                    <Nav defaultActiveKey="/home" className="flex-column">
                    {
                        this.state.categories.map(
                        category => 
                            <li key = {category.category_no}>
                                <Nav.Link style={{display:'inline-block'},{padding:"14px 20px 0px 20px"}}  href={`/menu-board?`+category.url}>{category.category_no}</Nav.Link>
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