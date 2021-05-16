import React, { Component } from 'react';


class OrderBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
           
        }

    }


    render() {
        const ColoredLine = ({ color }) => (
            <hr style={{ color: color, backgroundColor: color, height: 0.5}}/>
        );
        return (
        <div className="main-content">
            <div className="row row-inline-block small-spacing">
            <div className="col-xs-12">
            <div className="box-content">

            <div className="table-responsive clearfix">
			    <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>상품정보 </th>
                            <th>주문일자 </th>
                            <th>주문번호 </th>
                            <th>주문금액(수량) </th>
                            <th>주문 상태 </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="col-sm-3" style={{padding:'1em 0em 1em 1em'}}>
                                    <img className="ordercropping" src="http://cdn.011st.com/11dims/resize/600x600/quality/75/11src/pd/17/8/4/3/3/2/4/XaCvd/10843324_B.jpg"/>
                                </div>
                                <div className="col-sm-6" style={{padding:'1em 0em', textAlign:'left'}}>
                                    <div style={{ fontWeight:'bolder', fontSize:'small', color:'gray'}}>회사이름 어쩌구저쩌구 쫌 길수도</div>
                                    <div style={{ paddingTop:'5px', paddingBottom:'10px', fontSize:'large', color:'black'}}>가구이름 더길수도있음 뫄뫄가구솨솨가구</div>
                                    
                                </div>
                            </td>
                            <td>2021-05-13</td>
                            <td>123123123</td>
                            <td>70,000원 (2개)</td>
                            <td>구매 확정</td>
                        </tr>

                        <tr>
                            <td>
                                <div className="col-sm-3" style={{padding:'1em 0em 1em 1em'}}>
                                    <img className="ordercropping" src="http://cdn.011st.com/11dims/resize/600x600/quality/75/11src/pd/17/8/4/3/3/2/4/XaCvd/10843324_B.jpg"/>
                                </div>
                                <div className="col-sm-6" style={{padding:'1em 0em', textAlign:'left'}}>
                                    <div style={{ fontWeight:'bolder', fontSize:'small', color:'gray'}}>회사이름 어쩌구저쩌구 쫌 길수도</div>
                                    <div style={{ paddingTop:'5px', paddingBottom:'10px', fontSize:'large', color:'black'}}>가구이름 더길수도있음 뫄뫄가구솨솨가구</div>
                                    
                                </div>
                            </td>
                            <td>2021-05-13</td>
                            <td>123123123</td>
                            <td>70,000원 (2개)</td>
                            <td>구매 확정</td>
                        </tr>
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