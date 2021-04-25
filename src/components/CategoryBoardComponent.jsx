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

    readItem(pdNo, cateNo, thisCateNo) { 
        this.props.history.push(`/read-item?pdNo=${pdNo}&cateNo=${cateNo}&thisCateNo=${thisCateNo}`);
    }

  
    render() {
        return (
            <div className="main-content"> 
                <div className="row row-inline-block small-spacing">
				<div className="col-xs-12">                   
				<div className="box-content">
				<div className="clearfix"><h4 className="box-title pull-left"></h4></div>

                <div className="album py-5 bg-light">
                <div className="container">

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {
                        this.state.items.map(
                            item => 
                            <div key = {item.pdNo, item.cateNo, item.thisCateNo} className="col">
                                <div className="card shadow-sm" onClick={()=>this.readItem(item.pdNo, item.cateNo, item.thisCateNo)}>
                                <div className="cropping">
                                    <img src={item.pdImg}/>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">{item.pdTitle}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <small className="text-muted">{item.pdPrice}</small>
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