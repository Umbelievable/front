import React, { Component } from 'react';
import MemberService from '../service/MemberService';
import CartService from '../service/CartService';
import ItemService from '../service/ItemService';

class CartBoardComponent extends Component {
    constructor(props) {
        
        super(props)
        this.state = {
            isChecked: false,
            currentUser: { id: "" },
            cartList: [],
            itemList: [],
            finalcarts: []
        }
        this.selectAll=this.selectAll.bind(this);
    }

    componentDidMount() {
        const currentUser = MemberService.getCurrentUser();
        this.setState({ currentUser: currentUser, userReady: true });

        CartService.getCartItems(MemberService.getCurrentUser().id).then((res) => { 
            this.setState({ cartList: res.data });
            for(var i=0; i<res.data.length; i++){
                const vol = res.data[i].volume; // 카트 형태로 받아온거에선 vol만 저장
                ItemService.getCertainItem(res.data[i].pdNo, res.data[i].categoryNo, res.data[i].subcateNo).then( resul => { // 카트 조건에 해당하는 아이템 찾으면
                    const item = resul.data;
                    // 아이템에서 가져온 가격 원 빼고 콤마 빼야됨 -> 최종 가격 출력하기위해
                    const itemPrice = (item.pdPrice).replace(/,/g, "").substring(0,item.pdPrice.length-2);
                    const cartItem = [{"pdMall": item.pdMall,
                                        "pdTitle": item.pdTitle,
                                        "pdImg": item.pdImg,
                                        "volume": vol,
                                        "totalPrice": itemPrice * vol
                                    }]; // 렌더링에서 map으로 한번에 뽑으려고 이렇게 배열 만드는거
                    this.setState({finalcarts: this.state.finalcarts.concat(cartItem)});

  
                });
            }
        });

    }

    changeCheckHandler = (event) => {
        this.setState({isChecked: !this.state.isChecked,});
    }

    goToOrder() { // 주문하기 버튼 눌렀을때
        // 주문 완료되었다는 alert창 띄우고
        // 주문 목록 페이지로 이동하기
        alert("주문이 완료되었습니다.\n");
        this.props.history.push('/order-board');
    }

    selectAll(){
        var checkboxes = document.getElementsByName('check');
        
        if(!this.state.isChecked){ // 전체 선택하기
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = true;
            }
        }

        else { // 선택 해제
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false;
            }
        }
    }

    numberWithCommas(x) { // 콤마 정규식
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    
    render() {
        const { currentUser } = this.state;
        const ColoredLine = ({ color }) => (
            <hr style={{ color: color, backgroundColor: color, height: 0.5}}/>
        );

        return (
            <div className="main-content"> 
                <div className="row row-inline-block small-spacing">
				<div className="col-xs-12">                   
				<div className="box-content">
                    
                <div className="col-sm-12">
                    <p style={{paddingLeft:'3em', fontSize:'20px', textAlign:'center'}}><b>{currentUser.id}</b>님의 장바구니</p>
                    <div className="col-sm-2" style={{padding:'1em 0em 1em 4em'}}>
                        <div style={{display:'inline', verticalAlign: 'top'}}><input type="checkbox" name="checkAll" value="selectAll" onChange={this.changeCheckHandler} onClick={this.selectAll}/></div>
                        <p style={{display:'inline', paddingLeft:'1em'}}>모두 선택</p>
                    </div>
                    <br/>
                    <div className="col-sm-15" style={{paddingTop:'1em'}}>
                        <ColoredLine color="lightgray" />
                    </div>
                </div>

                
                <div className="row row-cols-1 row-cols-sm-2 g-2">
                    <div style={{overflowY:'scroll', height:'400px', width:'100%'}}>
                        {
                        this.state.finalcarts.map( 
                            finalcart => 
                            <div className="col-sm-12">
                                <div className="col-sm-4" style={{padding:'1em 0em 1em 5em'}}>
                                    <div style={{display:'inline', verticalAlign: 'top', paddingRight:'1em'}}><input type="checkbox" name="check"/></div>
                                    <img className="cartcropping" src={finalcart.pdImg}/>
                                </div>
                                <div className="col-sm-6" style={{padding:'1em 0em'}}>
                                    <div style={{ fontWeight:'bolder', fontSize:'5px', color:'gray'}}>{finalcart.pdMall}</div>
                                    <div style={{ paddingTop:'5px', paddingBottom:'10px', fontSize:'normal', color:'black'}}>{finalcart.pdTitle}</div>
                                    <div style={{ fontSize:'normal', color:'black'}}>수량 : {finalcart.volume} </div>
                                    <div style={{ fontWeight:'bolder', paddingTop:'10px', paddingBottom:'3px', fontSize:'20px', color:'black'}}>{this.numberWithCommas(finalcart.totalPrice)}원</div>
                                </div>
                            </div>
                        )
                        }
                       
                    </div>

                    <div style={{padding:'3em 0em 3em 6em'}}>
                        <div style={{ paddingTop:'1em', paddingBottom:'3px', fontSize:'large', color:'black'}}>총 상품금액&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>60,000원</b></div>
                        <div style={{ paddingTop:'1em', paddingBottom:'2em', fontSize:'large', color:'black'}}>총 배송비&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>10,000원</b></div>
                        <div style={{ paddingTop:'1em', paddingBottom:'1em', fontSize:'28px', color:'black'}}>결제금액&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>70,000원</b></div>
                        <button onClick={this.goToOrder.bind(this)} style={{ padding:'1em 6em'}} className="btn btn-primary waves-effect waves-light">상품 주문하기</button>                      
                    </div>
                </div>

				</div>
				</div>
				</div>
			</div>
        );
    }
}

export default CartBoardComponent;