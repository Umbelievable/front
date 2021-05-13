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
        // DZBZ 통합 검색
        var searchBar = document.getElementById("searchBar");
        searchBar.placeholder="DZBZ 통합 검색";
        
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
            <div className="main-content">
                <div className="row row-inline-block small-spacing">
               <div className="col-xs-12">
               <div className="box-content">
  
                    <button type="button" className="btn btn-xl btn-circle" style={{height:'100px', width:'100px', display:'inline'}}><i style={{fontSize:'50px'}} className="glyphicon glyphicon-user" aria-hidden="true"></i></button>
                        <div style={{display:'inline', marginLeft:'40px', fontWeight:'bolder', fontSize:'20px'}}>{this.state.currentUser.username}</div>
                        <a style={{display:'inline', marginLeft:'40px'}} href="/">회원 정보 수정</a>
                        <br/><br/>
                        
                        <table className="table table-hover" style={{width:'500px'}}>
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
                        <br/><br/><br/><br/>
                        <div style={{fontWeight:'bolder', textAlign:'center'}}>관심 해시태그</div>
                            <br/>
                            <div className="hashtag">#&nbsp;침대</div>
                            <div className="hashtag">#&nbsp;엔틱</div>
                            <div className="hashtag">#&nbsp;카펫</div>
                        <br/><br/>

                        <ColoredLine color="lightgray" />
                        
                        <br/><br/>
                        <br/><br/>

                       
                        
                        <div className="table-responsive clearfix">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th colSpan='2' style={{width:'100%'}}>좋아요 목록</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{pointerEvents: 'none'}}>
                                        <td>
                                            <div className="col-sm-3" style={{padding:'1em 0em 1em 1em'}}>
                                                <img className="ordercropping" src="http://cdn.011st.com/11dims/resize/600x600/quality/75/11src/pd/17/8/4/3/3/2/4/XaCvd/10843324_B.jpg"/>
                                            </div>
                                            <div className="col-sm-6" style={{padding:'1em 0em', textAlign:'left'}}>
                                                <div style={{ fontWeight:'bolder', fontSize:'small', color:'gray'}}>회사이름 어쩌구저쩌구 쫌 길수도</div>
                                                <div style={{ paddingTop:'5px', paddingBottom:'10px', fontSize:'large', color:'black'}}>가구이름 더길수도있음 뫄뫄가구솨솨가구</div>
                                                
                                            </div>
                                        </td>
                                        
                                        <td>
                                            <div className="col-sm-3" style={{padding:'1em 0em 1em 1em'}}>
                                                <img className="ordercropping" src="http://cdn.011st.com/11dims/resize/600x600/quality/75/11src/pd/17/8/4/3/3/2/4/XaCvd/10843324_B.jpg"/>
                                            </div>
                                            <div className="col-sm-6" style={{padding:'1em 0em', textAlign:'left'}}>
                                                <div style={{ fontWeight:'bolder', fontSize:'small', color:'gray'}}>회사이름 어쩌구저쩌구 쫌 길수도</div>
                                                <div style={{ paddingTop:'5px', paddingBottom:'10px', fontSize:'large', color:'black'}}>가구이름 더길수도있음 뫄뫄가구솨솨가구</div>
                                                
                                            </div>
                                        </td>
                                    </tr>

                                    
                                </tbody>
                            </table>
                            
                        </div>

                        <ColoredLine color="lightgray" />

                        

               </div>
               </div>
               </div>
            </div>
        );
    }
}

export default withRouter(MyPageBoardComponent);