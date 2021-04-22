import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MainBoardComponent from './components/MainBoardComponent';
import ListBoardComponent from './components/ListBoardComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateBoardComponent from './components/CreateBoardComponent';
import ReadBoardComponent from './components/ReadBoardComponent';
import SearchBoardComponent from './components/SearchBoardComponent';
import JoinMemberComponent from './components/member/JoinMemberComponent';
import PhotoBoardComponent from './components/PhotoBoardComponent';
import AdminBoardComponent from './components/AdminBoardComponent';
import MenuBoardComponent from './components/MenuBoardComponent';
import NavBarComponent from './components/NavBarComponent';
import MyPageBoardComponent from './components/MyPageBoardComponent';
import CategoryBoardComponent from './components/CategoryBoardComponent';
import ReadPhotoBoardComponent from './components/ReadPhotoBoardComponent';
import CreatePhotoBoardComponent from './components/CreatePhotoBoardComponent';
import CustomerServiceBoardComponent from './components/CustomerServiceBoardComponent';


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
              <Route path = "/search-board" component = {SearchBoardComponent}></Route>
              <Route path = "/member-join" component = {JoinMemberComponent}></Route>
              <Route path = "/photo-board" component = {PhotoBoardComponent}></Route>
              <Route path = "/cs-board" component = {CustomerServiceBoardComponent}></Route>
              <Route path = "/admin-board" component = {AdminBoardComponent}></Route>
              <Route path = "/category-board" component = {CategoryBoardComponent}></Route>
              <Route path = "/menu-board" component = {MenuBoardComponent}></Route>
              <Route path = "/mypage-board" component = {MyPageBoardComponent}></Route>
              <Route path = "/read-photoboard/:pboardNo" component = {ReadPhotoBoardComponent}></Route>
              <Route path = "/create-photoboard/:pboardNo" component = {CreatePhotoBoardComponent}></Route>
              
              </Switch>
        <FooterComponent/>
      </Router>
    </div>
  );
}

export default App;