import React, { Component } from 'react';
import MemberService from '../service/MemberService';
import CartService from '../service/CartService';
import ItemService from '../service/ItemService';

class CartBoardComponent extends Component {
    constructor(props) {
        
        super(props)
        this.state = {
            currentUser: { id: "" },
            cartList: [],
            itemList: [],
            finalcarts: [],
            orderPrice: 0,
            vol: 0
        }
        this.selectAll=this.selectAll.bind(this);

    }

    componentDidMount() {
        const currentUser = MemberService.getCurrentUser();
        this.setState({ currentUser: currentUser, userReady: true });

        CartService.getCartItems(MemberService.getCurrentUser().id).then((res) => { 
            this.setState({ cartList: res.data });
            for(var i=0; i<res.data.length; i++){
                const id = i;
                const cartNo = res.data[i].cartNo;
                const vol = res.data[i].volume; // 카트 형태로 받아온거에선 cartNo, vol만 저장
                ItemService.getCertainItem(res.data[i].pdNo, res.data[i].categoryNo, res.data[i].subcateNo).then( resul => { // 카트 조건에 해당하는 아이템 찾으면
                    const item = resul.data;
                    
                    // 아이템에서 가져온 가격 원 빼고 콤마 빼야됨 -> 최종 가격 출력하기위해
                    const itemPrice = (item.pdPrice).replace(/,/g, "").substring(0,item.pdPrice.length-2);
                    const cartItem = [{ "finalCartId": cartNo,
                                        "pdMall": item.pdMall,
                                        "pdNo": item.pdNo,
                                        "categoryNo": item.cateNo,
                                        "subcateNo": item.subcateNo,
                                        "pdTitle": item.pdTitle,
                                        "pdImg": item.pdImg,
                                        "volume": vol,
                                        "totalPrice": itemPrice * vol
                                    }]; // 렌더링에서 map으로 한번에 뽑으려고 이렇게 배열 만드는거
                    this.setState({ orderPrice: this.state.orderPrice + itemPrice * vol });
                    this.setState({finalcarts: this.state.finalcarts.concat(cartItem).sort(function(a, b){ // 정렬까지 해서 렌더링에 사용할 배열 만들기
                        return b.finalCartId - a.finalCartId
                    })});

  
                });
            }
        });

    }

    

    goToOrder() { // 주문하기 버튼 눌렀을때
        // 주문 완료되었다는 alert창 띄우고
        // 주문 목록 페이지로 이동하기
        alert("주문이 완료되었습니다.\n");
        this.props.history.push('/order-board');
    }

    selectOne(ckId){
        var i = 0;
        var flag = 0;
        var checkAll = document.getElementById('checkAll');
        var checkboxes = document.getElementsByName('check');
        for(i=0; i<checkboxes.length; i++){
            if(checkboxes[i].checked == false){ // 하나라도 false인거 있으면 flag 체크해두기
                flag = 1;
            }
        }
        if(flag == 0){ // 하나씩 추가하다가 모든 상품 다 체크하면
            checkAll.checked = true; // 전체선택도 체크되게
        }
        else if(flag == 1){ // 전체선택 이었는데 하나 체크 안되면
            checkAll.checked = false; // 전체선택도 해제
        }

        const ordercart = this.state.finalcarts;
        var price = 0;
        for(i=0; i<checkboxes.length; i++){
            if(checkboxes[i].checked == true){ // 하나라도 false인거 있으면 flag 체크해두기
                price = price + ordercart[i].totalPrice;
                
            }
        }
        this.setState({ orderPrice: price });

    }

    selectAll(){
        const ordercart = this.state.finalcarts;
        var price = 0;
        var checkAll = document.getElementById('checkAll');
        var checkboxes = document.getElementsByName('check')
        if(checkAll.checked == true){ // 전체 선택하기
            for(var i=0; i<checkboxes.length; i++){
                checkboxes[i].checked = true;
                price = price + ordercart[i].totalPrice;
            }
            this.setState({ orderPrice: price });

        }

        else { // 선택 해제
            for(var i=0; i<checkboxes.length; i++){
                checkboxes[i].checked = false;
            }
            this.setState({ orderPrice: 0 });
        }
    }

    deleteItem(){ // 선택 상품 삭제 함수
        // 카트서비스에서 삭제 부르려면 cartNo를 인자로 넘겨야함
        var checkboxes = document.getElementsByName('check'); // 체크박스 리스트 가져오기
        const ordercart = this.state.finalcarts; 
        

        for(var i=0; i<checkboxes.length; i++){ // 리스트 크기만큼 돌면서 
            
            if(checkboxes[i].checked == true){ // 선택된 애들
                const cartNo = ordercart[i].finalCartId;
                CartService.deleteItem(cartNo);
            }
        }
        alert("상품이 삭제되었습니다.\n");
        window.location.replace('/cart-board');
        
    }

    updateVol(id){
        var txtBox = document.getElementById("txtId"+id);
        //txtBox.value -> 바뀐 수량
        const cart = this.state.cartList;
        for(var i=0; i<cart.length; i++){
            if(cart[i].cartNo == id){
                CartService.updateItem(id, txtBox.value);
                break;
            }
        }
        alert("수량이 변경되었습니다.\n");
        window.location.replace('/cart-board');
        

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
                        <div style={{display:'inline', verticalAlign: 'top'}}><input type="checkbox" id="checkAll" value="selectAll" onClick={this.selectAll} defaultChecked/></div>
                        <p style={{display:'inline', paddingLeft:'1em'}}>전체 선택</p>
                    </div>
                    <br/>
                    <div className="col-sm-15" style={{paddingTop:'1em'}}>
                        <ColoredLine color="lightgray" />
                    </div>
                </div>

                
                <div className="row row-cols-1 row-cols-sm-2 g-2">
                    <div>
                        <div style={{overflowY:'scroll', height:'400px', width:'100%'}}>
                            {
                            this.state.finalcarts.map( 
                                finalcart => 
                                <div className="col-sm-12">
                                    <div className="col-sm-4" style={{padding:'1em 0em 1em 5em'}}>
                                        <div style={{display:'inline', verticalAlign: 'top', paddingRight:'1em'}}><input id={"ckId"+finalcart.finalCartId} onClick={()=> this.selectOne("ckId"+finalcart.finalCartId)} type="checkbox" name="check" defaultChecked/></div>
                                        <img className="cartcropping" src={finalcart.pdImg}/>
                                    </div>
                                    <div className="col-sm-6" style={{padding:'1em 0em'}}>
                                        <div style={{ fontWeight:'bolder', fontSize:'5px', color:'gray'}}>{finalcart.pdMall}</div>
                                        <div style={{ paddingTop:'5px', paddingBottom:'10px', fontSize:'normal', color:'black'}}>{finalcart.pdTitle}</div>
                                        <div style={{ fontSize:'normal', color:'black', display: 'inline'}}>수량 : </div><input id={"txtId"+finalcart.finalCartId} style={{display: 'inline', width:'30px', border:'1px solid gray'}} type="text" placeholder={finalcart.volume}/>
                                        <button style={{display: 'inline', border:'none', padding:'3px', margin:'0px 5px'}} onClick={()=>this.updateVol(finalcart.finalCartId)}>변경</button>
                                        <div style={{ fontWeight:'bolder', paddingTop:'10px', paddingBottom:'3px', fontSize:'20px', color:'black'}}>{this.numberWithCommas(finalcart.totalPrice)}원</div>
                                    </div>
                                </div>
                            )
                            }
                        
                        </div>
                        <div style={{ textAlign:'center' }}>
                            <button onClick={()=>this.deleteItem()} style={{ margin:'1em' }} className="btn waves-effect waves-light">선택 상품 삭제</button>  
                        </div>
                    </div>

                    <div style={{padding:'3em 0em 3em 6em'}}>
                        <div style={{ paddingTop:'1em', paddingBottom:'3px', fontSize:'large', color:'black'}}>총 상품금액&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{this.numberWithCommas(this.state.orderPrice)}원</b></div>
                        <div style={{ paddingTop:'1em', paddingBottom:'2em', fontSize:'large', color:'black'}}>총 배송비&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>10,000원</b></div>
                        <div style={{ paddingTop:'1em', paddingBottom:'1em', fontSize:'28px', color:'black'}}>결제금액&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{this.numberWithCommas(this.state.orderPrice+10000)}원</b></div>
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