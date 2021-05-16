<<<<<<< HEAD
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

=======
import React, { Component } from 'react';
import queryString from 'query-string';
import ItemService from '../service/ItemService';
import ReviewService from '../service/ReviewService';
import LikeService from '../service/LikeService';
import MemberService from '../service/MemberService';
<<<<<<< HEAD
import HashtagService from '../service/HashtagService';
=======
>>>>>>> 8b10a9616ebad19dfbffa49177514e247324b15c

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
            isClicked: false,
            currentUser: { id: "" },
            likes: [] // 유저별 좋아요 목록

        }
        this.up=this.up.bind(this);
        this.down=this.down.bind(this);
        this.changeImg=this.changeImg.bind(this);

    }

    componentDidMount(){
        const currentUser = MemberService.getCurrentUser();
        this.setState({ currentUser: currentUser, userReady: true });

        ItemService.getCertainItem(this.state.pdNo, this.state.cateNo, this.state.subcateNo).then( res => {
            this.setState({itemInfo: res.data});
        });

        
        // 리뷰가 있으면 (res.data.pagingData.currentPageNum != null) setState하고 없으면 그냥 넘기기
        ReviewService.getReviews(this.state.p_num, this.state.cateNo, this.state.subcateNo, this.state.pdNo).then( res => {
            this.setState({ 
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                reviews: res.data.list});
            })
            .catch(res =>{ this.setState({ 
                p_num: null,
                paging: null,
                reviews: null});
        });

        // 유저 좋아요 목록 가져오기 -> 좋아요 목록에 있는건 칠한 하트로 뽑아야하고 다시 눌렀을때 삭제도 할 수 있게
        LikeService.getLikelist(MemberService.getCurrentUser().id).then((res) => { // 좋아요 목록 가져와서
            this.setState({likes: res.data}); // 리스트에 넣고 
            
            for(var i=0; i<res.data.length; i++){ // 리스트 길이만큼 돌기 
                const pdNo = res.data[i].pdNo;
                const cateNo = res.data[i].categoryNo;
                const subcateNo = res.data[i].subcateNo;

                if((this.state.pdNo == pdNo) && (this.state.cateNo == cateNo) && (this.state.subcateNo == subcateNo)){ // 이미 좋아요를 누른 상태라면
                    this.setState({isClicked: true}); // 하트 칠해서 출력하기
                }
                
            }
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
    changeImg() { // 하트 눌렀을때 불리는 함수
        if(!this.state.isClicked){ // 좋아요 안눌린상태면 // createLikeItem 호출
            let item = {
                userId: this.state.currentUser.id,
                pdNo: this.state.pdNo,
                subcateNo: this.state.subcateNo,
                categoryNo: this.state.cateNo
            };
            LikeService.createLikeItem(item).then(res => {
                alert('관심상품 목록에 추가했습니다.');
            });

        }
        else { // 눌린상태면 // deleteLikeItem 호출
            const likeItem = this.state.likes;
            for(var i=0; i<likeItem.length; i++){
                if((likeItem[i].pdNo == this.state.pdNo) && (likeItem[i].categoryNo == this.state.cateNo) && (likeItem[i].subcateNo == this.state.subcateNo)) {
                    LikeService.deleteLikeItem(likeItem[i].likeNo).then(res => {
                        alert('관심상품 목록에서 삭제했습니다.');
                    });
                }
            }
        }
        this.setState({isClicked: !this.state.isClicked,}); // 지금 상태랑 반대인 그림으로 바꾸기
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
<<<<<<< HEAD

                <div style={{padding:'3em 5em', textAlign:'center'}}>
                <div >
                    <div style={{fontWeight:'bolder', fontSize:'27px', color:'black', textAlign:'center', paddingTop:'3px', paddingBottom:'1em'}}>소비자 리뷰 분석 결과</div>
                    
                        <div style={{fontSize:'23px'}} className="hashtagrank" title="rank1">#&nbsp;훌륭하다</div>
                        <div style={{fontSize:'23px'}} className="hashtagrank" title="rank2">#&nbsp;황당하다</div>
                        <div style={{fontSize:'23px'}} className="hashtagrank" title="rank3">#&nbsp;화사하다</div>
                        <div style={{fontSize:'23px'}} className="hashtagrank" title="rank4">#&nbsp;푹신하다</div>
                        <div style={{fontSize:'23px'}} className="hashtagrank" title="rank5">#&nbsp;편안하다</div>
                          
                </div> 
                </div> 
                    
            </div>
            <br/><br/>
           
            <div className="nounhashbtn">#&nbsp;배송</div>
            <div className="nounhashbtn">#&nbsp;촉감</div>
            <div className="nounhashbtn">#&nbsp;냄새</div>
            <div className="nounhashbtn">#&nbsp;색</div>
            <div className="nounhashbtn">#&nbsp;사진</div>
            <div className="nounhashbtn">#&nbsp;사이즈</div>
            <div className="nounhashbtn">#&nbsp;환불</div>
            <div className="nounhashbtn">#&nbsp;교환</div>
            <div className="nounhashbtn">#&nbsp;재구매</div>
            <div className="nounhashbtn">#&nbsp;조립</div>
          

=======
                <div style={{padding:'3em'}}>
                    <div style={{ fontSize:'large', color:'black'}}>소비자 리뷰 분석 결과</div>   
                </div>  
                    
            </div>
            <br/><br/>
>>>>>>> 8b10a9616ebad19dfbffa49177514e247324b15c
            {
                (this.state.reviews) && ( // 리뷰가 있으면 리뷰 뽑고
                    <div>
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
                )
            }
            {
                (!this.state.reviews) && ( // 없으면 없다고
                    <div>
                        작성된 리뷰가 없습니다.
                    </div>
                )
            }
        
            

<<<<<<< HEAD
=======
            

            
>>>>>>> 8b10a9616ebad19dfbffa49177514e247324b15c
            </div>
            </div>
            </div>
            </div>	
        );
    }

}

>>>>>>> 8c4fad14df0e9bbeb576640f19a25503ec180052
export default ItemComponent;