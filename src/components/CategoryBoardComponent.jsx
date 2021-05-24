import React, { Component } from 'react';
import queryString from 'query-string';
import ItemService from '../service/ItemService';

class CategoryBoardComponent extends Component {
    constructor(props) {
        const query = queryString.parse(window.location.search);

        super(props)
        this.state = {
            cateNo: query.cateNo,
            items: []
        }
    }

    componentDidMount() {
        ItemService.getAllItems(this.state.cateNo).then((res) => {
            this.setState({items: res.data});
        }); 
     
    }

    readItem(pdNo, cateNo, subcateNo) { 
        window.location.replace(`/read-item?pdNo=${pdNo}&cateNo=${cateNo}&subcateNo=${subcateNo}`);
    }

  
    render() {
        return (
            <div className="main-content"> 
                <div className="row row-inline-block small-spacing">
				<div className="col-xs-12">                   
				<div className="box-content">

                <div className="album py-5">
                <div className="container">

                <div style={{fontSize:'larger', fontWeight:'bolder'}}>Category&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<span className="categoryDiv" onClick={()=>window.location.replace(`/category-board?cateNo=`+this.state.cateNo)}>{this.state.cateNo}</span></div>
                <br/>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
                    {
                        this.state.items.map(
                            item => 
                            <div style={{paddingBottom: '2em'}} key = {item.pdNo} className="col">
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

export default CategoryBoardComponent;