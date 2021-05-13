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
            subcateNo: query.subcateNo,
            pdNo: query.pdNo,
            count: 1, // 구매수량
            reviews: [],  //리뷰목록
            reviewResult: [],  //리뷰키워드그래프 데이터타입 아직모름
            isClicked: false
        }
        this.up=this.up.bind(this);
        this.down=this.down.bind(this);
        this.changeImg=this.changeImg.bind(this);

    }

    componentDidMount(){
        ItemService.getCertainItem(this.state.pdNo, this.state.cateNo, this.state.subcateNo).then( res => {
            this.setState({itemInfo: res.data});
        });

        ReviewService.getReviews(this.state.p_num, this.state.cateNo, this.state.subcateNo, this.state.pdNo).then( res => {
            this.setState({ 
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                reviews: res.data.list});
        });
    }

    listBoard(p_num, cateNo, subcateNo, pdNo) {
        console.log("pageNum : "+ p_num);
        ReviewService.getReviews(p_num, cateNo, subcateNo, pdNo).then( res => {
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
            <a className="page-link" onClick = {() => this.listBoard(page, this.state.cateNo, this.state.subcateNo, this.state.pdNo)}>{page}</a>
        </li>
        ));
        
    }

    isPagingPrev(){
        if (this.state.paging.prev) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listBoard( (this.state.paging.currentPageNum - 1, this.state.cateNo, this.state.subcateNo, this.state.pdNo) )} tabindex="-1">Previous</a>
                </li>
            );
        }
    }

    isPagingNext(){
        if (this.state.paging.next) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listBoard( (this.state.paging.currentPageNum + 1, this.state.cateNo, this.state.subcateNo, this.state.pdNo) )} tabIndex="-1">Next</a>
                </li>
            );
        }
    }

    isMoveToFirstPage() {
        if (this.state.p_num != 1) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listBoard(1, this.state.cateNo, this.state.subcateNo, this.state.pdNo)} tabIndex="-1">Move to First Page</a>
                </li>
            );
        }
    }

    isMoveToLastPage() {
        if (this.state.p_num != this.state.paging.pageNumCountTotal) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listBoard( (this.state.paging.pageNumCountTotal,this.state.cateNo, this.state.subcateNo, this.state.pdNo) )} tabIndex="-1">LastPage({this.state.paging.pageNumCountTotal})</a>
                </li>
            );
        }
    }

    up() {
        this.setState({count: this.state.count+1});
    }

    down() {
        if(this.state.count > 1){
            this.setState({count: this.state.count-1});
        }  
    }
    showLike() {
        if(this.state.isClicked == false){
            return (
                <i style={{fontSize:'30px'}} className="glyphicon glyphicon-heart-empty" aria-hidden="true"></i>
            );
        }
        else{
            return (
                <i style={{fontSize:'30px'}} className="glyphicon glyphicon-heart" aria-hidden="true"></i>
            );
        }
        
    }
    changeImg() {
        this.setState({isClicked: !this.state.isClicked,});
    }

    numberWithCommas(x) { // 콤마 정규식
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  

    totalPrice(){
        var price = this.state.itemInfo.pdPrice+""; // 123,000원+공백 -> string 형변환 때문
        var rPrice = price.substring(0, price.length-1).replace(/,/g, ""); // 콤마 제거
        var count = this.state.count; // 구매 수량
        var res = Number(count) * Number(rPrice); // 가격*수량

        // 콤마 다시 붙이고 원 붙여서 출력하기
        return (
            <div style={{ paddingTop:'1em', fontWeight:'bolder', fontSize:'30px', color:'black'}}>{this.numberWithCommas(res)+"원"}</div>
        );
        
    }




    render(){
        return (
            <div className="main-content" style={{padding:'0em 5em'}}> 
            <div className="row row-inline-block small-spacing">
            <div className="col-xs-12">                   
            <div className="box-content">

         
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
                <div style={{padding:'3em 0em 3em 3em'}}>
                    <img className="itemcropping" src={this.state.itemInfo.pdImg}/>
                </div>
                <div style={{padding:'3em 1em', position:'relative'}}>
                    <div style={{ fontWeight:'bolder', fontSize:'small', color:'gray'}}>{this.state.itemInfo.pdMall}</div>
                    <div style={{ paddingTop:'3px', paddingBottom:'2em', fontSize:'large', color:'black'}}>{this.state.itemInfo.pdTitle}</div>
                    <div style={{ paddingTop:'1em', paddingBottom:'2em', color:'black'}}>
                        수량 
                        <button className="countBtn" onClick={this.down} style={{ margin: '0em 1em'}}>-</button>
                        {this.state.count}
                        <button className="countBtn" onClick={this.up} style={{ margin: '0em 1em'}}>+</button>
                    </div>
                    
                    {this.totalPrice()}
                    <button className="btn" style={{left:'1em', bottom:'3em', position:'absolute', padding:'5px 8px 0px 8px'}} onClick={this.changeImg}>{this.showLike()}</button>
                    <button className="btn btn-primary waves-effect waves-light" style={{left:'5em', bottom:'3em', position:'absolute'}}>BUY NOW</button>
                    <button className="btn btn-primary waves-effect waves-light"style={{marginLeft:"10px", left:'13em', bottom:'3em', position:'absolute'}}>CART</button>
                    
                </div>
                <div style={{padding:'3em'}}>
                    <div style={{ fontSize:'large', color:'black'}}>소비자 리뷰 분석 결과</div>   
                </div>  
                    
            </div>
            <br/><br/>
        
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
                            <tr key = {review.reviewNo, review.pdNo, review.subcate, review.cateNo}>
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
        );
    }

}

export default ItemComponent;