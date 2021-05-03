import React, { Component } from 'react';


class CustomerServiceBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
           
        }

    }

    componentDidMount() {
        // DZBZ 통합 검색
        var searchBar = document.getElementById("searchBar");
        searchBar.placeholder="DZBZ 통합 검색";

        var header = document.getElementById("navbar");
        var csbtn = document.getElementById("csbtn");
        var btns = header.getElementsByClassName("mybtn");
        for (var i = 0; i < btns.length; i++) {
            btns[i].className = "mybtn"
        }
        csbtn.className += " active";

    }

<<<<<<< HEAD
=======
    actAns(liNum){
        var ul = document.getElementById("csUl");
        var ans = ul.getElementsByClassName("answer");

        for (var j = 0; j < ans.length; j++) {
            ans[j].style.display = "none";
        }

        var sel = document.getElementById(liNum);
        sel.style.display = "block";

    }

>>>>>>> 8c4fad14df0e9bbeb576640f19a25503ec180052

    render() {
        return (
        <div className="main-content">
            <div className="row row-inline-block small-spacing">
            <div className="col-xs-12">
            <div className="box-content">
<<<<<<< HEAD
            <div className="clearfix"><h4 className="box-title pull-left"></h4></div>
            <ul class="auto-grid">
                <li className="cs">
                    <div className="numDiv">1</div>
                    <div className="txtDiv">교환 및 반품은 어떻게 하나요?</div>
                </li>
                <li className="cs">
                    <div className="numDiv">2</div>
                    <div className="txtDiv">교환 및 반품 배송비는 얼마인가요?</div>
                </li>
                <li className="cs">
                    <div className="numDiv">3</div>
                    <div className="txtDiv">배송 전에 상품을 취소하고 싶어요.</div>
                </li>
                <li className="cs">
                    <div className="numDiv">4</div>
                    <div className="txtDiv">배송 전 인데 다른 상품으로 변경하고 싶어요.</div>
                </li>
                <li className="cs">
                    <div className="numDiv">5</div>
                    <div className="txtDiv">입금했는데 입금 확인이 되지 않아요.</div>
                </li>
                <li className="cs">
                    <div className="numDiv">6</div>
                    <div className="txtDiv">묶음배송으로 받아보고 싶어요.</div>
                </li>
                <li className="cs">
                    <div className="numDiv">7</div>
                    <div className="txtDiv">반품 했는데 언제 처리되나요?</div>
                </li>
                <li className="cs">
                    <div className="numDiv">8</div>
                    <div className="txtDiv">무통장입금 결제는 입금기간이 며칠인가요?</div>
                </li>
                <li className="cs">
                    <div className="numDiv">9</div>
                    <div className="txtDiv">현금영수증 신청은 어떻게 하나요?</div>
                </li>
                <li className="cs">
                    <div className="numDiv">10</div>
                    <div className="txtDiv">주문한 내역은 어디서 확인하나요?</div>
                </li>
                
                
=======

            <ul id="csUl" class="auto-grid">
                <li className="cs">
                    <div className="ques" onClick={()=>this.actAns("cs1")}>
                        <div className="numDiv">1</div>
                        <div className="txtDiv">주문 내역은 어떻게 확인할 수 있나요?</div>
                    </div>
                    <div id="cs1" className="answer">
                        <div className="txtDiv">우측 상단 프로필 사진을 클릭 후 [나의쇼핑]을 통해 확인 가능합니다.</div>
                    </div>
                </li>
                <li className="cs">
                    <div className="ques" onClick={()=>this.actAns("cs2")}>
                        <div className="numDiv">2</div>
                        <div className="txtDiv">결제 방법은 어떤 것이 있나요?</div>
                    </div>
                    <div id="cs2" className="answer">
                        <div className="txtDiv">신용카드 및 체크카드, 무통장 입금, 휴대폰 소액결제를 이용해 결제 가능합니다.</div>
                    </div>
                </li>
                <li className="cs">
                    <div className="ques" onClick={()=>this.actAns("cs3")}>
                        <div className="numDiv">3</div>
                        <div className="txtDiv">비회원주문이 가능한가요?</div>
                    </div>
                    <div id="cs3" className="answer">
                        <div className="txtDiv">비회원 주문은 가능하지만 일부 상품에 한해 제한되어있습니다.</div>
                    </div>
                </li>
                <li className="cs">
                    <div className="ques" onClick={()=>this.actAns("cs4")}>
                        <div className="numDiv">4</div>
                        <div className="txtDiv">신용카드 무이자 할부가 되나요?</div>
                    </div>
                    <div id="cs4" className="answer">
                        <div className="txtDiv">각 카드사 별로 상이하며, 카드사를 통해 확인 가능합니다.</div>
                    </div>
                </li>
                <li className="cs">
                    <div className="ques" onClick={()=>this.actAns("cs5")}>
                        <div className="numDiv">5</div>
                        <div className="txtDiv">신용카드 결제 후 할부 개월 수를 변경 가능한가요?</div>
                    </div>
                    <div id="cs5" className="answer">
                        <div className="txtDiv">결제 후 결제 정보 변경은 불가능합니다.<br/>단, 결제 완료 단계에서는 취소 후 재주문을 통해 변경 가능합니다.</div>
                    </div>
                </li>
                <li className="cs">
                    <div className="ques" onClick={()=>this.actAns("cs6")}>
                        <div className="numDiv">6</div>
                        <div className="txtDiv">가상계좌 은행을 변경 할 수 있나요?</div>
                    </div>
                    <div id="cs6" className="answer">
                        <div className="txtDiv">한번 발급 받은 계좌번호는 변경이 불가능합니다.<br/>재주문을 통해 새로운 계좌를 발급 받으신 후 입금 부탁드립니다.</div>
                    </div>
                </li>
                <li className="cs">
                <div className="ques" onClick={()=>this.actAns("cs7")}>
                        <div className="numDiv">7</div>
                        <div className="txtDiv">결제 시 에러 메시지가 나오는 경우 어떻게 해야하나요?</div>
                    </div>
                    <div id="cs7" className="answer">
                        <div className="txtDiv">우측 상단 프로필 사진을 클릭 후 [1:1채팅 상담하기]를 통해 문의 부탁드립니다.</div>
                    </div>
                </li>
                <li className="cs">
                <div className="ques" onClick={()=>this.actAns("cs8")}>
                        <div className="numDiv">8</div>
                        <div className="txtDiv">가상계좌 입금인을 다르게 적은 경우 어떻게 해야하나요?</div>
                    </div>
                    <div id="cs8" className="answer">
                        <div className="txtDiv">입금인이 달라도 가상계좌번호만 같으면 문제없습니다.</div>
                    </div>
                </li>
                <li className="cs">
                <div className="ques" onClick={()=>this.actAns("cs9")}>
                        <div className="numDiv">9</div>
                        <div className="txtDiv">원하는 날짜로 맞춰서 배송을 받을 수 있나요?</div>
                    </div>
                    <div id="cs9" className="answer">
                        <div className="txtDiv">각 배송처 정책에 따라 상이할 수 있습니다.</div>
                    </div>
                </li>
                <li className="cs">
                    <div className="ques" onClick={()=>this.actAns("cs10")}>
                        <div className="numDiv">10</div>
                        <div className="txtDiv">해외배송이 가능한가요?</div>
                    </div>
                    <div id="cs10" className="answer">
                        <div className="txtDiv">현재는 국내배송만 진행하고 있습니다.</div>
                    </div>
                </li>
>>>>>>> 8c4fad14df0e9bbeb576640f19a25503ec180052
            </ul>

            </div>
            </div>
            </div>
        </div>

        );
    }
}

export default CustomerServiceBoardComponent;