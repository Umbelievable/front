import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MemberService from '../service/MemberService';
import LikeService from '../service/LikeService';
import ItemService from '../service/ItemService';

class MyPageBoardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: [],
            itemList: [],
            currentUser: { id: "" }
        }
    }

    componentDidMount() {
        const currentUser = MemberService.getCurrentUser();
        this.setState({ currentUser: currentUser, userReady: true });

        // DZBZ 통합 검색
        var searchBar = document.getElementById("searchBar");
        searchBar.placeholder="DZBZ 통합 검색";
        
        LikeService.getLikelist(MemberService.getCurrentUser().id).then((res) => { // 저렇게 넣어야 안꼬임
            this.setState({likes: res.data});
            for(var i=0; i<res.data.length; i++){
                ItemService.getCertainItem(res.data[i].pdNo, res.data[i].categoryNo, res.data[i].subcateNo).then( resul => {
                    this.setState({itemList: this.state.itemList.concat(resul.data)});
                });
            }
        });
        
        
    }

    tableINFO() {
        var forArray = [];
        var data = this.state.itemList;
        var i = 0;

        while(i<data.length){
            if(data[i] && data[i+1] && data[i+2]){
                forArray.push(
                    <tr style={{pointerEvents: 'none'}}>
                        <td style={{width:'33%'}}>
                            <div className="col-sm-3" style={{padding:'1em 0em 1em 1em'}}>
                                <img className="ordercropping" src={data[i].pdImg}/>
                            </div>
                            <div className="col-sm-6" style={{padding:'1em 0em', textAlign:'left'}}>
                                <div style={{ fontWeight:'bolder', fontSize:'small', color:'gray'}}>{data[i].pdMall}</div>
                                <div style={{ fontWeight:'bolder', paddingTop:'5px', paddingBottom:'10px', fontSize:'15px', color:'black'}}>{data[i].pdTitle}</div>                
                            </div>
                        </td>
                        <td style={{width:'33%'}}>
                            <div className="col-sm-3" style={{padding:'1em 0em 1em 1em'}}>
                                <img className="ordercropping" src={data[i+1].pdImg}/>
                            </div>
                            <div className="col-sm-6" style={{padding:'1em 0em', textAlign:'left'}}>
                                <div style={{ fontWeight:'bolder', fontSize:'small', color:'gray'}}>{data[i+1].pdMall}</div>
                                <div style={{ fontWeight:'bolder', paddingTop:'5px', paddingBottom:'10px', fontSize:'15px', color:'black'}}>{data[i+1].pdTitle}</div>                
                            </div>
                        </td>
                        <td style={{width:'33%'}}>
                            <div className="col-sm-3" style={{padding:'1em 0em 1em 1em'}}>
                                <img className="ordercropping" src={data[i+2].pdImg}/>
                            </div>
                            <div className="col-sm-6" style={{padding:'1em 0em', textAlign:'left'}}>
                                <div style={{ fontWeight:'bolder', fontSize:'small', color:'gray'}}>{data[i+2].pdMall}</div>
                                <div style={{ fontWeight:'bolder', paddingTop:'5px', paddingBottom:'10px', fontSize:'15px', color:'black'}}>{data[i+2].pdTitle}</div>                
                            </div>
                        </td>
                    </tr>
                );
            }
            else if(data[i] && data[i+1] && !data[i+2]){
                forArray.push(
                    <tr style={{pointerEvents: 'none'}}>
                        <td style={{width:'33%'}}>
                            <div className="col-sm-3" style={{padding:'1em 0em 1em 1em'}}>
                                <img className="ordercropping" src={data[i].pdImg}/>
                            </div>
                            <div className="col-sm-6" style={{padding:'1em 0em', textAlign:'left'}}>
                                <div style={{ fontWeight:'bolder', fontSize:'small', color:'gray'}}>{data[i].pdMall}</div>
                                <div style={{ fontWeight:'bolder', paddingTop:'5px', paddingBottom:'10px', fontSize:'15px', color:'black'}}>{data[i].pdTitle}</div>                
                            </div>
                        </td>
                        <td style={{width:'33%'}}>
                            <div className="col-sm-3" style={{padding:'1em 0em 1em 1em'}}>
                                <img className="ordercropping" src={data[i+1].pdImg}/>
                            </div>
                            <div className="col-sm-6" style={{padding:'1em 0em', textAlign:'left'}}>
                                <div style={{ fontWeight:'bolder', fontSize:'small', color:'gray'}}>{data[i+1].pdMall}</div>
                                <div style={{ fontWeight:'bolder', paddingTop:'5px', paddingBottom:'10px', fontSize:'15px', color:'black'}}>{data[i+1].pdTitle}</div>                
                            </div>
                        </td>
                        <td style={{width:'33%'}}>
                        </td>
                    </tr>
                );
            }
            else if(data[i] && !data[i+1] && !data[i+2]){
                forArray.push(
                    <tr style={{pointerEvents: 'none'}}>
                        <td style={{width:'33%'}}>
                            <div className="col-sm-3" style={{padding:'1em 0em 1em 1em'}}>
                                <img className="ordercropping" src={data[i].pdImg}/>
                            </div>
                            <div className="col-sm-6" style={{padding:'1em 0em', textAlign:'left'}}>
                                <div style={{ fontWeight:'bolder', fontSize:'small', color:'gray'}}>{data[i].pdMall}</div>
                                <div style={{ fontWeight:'bolder', paddingTop:'5px', paddingBottom:'10px', fontSize:'15px', color:'black'}}>{data[i].pdTitle}</div>                
                            </div>
                        </td>
                        <td style={{width:'33%'}}>
                        </td>
                        <td style={{width:'33%'}}>
                        </td>
                    </tr>
                );
            }
            i=i+3;
        }
        return forArray;
    }

    render() {
        const ColoredLine = ({ color }) => (
            <hr style={{color: color, backgroundColor: color, height: 1}}/>
        );
        
        return (
            <div className="main-content">
                <div className="row row-inline-block small-spacing">
               <div className="col-xs-12">
               <div className="box-content">
  
                    <button type="button" className="btn btn-xl btn-circle" style={{height:'100px', width:'100px', display:'inline'}}><i style={{fontSize:'50px'}} className="glyphicon glyphicon-user" aria-hidden="true"></i></button>
                        <div style={{display:'inline', marginLeft:'40px', fontWeight:'bolder', fontSize:'20px'}}>{this.state.currentUser.id}</div>
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
                                        <th colSpan='3' style={{width:'100%'}}>좋아요 목록</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.tableINFO()
                                    }
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