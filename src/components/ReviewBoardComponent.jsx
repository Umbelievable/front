import React, { Component } from 'react';
import ItemService from '../service/ItemService';
import ReviewService from '../service/ReviewService';
import MemberService from '../service/MemberService';
import PurchaseService from '../service/PurchaseService';


class ReviewBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            purchaseNo: this.props.match.params.purchaseNo,
            item: {},
            pdNo: '',
            cateNo: '',
            subcateNo: '',
            volume: 0,
            totalPrice: 0,
            isClicked: false,
            star: 0,
            review: ''
        }
        this.changeContentHandler = this.changeContentHandler.bind(this);

    }

    changeContentHandler = (event) => {
        this.setState({review: event.target.value});
    }

    componentDidMount(){
        PurchaseService.getCertainPurchase(this.state.purchaseNo).then( res => { // 구매목록 기본키로 가져와서
            this.setState({ pdNo: res.data.pdNo, cateNo: res.data.categoryNo, subcateNo: res.data.subcateNo, volume: res.data.volume });
            const pdNo = res.data.pdNo;
            const subcateNo = res.data.subcateNo;
            const categoryNo = res.data.categoryNo;

            ItemService.getCertainItem(pdNo, categoryNo, subcateNo).then( resul => { // 아이템 정보 출력
                this.setState({item: resul.data});
                const itemPrice = (resul.data.pdPrice).replace(/,/g, "").substring(0, resul.data.pdPrice.length-2);
                this.setState({totalPrice: itemPrice * this.state.volume});
            });
        });
    }



    numberWithCommas(x) { // 콤마 정규식
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    setStar(id){
        var i;
        var stars = document.getElementsByClassName("reviewStar");

        for(i=0; i<stars.length; i++){ // 있는거 다 지우고
            stars[i].classList.remove("glyphicon-star-empty");
        }
        for(i=0; i<id[4]; i++){ // 올린만큼 꽉찬별
            stars[i].classList.add("glyphicon-star");
        }
        for(i=id[4]; i<stars.length; i++){ // 나머지는 빈 별
            stars[i].classList.add("glyphicon-star-empty");
        }
        this.setState({star: id[4], isClicked: true});
        
    }

    moveStar(id){
        var i;
        var stars = document.getElementsByClassName("reviewStar");
        if(!this.state.isClicked){ // 별 클릭하면 그 다음부턴 마우스 오버 이벤트 X
            for(i=0; i<stars.length; i++){ // 있는거 다 지우고
                stars[i].classList.remove("glyphicon-star-empty");
            }
            for(i=0; i<id[4]; i++){ // 올린만큼 꽉찬별
                stars[i].classList.add("glyphicon-star");
            }
            for(i=id[4]; i<stars.length; i++){ // 나머지는 빈 별
                stars[i].classList.add("glyphicon-star-empty");
            }
        }
        
    }

    createReview = (event) => {
        event.preventDefault();

        let review = {
            star: this.state.star,
            review: this.state.review,
            customerId: MemberService.getCurrentUser().id
        };

        ReviewService.createReview(this.state.cateNo, this.state.subcateNo, this.state.pdNo, review).then(res => {
            alert('리뷰가 등록되었습니다.');
            this.props.history.push('/order-board');
        });
    }


    render() {
        return (
        <div className="main-content">
            <div className="row row-inline-block small-spacing">
            <div className="col-xs-12">
            <div className="box-content">
            <div style={{paddingTop:'3em', backgroundColor:'rgb(243, 241, 241)', width:'50%', margin:'0 auto'}} class="row justify-content-md-center">
                <img className="cartcropping" src={this.state.item.pdImg}/>
                <div style={{display:'inline-block', paddingLeft:'1em', height:'120px'}}>
                    <div style={{ fontWeight:'bolder', fontSize:'5px', color:'gray'}}>{this.state.item.pdMall}</div>
                    <div style={{ paddingTop:'5px', paddingBottom:'10px', fontSize:'normal', color:'black'}}>{this.state.item.pdTitle}</div>
                    <div style={{ fontSize:'normal', color:'black', display: 'inline'}}>수량: {this.state.volume}</div>                    
                    <div style={{ fontWeight:'bolder', paddingTop:'10px', paddingBottom:'3px', fontSize:'normal', color:'black'}}>총 주문금액: {this.numberWithCommas(this.state.totalPrice)}원</div>
                </div>

                
                           
                <div style={{ textAlign:'center', width:'100%', padding:'2em 0em 1em 0em', fontSize:'20px', fontFamily:'NanumSquareR' }}>상품은 만족하셨나요?</div>
                <div style={{fontSize:'40px', color:'rgb(243, 201, 64)'}}>
                    <i id="star1" className="reviewStar glyphicon glyphicon-star-empty" aria-hidden="true" onClick={()=>this.setStar("star1")} onMouseOver={()=> this.moveStar("star1")}/>
                    <i id="star2" className="reviewStar glyphicon glyphicon-star-empty" aria-hidden="true" onClick={()=>this.setStar("star2")} onMouseOver={()=> this.moveStar("star2")}/>
                    <i id="star3" className="reviewStar glyphicon glyphicon-star-empty" aria-hidden="true" onClick={()=>this.setStar("star3")} onMouseOver={()=> this.moveStar("star3")}/>
                    <i id="star4" className="reviewStar glyphicon glyphicon-star-empty" aria-hidden="true" onClick={()=>this.setStar("star4")} onMouseOver={()=> this.moveStar("star4")}/>
                    <i id="star5" className="reviewStar glyphicon glyphicon-star-empty" aria-hidden="true" onClick={()=>this.setStar("star5")} onMouseOver={()=> this.moveStar("star5")}/>
                </div>
                <div style={{ textAlign:'center', width:'100%', padding:'2em 0em 1em 0em', fontSize:'20px'}}>어떤 점이 좋았나요?</div>
                <textarea className="form-control" onChange={this.changeContentHandler} placeholder="리뷰를 입력해주세요." style={{width:'700px', height:'200px', marginBottom:'3em'}}/>
                <button className="btn btn-primary waves-effect waves-light" onClick={this.createReview} style={{marginBottom:'3em'}}>작성완료</button>
            </div>



            </div>
            </div>
            </div>
        </div>

        );
    }
}

export default ReviewBoardComponent;