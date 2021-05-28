import React, { Component } from 'react';
import queryString from 'query-string';
import ItemService from '../service/ItemService';

class MenuBoardComponent extends Component {
    constructor(props) {
        const query = queryString.parse(window.location.search);

        super(props)
        this.state = {
            cateNo: query.cateNo,
            subcateNo: query.subcateNo,
            items: []
        }
    }

    componentDidMount() {
        ItemService.getCertainItems(this.state.cateNo, this.state.subcateNo).then((res) => {
            this.setState({items: res.data});
        });

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

    render() {
        return (
            <div className="main-content"> 
                <div className="row row-inline-block small-spacing">
				<div className="col-xs-12">                   
				<div className="box-content">


                <div className="album py-5">
                <div className="container">

                <div style={{fontSize:'larger', fontWeight:'bolder'}}>Category&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<span className="categoryDiv" onClick={()=>this.props.history.push(`/category-board?cateNo=`+this.state.cateNo)}>{this.state.cateNo}</span>
                &nbsp;&nbsp;&gt;&nbsp;&nbsp;<span className="categoryDiv" onClick={()=>this.props.history.push(`/menu-board?cateNo=`+this.state.cateNo+`&subcateNo=`+this.state.subcateNo)}>{this.state.subcateNo}</span></div>
                <br/>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
                    {
                        this.state.items.map(
                            item => 
                            <div style={{paddingBottom:'2em'}} key = {item.pdNo} className="col">
                                <div style={{paddingBottom: '2em'}} onClick={()=>this.readItem(item.pdNo, item.cateNo, item.subcateNo)}>
                                <div className="menucropping">
                                    <img src={item.pdImg}/>
                                </div>
                                <div className="card-body">
                                    <small className="card-text" style={{fontSize:'12px'}}>{item.pdMall}</small>
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