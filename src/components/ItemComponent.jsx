import React, { Component } from 'react';
import queryString from 'query-string';
import ItemService from '../service/ItemService';
import ReviewService from '../service/ReviewService';

class ItemComponent extends Component{
    constructor(props){
        const query = queryString.parse(window.location.search);

        super(props)
        this.state = {
            p_num: 1,
            paging: {},
            itemInfo: {},
            cateNo: query.cateNo,
            thisCateNo: query.subcateNo,
            pdNo: query.pdNo,
            reviews: [],  //리뷰목록
            reviewResult: []  //리뷰키워드그래프 데이터타입 아직모름.
        }
    }

    componentDidMount(){
        ItemService.getCertainItem(this.state.pdNo, this.state.cateNo, this.state.thisCateNo).then( res => {
            this.setState({itemInfo: res.data});
        });

        ReviewService.getReviews(this.state.p_num, this.state.cateNo, this.state.thisCateNo, this.state.pdNo).then( res => {
            this.setState({ 
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                reviews: res.data.list});
        });
    }

    listBoard(p_num, cateNo, thisCateNo, pdNo) {
        console.log("pageNum : "+ p_num);
        ReviewService.getReviews(p_num, cateNo, thisCateNo, pdNo).then( res => {
            console.log(res.data);
            this.setState({ 
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                reviews: res.data.list});
        });
    }

    viewPaging() {
        const pageNums = [];

        for (let i = this.state.paging.pageNumStart; i <= this.state.paging.pageNumEnd; i++ ) {
            pageNums.push(i);
        }

        return (pageNums.map((page) => 
        <li className="page-item" key={page.toString()} >
            <a className="page-link" onClick = {() => this.listBoard(page, this.state.cateNo, this.state.thisCateNo, this.state.pdNo)}>{page}</a>
        </li>
        ));
        
    }

    isPagingPrev(){
        if (this.state.paging.prev) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listBoard( (this.state.paging.currentPageNum - 1, this.state.cateNo, this.state.thisCateNo, this.state.pdNo) )} tabindex="-1">Previous</a>
                </li>
            );
        }
    }

    isPagingNext(){
        if (this.state.paging.next) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listBoard( (this.state.paging.currentPageNum + 1, this.state.cateNo, this.state.thisCateNo, this.state.pdNo) )} tabIndex="-1">Next</a>
                </li>
            );
        }
    }

    isMoveToFirstPage() {
        if (this.state.p_num != 1) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listBoard(1, this.state.cateNo, this.state.thisCateNo, this.state.pdNo)} tabIndex="-1">Move to First Page</a>
                </li>
            );
        }
    }

    isMoveToLastPage() {
        if (this.state.p_num != this.state.paging.pageNumCountTotal) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listBoard( (this.state.paging.pageNumCountTotal,this.state.cateNo, this.state.thisCateNo, this.state.pdNo) )} tabIndex="-1">LastPage({this.state.paging.pageNumCountTotal})</a>
                </li>
            );
        }
    }


    render(){
     
        return (
            <div className="main-content"> 
            <div className="row row-inline-block small-spacing">
            <div className="col-xs-12">                   
            <div className="box-content">
            <div className="clearfix"><h4 className="box-title pull-left"></h4>
            
            
            
            <div style={{display:'inline', height:'400px'}}>
                <img src={this.state.itemInfo.pdImg} style={{display:'inline-block', width:'30%', height:'400px', alignItems:'flex-start', justifyContent:'space-around'}}/>
                    <div style={{ display:'inline-block',margin:'0px 40px',width:'30%',height:'400px'}}>
                        <div style={{ fontWeight:'bolder', fontSize:'23px'}}>{this.state.itemInfo.pdTitle}</div>
                        <br/>
                        <div style={{ fontWeight:'bolder', fontSize:'20px',color:'#ea4335'}}>{this.state.itemInfo.pdPrice}</div>
                            <button className="btn btn-primary waves-effect waves-light" style={{marginTop:'130px'}}>BUY NOW</button>
                            <button className="btn btn-primary waves-effect waves-light"style={{marginLeft:"10px",marginTop:'130px'}}>CART</button>
                    </div>  
                    <div style={{ display:'inline-block',margin:'0px 40px',width:'25%',height:'400px'}}>
                        <div style={{ fontWeight:'bolder', fontSize:'23px'}}>리뷰 분석 결과</div>
                    </div>
            </div>
        
            <div className="table-responsive clearfix">
             <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>리뷰No.</th>
                            <th>별점</th>
                            <th>아이디</th>
                            <th>리뷰</th>
                            <th>날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.reviews.map(
                            review => 
                            <tr key = {review.reviewNo, review.pdNo, review.subcateNo, review.cateNo}>
                                <td> {review.reviewNo} </td>
                                <td> {review.star} </td>
                                <td> {review.customerId} </td>
                                <td> {review.review} </td>
                                <td> {review.reviewDate} </td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>
            <div className ="row">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">

                        {
                            this.isMoveToFirstPage()
                        }
                        {
                            this.isPagingPrev()
                        }
                        {
                            this.viewPaging()
                        }
                        {
                            this.isPagingNext()
                        }
                        {
                            this.isMoveToLastPage()
                        }
                    </ul>
                </nav>
            </div>

            

            </div>
            </div>
            </div>
            </div>
            </div>   
        );
    }

}

export default ItemComponent;