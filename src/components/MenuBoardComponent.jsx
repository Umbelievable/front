import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import ItemService from '../service/ItemService';

class MenuBoardComponent extends Component {
    constructor(props) {
        const query = queryString.parse(window.location.search);

        super(props)
        this.state = {
            cateNo: query.cateNo,
            thisCateNo: query.thisCateNo,
            items: []
        }
    }

     // BoardService는 페이지만 넣었지만 
     // 아이템은 cateNo랑 thisCateNO도 넣어야함
     // 추후 수정

    componentDidMount() {
        ItemService.getCertainItems(this.state.cateNo, this.state.thisCateNo).then((res) => {
            this.setState({items: res.data});
        });

    }

    readItem(pdNo,cateNo,thisCateNo) { 
        this.props.history.push(`/read-item?pdNo=${pdNo}&cateNo=${cateNo}&thisCateNo=${thisCateNo}`);
    }

    render() {
        return (
            <div class="main-content"> 
                <div class="row row-inline-block small-spacing">
				<div class="col-xs-12">                   
				<div class="box-content">
				<div class="clearfix"><h4 class="box-title pull-left"></h4></div>

                <div class="album py-5 bg-light">
                <div class="container">

                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {
                        this.state.items.map(
                            item => 
                            <div key = {item.pdNo, item.cateNo, item.thisCateNo} class="col">
                                <div class="card shadow-sm" onClick={()=>this.readItem(item.pdNo,item.cateNo,item.thisCateNo)}>
                                <div class="cropping">
                                    <img src={item.pdImg} />
                                </div>
                                <div class="card-body">
                                    <p class="card-text">{item.pdTitle}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <small class="text-muted">{item.pdPrice}</small>
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

export default withRouter(MenuBoardComponent);