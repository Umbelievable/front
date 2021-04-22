import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MemberService from '../service/MemberService';

class MyPageBoardComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: { username: "" }
        }
    }

    componentDidMount() {
        const currentUser = MemberService.getCurrentUser();
        this.setState({ currentUser: currentUser, userReady: true });
        
    }

    
    render() {
        const ColoredLine = ({ color }) => (
            <hr
                style={{
                    color: color,
                    backgroundColor: color,
                    height: 1
                }}
            />
        );
        return (
            <div class="main-content">
                <div class="row row-inline-block small-spacing">
               <div class="col-xs-12">
               <div class="box-content">
               <div class="clearfix"><h4 class="box-title pull-left"></h4></div>
                    <button type="button" class="btn btn-xl btn-circle" style={{height:'100px', width:'100px', display:'inline'}}><i style={{fontSize:'50px'}} class="glyphicon glyphicon-user" aria-hidden="true"></i></button>
                        <div style={{display:'inline', marginLeft:'40px', fontWeight:'bolder', fontSize:'20px'}}>{this.state.currentUser.username}</div>
                        <a style={{display:'inline', marginLeft:'40px'}} href="/">회원 정보 수정</a>
                        <br/><br/>
                        
                        <table class="table table-hover" style={{width:'500px'}}>
                            <thead>
                                <tr>
                                    <th>&nbsp;&nbsp;&nbsp;&nbsp;알림</th>
                                    <th>주문 내역</th>
                                    <th>작성글</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>2</td>
                                    <td>3</td>
                                </tr>
                            </tbody>
                        </table>

                        <br/><br/>
                        <div style={{fontWeight:'bolder'}}>관심 해시태그</div>
                            <br/>
                            <div className="hashtag">#&nbsp;침대</div>
                            <div className="hashtag">#&nbsp;엔틱</div>
                            <div className="hashtag">#&nbsp;카펫</div>
                        <br/><br/>

                        <ColoredLine color="lightgray" />
                        
                        <br/><br/>
                        <div style={{fontWeight:'bolder'}}>좋아요 목록</div>
                            <br/><br/>

                        <ColoredLine color="lightgray" />

                        

               </div>
               </div>
               </div>
            </div>
        );
    }
}

export default withRouter(MyPageBoardComponent);