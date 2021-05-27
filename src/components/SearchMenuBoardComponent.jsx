import React, { Component } from 'react';
import ItemService from '../service/ItemService';
import queryString from 'query-string';


class SearchMenuBoardComponent extends Component {
    
    constructor(props) {
        const query = queryString.parse(window.location.search);

        super(props)
        this.state = { 
            searchKeyword: query.searchKeyword,
            cateNo: query.cateNo,
            subcateNo: query.subcateNo,
            items: []
        }
        this.changeKeywordHandler = this.changeKeywordHandler.bind(this);	
    }

    changeKeywordHandler = (event) => {
        this.setState({searchKeyword: event.target.value});
    }
   
    componentDidMount() { 
        ItemService.searchCateItems(this.state.searchKeyword, this.state.cateNo, this.state.subcateNo).then((res) => {
            this.setState({items: res.data});
        });

        // 소카테고리 검색
        var searchBar = document.getElementById("searchBar");
        searchBar.placeholder = this.state.subcateNo+" 상품 검색";
    }

    readItem(pdNo, cateNo, subcateNo) { 
        this.props.history.push(`/read-item?pdNo=${pdNo}&cateNo=${cateNo}&subcateNo=${subcateNo}`);
    }

    render() {
        return (
            <div className="main-content">
                <div className="row row-inline-block small-spacing">
				<div className="col-xs-12">
				<div className="box-content">

                <div style={{textAlign:'center', fontSize:'larger'}}><span style={{color: 'black'}} className="glyphicon glyphicon-search" aria-hidden="true"></span><b>&nbsp;"{this.state.searchKeyword}"</b>&nbsp;검색 결과</div>

                <div className="album py-5">
                <div className="container">

                <div style={{fontSize:'larger'}}>Category&nbsp;&nbsp;|&nbsp;&nbsp;<span onClick={()=>this.props.history.push(`/category-board?cateNo=`+this.state.cateNo)}>{this.state.cateNo}</span>
                &nbsp;&nbsp;&gt;&nbsp;&nbsp;<span onClick={()=>this.props.history.push(`/menu-board?cateNo=`+this.state.cateNo+`&subcateNo=`+this.state.subcateNo)}>{this.state.subcateNo}</span></div>
                <br/><br/>

                    
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
                    {
                        this.state.items.map(
                            item => 
                            <div style={{paddingBottom:'2em'}} key = {item.pdNo, item.cateNo, item.subcateNo} className="col">
                                <div style={{paddingBottom: '2em'}} onClick={()=>this.readItem(item.pdNo, item.cateNo, item.subcateNo)}>
                                <div className="menucropping">
                                    <img src={item.pdImg}/>
                                </div>
                                <div className="card-body">
                                    <small className="card-text" style={{fontSize:'11px'}}>{item.pdMall}</small>
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

export default SearchMenuBoardComponent;