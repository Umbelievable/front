import React, { Component } from 'react';
import queryString from 'query-string';
import ItemService from '../service/ItemService';
import LikeService from '../service/LikeService';
import MemberService from '../service/MemberService';

class MenuBoardComponent extends Component {
    constructor(props) {
        const query = queryString.parse(window.location.search);

        super(props)
        this.state = {
            cateNo: query.cateNo,
            subcateNo: query.subcateNo,
            items: [],
            likes: []
        }
    }

    componentDidMount() {
        ItemService.getCertainItems(this.state.cateNo, this.state.subcateNo).then((res) => {
            this.setState({items: res.data});
        });

        if(MemberService.getCurrentUser()){
            LikeService.getLikelist(MemberService.getCurrentUser().id).then((res) => { // 좋아요 목록 가져와서
                this.setState({likes: res.data}); // 리스트에 넣고 
            });
        }

        if(sessionStorage.getItem("back") == true) { // 아이템 보다가 뒤로 온 상황이면 스크롤 유지하고
            window.scrollTo(0,sessionStorage.getItem("scrollPos"));
        }

        else { // 네비바로 들어온거면 처음부터 보여주기
            window.scrollTo(0,0);
        }
        
        // 소카테고리 검색
        var searchBar = document.getElementById("searchBar");
        searchBar.placeholder = this.state.subcateNo+" 상품 검색";        
    }

    readItem(pdNo, cateNo, subcateNo) { 
        sessionStorage.setItem("scrollPos", window.pageYOffset); // 상품 보러 들어갈 때 현재 위치 저장하고
        this.props.history.push(`/read-item?pdNo=${pdNo}&cateNo=${cateNo}&subcateNo=${subcateNo}`);
    }

    addOrDel(pdNO, cateNO, subcateNO){ // 일단 받고 추가할지 삭제할지 정하기
        if(MemberService.getCurrentUser()){
            LikeService.getLikelist(MemberService.getCurrentUser().id).then((res) => { // 좋아요 목록 가져와서
                for(var i=0;i<res.data.length; i++){
                    const likeno = res.data[i].likeNo;
                    const pdno = res.data[i].pdNo;
                    const cateno = res.data[i].categoryNo;
                    const subcateno = res.data[i].subcateNo;
                    if(pdNO == pdno && cateNO == cateno && subcateNO == subcateno){ // 이미 좋아요 목록에 추가된거라면 
                        LikeService.deleteLikeItem(likeno).then(resul => { //삭제하고
                            window.location.reload();
                        });
                    }
                }
                let item = { // 반복문 다 돌았는데도 없다 -> 이제 좋아요 추가 해야된다
                    userId: MemberService.getCurrentUser().id,
                    pdNo: pdNO,
                    subcateNo: subcateNO,
                    categoryNo: cateNO
                }; //json
                LikeService.createLikeItem(item).then(resul => { //넘기기
                    window.location.reload();
                });
                
            });
        }
    }

    render() {
        return (
            <div className="main-content"> 
                <div className="row row-inline-block small-spacing">
				<div className="col-xs-12">                   
				<div className="box-content">


                <div className="album py-5">
                <div className="container">

                <div style={{fontSize:'larger', fontFamily:'NanumSquareB'}}>Category&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<span className="categoryDiv" onClick={()=>this.props.history.push(`/category-board?cateNo=`+this.state.cateNo)}>{this.state.cateNo}</span>
                &nbsp;&nbsp;&gt;&nbsp;&nbsp;<span className="categoryDiv" onClick={()=>this.props.history.push(`/menu-board?cateNo=`+this.state.cateNo+`&subcateNo=`+this.state.subcateNo)}>{this.state.subcateNo}</span></div>
                <br/>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
                    {
                        this.state.items.map(
                            item => 
                            <div style={{paddingBottom:'2em'}} key = {item.pdNo} className="col">
                                <div style={{paddingBottom: '2em'}}>
                                <div className="menucropping">
                                    <img src={item.pdImg}  onClick={()=>this.readItem(item.pdNo, item.cateNo, item.subcateNo)}/>
                                    {
                                        (MemberService.getCurrentUser()) && this.state.likes.map( // 좋아요 한 아이템이면 꽉찬하트 // 꽉찬하트 눌렀을때 좋아요 목록 삭제하는 함수 호출
                                            like =>
                                            (like.pdNo == item.pdNo && like.categoryNo == item.cateNo && like.subcateNo == item.subcateNo) ? (
                                                <button className="heartBtn" onClick={()=>this.addOrDel(item.pdNo, item.cateNo, item.subcateNo)}><span className="glyphicon glyphicon-heart" aria-hidden="true"></span></button>
                                            ) : (
                                                <button className="heartBtn" onClick={()=>this.addOrDel(item.pdNo, item.cateNo, item.subcateNo)}><span className="glyphicon glyphicon-heart-empty" aria-hidden="true"></span></button>
                                            )
                                        )
                                    }
                                </div>
                                <div className="card-body" onClick={()=>this.readItem(item.pdNo, item.cateNo, item.subcateNo)}>
                                    <small className="card-text" style={{fontSize:'12px', fontWeight:'bold', color:'rgb(178, 178, 178)'}}>{item.pdMall}</small>
                                    <small className="card-text" style={{display:'block', fontWeight:'bold', fontSize:'13px', height:'62px'}}>{item.pdTitle}</small>
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="card-text" style={{fontWeight:'bolder', fontSize:'20px'}}>{item.pdPrice}</p>
                                </div>
                                </div>
                                </div>
                            </div>
                        )
                    }

                </div>
                </div>
                </div> 

                
                </div>
				</div>
				</div>
			</div>
        );
    }
}

export default MenuBoardComponent;