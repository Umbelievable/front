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

    readItem(pdNo, cateNo, subcateNo) {
        window.location.replace(`/read-item?pdNo=${pdNo}&cateNo=${cateNo}&subcateNo=${subcateNo}`);
    }

    deleteLike(pdNo, cateNo, subcateNo) {
        const likeItem = this.state.likes;
            for(var i=0; i<likeItem.length; i++){
                if((likeItem[i].pdNo == pdNo) && (likeItem[i].categoryNo == cateNo) && (likeItem[i].subcateNo == subcateNo)) {
                    LikeService.deleteLikeItem(likeItem[i].likeNo).then(res => {
                        alert('관심상품 목록에서 삭제했습니다.');
                        window.location.replace('/mypage-board');
                    });
                }
            }
    }


    tableINFO() {
        var forArray = [];
        const data = this.state.itemList;
        
        var i = 0;

        while(i<data.length){
            if(data[i] && data[i+1] && data[i+2]){
                const data0 = data[i]; const data1 = data[i+1]; const data2 = data[i+2];
                forArray.push(
                    <tr>
                        <td className="likeList">
                            <div onClick={()=> this.readItem(data0.pdNo, data0.cateNo, data0.subcateNo)}>
                                <div className="col-sm-3" style={{padding:'1em 0em 1em 1em'}}>
                                    <img className="ordercropping" src={data[i].pdImg}/>
                                </div>
                                <div className="col-sm-6" style={{padding:'1em 0em', textAlign:'left'}}>
                                    <div className="likeMall">{data[i].pdMall}</div>
                                    <div className="likeTitle">{data[i].pdTitle}</div>                
                                </div>
                            </div>
                            <div className="col-sm-1" className="likeDel">
                                <button className="likeDelBtn" onClick={()=> this.deleteLike(data0.pdNo, data0.cateNo, data0.subcateNo)}>x</button>        
                            </div>
                        </td>
                        <td className="likeList">
                            <div onClick={()=> this.readItem(data1.pdNo, data1.cateNo, data1.subcateNo)}>
                                <div className="col-sm-3" style={{padding:'1em 0em 1em 1em'}}>
                                    <img className="ordercropping" src={data[i+1].pdImg}/>
                                </div>
                                <div className="col-sm-6" style={{padding:'1em 0em', textAlign:'left'}}>
                                    <div className="likeMall">{data[i+1].pdMall}</div>
                                    <div className="likeTitle">{data[i+1].pdTitle}</div>                
                                </div>
                            </div>
                            <div className="col-sm-1" className="likeDel">
                                <button className="likeDelBtn" onClick={()=> this.deleteLike(data1.pdNo, data1.cateNo, data1.subcateNo)}>x</button>        
                            </div>
                        </td>
                        <td className="likeList">
                            <div onClick={()=> this.readItem(data2.pdNo, data2.cateNo, data2.subcateNo)}>
                                <div className="col-sm-3" style={{padding:'1em 0em 1em 1em'}}>
                                    <img className="ordercropping" src={data[i+2].pdImg}/>
                                </div>
                                <div className="col-sm-6" style={{padding:'1em 0em', textAlign:'left'}}>
                                    <div className="likeMall">{data[i+2].pdMall}</div>
                                    <div className="likeTitle">{data[i+2].pdTitle}</div>                
                                </div>
                            </div>
                            <div className="col-sm-1" className="likeDel">
                                <button className="likeDelBtn" onClick={()=> this.deleteLike(data2.pdNo, data2.cateNo, data2.subcateNo)}>x</button>        
                            </div>
                        </td>
                    </tr>
                );
            }
            else if(data[i] && data[i+1] && !data[i+2]){
                const data0 = data[i]; const data1 = data[i+1];
                forArray.push(
                    <tr>
                        <td className="likeList">
                            <div onClick={()=> this.readItem(data0.pdNo, data0.cateNo, data0.subcateNo)}>
                                <div className="col-sm-3" style={{padding:'1em 0em 1em 1em'}}>
                                    <img className="ordercropping" src={data[i].pdImg}/>
                                </div>
                                <div className="col-sm-6" style={{padding:'1em 0em', textAlign:'left'}}>
                                    <div className="likeMall">{data[i].pdMall}</div>
                                    <div className="likeTitle">{data[i].pdTitle}</div>                
                                </div>
                            </div>
                            <div className="col-sm-1" className="likeDel">
                                <button className="likeDelBtn" onClick={()=> this.deleteLike(data0.pdNo, data0.cateNo, data0.subcateNo)}>x</button>        
                            </div>
                        </td>
                        <td className="likeList">
                            <div onClick={()=> this.readItem(data1.pdNo, data1.cateNo, data1.subcateNo)}>
                                <div className="col-sm-3" style={{padding:'1em 0em 1em 1em'}}>
                                    <img className="ordercropping" src={data[i+1].pdImg}/>
                                </div>
                                <div className="col-sm-6" style={{padding:'1em 0em', textAlign:'left'}}>
                                    <div className="likeMall">{data[i+1].pdMall}</div>
                                    <div className="likeTitle">{data[i+1].pdTitle}</div>                
                                </div>
                            </div>
                            <div className="col-sm-1" className="likeDel">
                                <button className="likeDelBtn" onClick={()=> this.deleteLike(data1.pdNo, data1.cateNo, data1.subcateNo)}>x</button>        
                            </div>
                        </td>
                        <td className="likeList"/>
                    </tr>
                );
            }
            else if(data[i] && !data[i+1] && !data[i+2]){
                const data0 = data[i];
                forArray.push(
                    <tr>
                        <td className="likeList">
                            <div onClick={()=> this.readItem(data0.pdNo, data0.cateNo, data0.subcateNo)}>
                                <div className="col-sm-3" style={{padding:'1em 0em 1em 1em'}}>
                                    <img className="ordercropping" src={data[i].pdImg}/>
                                </div>
                                <div className="col-sm-6" style={{padding:'1em 0em', textAlign:'left'}}>
                                    <div className="likeMall">{data[i].pdMall}</div>
                                    <div className="likeTitle">{data[i].pdTitle}</div>                
                                </div>
                            </div>
                            <div className="col-sm-1" className="likeDel">
                                <button className="likeDelBtn" onClick={()=> this.deleteLike(data0.pdNo, data0.cateNo, data0.subcateNo)}>x</button>        
                            </div>
                        </td>
                        <td className="likeList"/>
                        <td className="likeList"/>
                    </tr>
                );
            }
            i=i+3;
        }
        return forArray;
    }

    render() {
        
        return (
            <div className="main-content">
                <div className="row row-inline-block small-spacing">
<<<<<<< HEAD
               <div className="col-xs-12">
               <div className="box-content">
<<<<<<< HEAD
               <div className="clearfix"><h4 className="box-title pull-left"></h4></div>
=======
  
>>>>>>> 8c4fad14df0e9bbeb576640f19a25503ec180052
                    <button type="button" className="btn btn-xl btn-circle" style={{height:'100px', width:'100px', display:'inline'}}><i style={{fontSize:'50px'}} className="glyphicon glyphicon-user" aria-hidden="true"></i></button>
                        <div style={{display:'inline', marginLeft:'40px', fontWeight:'bolder', fontSize:'20px'}}>{this.state.currentUser.username}</div>
                        <a style={{display:'inline', marginLeft:'40px'}} href="/">회원 정보 수정</a>
                        <br/><br/>
=======
                <div className="col-xs-12">
                <div className="box-content">

                <div className="row row-cols-1 row-cols-sm-2 g-2">
                
                    <div style={{padding:'2em 3em', marginTop:'1em', borderRight:'1px solid gray'}}>
                        <button className="btn btn-xl btn-circle" style={{height:'100px', width:'100px', display:'inline'}}><i style={{fontSize:'50px'}} className="glyphicon glyphicon-user" aria-hidden="true"></i></button>
                        <div style={{display:'inline', marginLeft:'1em', fontWeight:'bolder', fontSize:'20px'}}>{this.state.currentUser.id}</div>
                        <a style={{display:'inline', marginLeft:'2em'}} href="/">회원 정보 수정</a>
                        <br/><br/><br/>
>>>>>>> 840d536be0884e6bfa08aa4a31f86075ebfcd1a6
                        
                        <table className="table">
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
                    </div>
                    <div style={{padding:'3em 5em', textAlign:'center'}}>
                        <div style={{fontWeight:'bolder', textAlign:'center', fontSize:'20px'}}>{this.state.currentUser.id}님의 관심 해시태그</div>
                        <br/><br/><br/>
                        <div className="hashtag">#&nbsp;침대</div>
                        <div className="hashtag">#&nbsp;엔틱</div>
                        <div className="hashtag">#&nbsp;카펫</div>
                   
                    </div>
                </div>

<<<<<<< HEAD
                        <br/><br/>
<<<<<<< HEAD
=======
                        <br/><br/><br/><br/>
>>>>>>> 8c4fad14df0e9bbeb576640f19a25503ec180052
                        <div style={{fontWeight:'bolder'}}>관심 해시태그</div>
                            <br/>
                            <div className="hashtag">#&nbsp;침대</div>
                            <div className="hashtag">#&nbsp;엔틱</div>
                            <div className="hashtag">#&nbsp;카펫</div>
                        <br/><br/>

                        <ColoredLine color="lightgray" />
                        
                        <br/><br/>
<<<<<<< HEAD
                        <div style={{fontWeight:'bolder'}}>좋아요 목록</div>
                            <br/><br/>
=======
                        <br/><br/>

                        <div style={{fontWeight:'bolder'}}>좋아요 목록</div>
                        
                        <br/><br/>
                        <br/><br/>
>>>>>>> 8c4fad14df0e9bbeb576640f19a25503ec180052

                        <ColoredLine color="lightgray" />

                        
=======
                <br/><br/>
                <div className="table-responsive clearfix">
                    <table className="table">
                        <thead>
                            <tr>
                                <th colSpan='3' style={{width:'100%'}}>관심있는 상품</th>            
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.tableINFO()
                            }
                        </tbody>
                    </table>
                </div>        
   
>>>>>>> 840d536be0884e6bfa08aa4a31f86075ebfcd1a6

               </div>
               </div>
               </div>
            </div>
        );
    }
}

export default withRouter(MyPageBoardComponent);