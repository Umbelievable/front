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


    render() {
        return (
        <div className="main-content">
            <div className="row row-inline-block small-spacing">
            <div className="col-xs-12">
            <div className="box-content">
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
                
                
            </ul>

        
            </div>
            </div>
            </div>
        </div>

        );
    }
}

export default CustomerServiceBoardComponent;