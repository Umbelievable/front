import React, { Component } from 'react';
import PurchaseService from '../service/PurchaseService';
import MemberService from '../service/MemberService';
import ItemService from '../service/ItemService';


class OrderBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
           purList: [],
           itemList: []
        }

    }

    componentDidMount() {

        PurchaseService.getPurchaselist(MemberService.getCurrentUser().id).then((res) => { // 저렇게 넣어야 안꼬임
            this.setState({purList: res.data});
            for(var i=0; i<res.data.length; i++){
                const purchaseNo = res.data[i].purchaseNo;
                const purchaseDate = res.data[i].purchaseDate;
                const volume = res.data[i].volume;
                const reviewWrite = res.data[i].reviewWrite;

                ItemService.getCertainItem(res.data[i].pdNo, res.data[i].categoryNo, res.data[i].subcateNo).then( resul => {
                    const item = resul.data;
                    const itemP = (item.pdPrice).replace(/,/g, "");
                    const itemPrice = itemP.substring(0, itemP.length-1);
                    const orderItem = [{ "purchaseNo": purchaseNo, // 주문 번호
                                        "purchaseDate": purchaseDate, // 구매 날짜
                                        "volume": volume, //아이템 수량
                                        "pdMall": item.pdMall, // 아이템 회사
                                        "pdTitle": item.pdTitle, // 아이템 이름
                                        "pdImg": item.pdImg, // 아이템 이미지
                                        "pdPrice": item.pdPrice, // 아이템 가격
                                        "pdNo": item.pdNo,
                                        "reviewWrite": reviewWrite,
                                        "categoryNo": item.cateNo,
                                        "subcateNo": item.subcateNo,
                                        "totalPrice": itemPrice * volume // 총 주문금액
                    }];
                    this.setState({itemList: this.state.itemList.concat(orderItem).sort(function(a, b){ // 정렬까지 해서 렌더링에 사용할 배열 만들기
                        return b.purchaseNo - a.purchaseNo
                    })});
                                    
                });
            }
        });
    }

    readItem(pdNo, cateNo, subcateNo) {
        this.props.history.push(`/read-item?pdNo=${pdNo}&cateNo=${cateNo}&subcateNo=${subcateNo}`);
    }

    numberWithCommas(x) { // 콤마 정규식
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    goToReview(purchaseNo){
        this.props.history.push('/review-board/'+purchaseNo);
    }

    showDate(date){
        return (date).replace('T', " ");
    }


    render() {
        return (
        <div className="main-content">
            <div className="row row-inline-block small-spacing">
            <div className="col-xs-12">
            <div className="box-content">

            <div className="table-responsive clearfix" style={{padding:'2em'}}>
			    <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>주문 번호 </th>
                            <th>상품 정보 </th>
                            <th>주문 일자 </th>
                            <th>총 주문 금액</th>
                            <th>주문 상태 </th>
                            <th>리뷰 </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.itemList.map(
                            item => 
                            <tr>
                                <td  style={{verticalAlign:'middle'}}>{item.purchaseNo}</td>
                                <td  style={{verticalAlign:'middle'}}>
                                    <div onClick={()=> this.readItem(item.pdNo, item.categoryNo, item.subcateNo)} className="col-sm-3" style={{padding:'1em 0em 1em 1em'}}>
                                        <img className="ordercropping" src={item.pdImg}/>
                                    </div>
                                    <div  onClick={()=> this.readItem(item.pdNo, item.categoryNo, item.subcateNo)} className="col-sm-6" style={{padding:'1em 0em', textAlign:'left'}}>
                                        <div style={{ fontWeight:'bolder', fontSize:'small', color:'gray'}}>{item.pdMall}</div>
                                        <div style={{ paddingTop:'5px', paddingBottom:'5px', fontSize:'large', color:'black'}}>{item.pdTitle}</div>
                                        <div style={{ fontSize:'small', color:'black', display: 'inline-block'}}><b>가격</b>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{item.pdPrice}</div>
                                        <div style={{ paddingLeft:'15px', fontSize:'small', color:'black', display: 'inline-block'}}><b>수량</b>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{item.volume}개</div>
                                    </div>
                                </td>
                                <td  style={{verticalAlign:'middle'}}>{this.showDate(item.purchaseDate)}</td>
                                <td  style={{verticalAlign:'middle'}}>{this.numberWithCommas(item.totalPrice+10000)}원</td>
                                <td  style={{verticalAlign:'middle'}}>구매 확정</td>
                                <td style={{verticalAlign:'middle'}}>
                                {
                                    (item.reviewWrite == 'Y') ? (<div>작성 완료</div>) : 
                                    (<button className="btn-main-gray" onClick={()=>this.goToReview(item.purchaseNo)} style={{verticalAlign:'middle'}}>리뷰 작성</button>)
                                }
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
                
            </div>

            </div>
            </div>
            </div>
        </div>

        );
    }
}

export default OrderBoardComponent;