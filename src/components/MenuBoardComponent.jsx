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
<<<<<<< HEAD
            thisCateNo: query.thisCateNo,
=======
            subcateNo: query.subcateNo,
>>>>>>> 8c4fad14df0e9bbeb576640f19a25503ec180052
            items: []
        }
    }

    componentDidMount() {
<<<<<<< HEAD
        ItemService.getCertainItems(this.state.cateNo, this.state.thisCateNo).then((res) => {
=======
        ItemService.getCertainItems(this.state.cateNo, this.state.subcateNo).then((res) => {
>>>>>>> 8c4fad14df0e9bbeb576640f19a25503ec180052
            this.setState({items: res.data});
        });

    }

<<<<<<< HEAD
    readItem(pdNo, cateNo, thisCateNo) { 
        this.props.history.push(`/read-item?pdNo=${pdNo}&cateNo=${cateNo}&thisCateNo=${thisCateNo}`);
=======
    readItem(pdNo, cateNo, subcateNo) { 
        this.props.history.push(`/read-item?pdNo=${pdNo}&cateNo=${cateNo}&subcateNo=${subcateNo}`);
>>>>>>> 8c4fad14df0e9bbeb576640f19a25503ec180052
    }

    render() {
        return (
            <div className="main-content"> 
                <div className="row row-inline-block small-spacing">
				<div className="col-xs-12">                   
				<div className="box-content">
<<<<<<< HEAD
				<div className="clearfix"><h4 className="box-title pull-left"></h4></div>
=======

>>>>>>> 8c4fad14df0e9bbeb576640f19a25503ec180052

                <div className="album py-5 bg-white">
                <div className="container">

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
                    {
                        this.state.items.map(
                            item => 
<<<<<<< HEAD
                            <div style={{paddingBottom:'2em'}} key = {item.pdNo, item.cateNo, item.thisCateNo} className="col">
                                <div style={{paddingBottom: '2em'}} onClick={()=>this.readItem(item.pdNo, item.cateNo, item.thisCateNo)}>
=======
                            <div style={{paddingBottom:'2em'}} key = {item.pdNo, item.cateNo, item.subcateNo} className="col">
                                <div style={{paddingBottom: '2em'}} onClick={()=>this.readItem(item.pdNo, item.cateNo, item.subcateNo)}>
>>>>>>> 8c4fad14df0e9bbeb576640f19a25503ec180052
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

export default withRouter(MenuBoardComponent);