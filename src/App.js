import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MainBoardComponent from './components/MainBoardComponent';
import ListBoardComponent from './components/ListBoardComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateBoardComponent from './components/CreateBoardComponent';
import ReadBoardComponent from './components/ReadBoardComponent';
import SearchBoardComponent from './components/SearchBoardComponent';
import SearchPhotoBoardComponent from './components/SearchPhotoBoardComponent';
import SearchMenuBoardComponent from './components/SearchMenuBoardComponent';
import SearchAllBoardComponent from './components/SearchAllBoardComponent';
import JoinMemberComponent from './components/member/JoinMemberComponent';
import UpdateMemberComponent from './components/member/UpdateMemberComponent';
import PhotoBoardComponent from './components/PhotoBoardComponent';
import AdminBoardComponent from './components/AdminBoardComponent';
import MenuBoardComponent from './components/MenuBoardComponent';
import NavBarComponent from './components/NavBarComponent';
import MyPageBoardComponent from './components/MyPageBoardComponent';
import MyPostBoardComponent from './components/MyPostBoardComponent';
import MyCommentBoardComponent from './components/MyCommentBoardComponent';
import CategoryBoardComponent from './components/CategoryBoardComponent';
import CustomerServiceBoardComponent from './components/CustomerServiceBoardComponent';
import ItemComponent from './components/ItemComponent';
import ReadPhotoBoardComponent from './components/ReadPhotoBoardComponent';
import CreatePhotoBoardComponent from './components/CreatePhotoBoardComponent';
import CartBoardComponent from './components/CartBoardComponent';
import OrderBoardComponent from './components/OrderBoardComponent';


function App() {
  return (
    <div> 
      <Router>
        <HeaderComponent/>
        <NavBarComponent/>
            <Switch>
              <Route path = "/" exact component = {MainBoardComponent}></Route>
              <Route path = "/main-board" exact component = {MainBoardComponent}></Route>

              <Route path = "/qna-board" component = {ListBoardComponent}></Route>
              <Route path = "/create-board/:qboardNo" component = {CreateBoardComponent}></Route>
              <Route path = "/read-board/:qboardNo" component = {ReadBoardComponent}></Route>

              <Route path = "/photo-board" component = {PhotoBoardComponent}></Route>
              <Route path = "/create-photoboard/:pboardNo" component = {CreatePhotoBoardComponent}></Route>
              <Route path = "/read-photoboard/:pboardNo" component = {ReadPhotoBoardComponent}></Route>

              <Route path = "/search-board" component = {SearchBoardComponent}></Route>
              <Route path = "/search-photoboard" component = {SearchPhotoBoardComponent}></Route>
              <Route path = "/search-menuboard" component = {SearchMenuBoardComponent}></Route>
              <Route path = "/search-allboard" component = {SearchAllBoardComponent}></Route>

              <Route path = "/category-board" component = {CategoryBoardComponent}></Route>
              <Route path = "/menu-board" component = {MenuBoardComponent}></Route>
              <Route path = "/read-item" component = {ItemComponent}></Route>

              <Route path = "/mypage-board" component = {MyPageBoardComponent}></Route>
              <Route path = "/order-board" component = {OrderBoardComponent}></Route>
              <Route path = "/mypost-board" component = {MyPostBoardComponent}></Route>
              <Route path = "/mycomment-board" component = {MyCommentBoardComponent}></Route>

              <Route path = "/cart-board" component = {CartBoardComponent}></Route>

              <Route path = "/member-join" component = {JoinMemberComponent}></Route>
              <Route path = "/member-update" component = {UpdateMemberComponent}></Route>
              <Route path = "/admin-board" component = {AdminBoardComponent}></Route>
              <Route path = "/cs-board" component = {CustomerServiceBoardComponent}></Route>
              
            
              </Switch>
        <FooterComponent/>
      </Router>
    </div>
  );
}

export default App;