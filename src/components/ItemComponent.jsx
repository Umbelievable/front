import React, { Component } from 'react';
import queryString from 'query-string';
import ItemService from '../service/ItemService';

class ItemComponent extends Component{
    constructor(props){
        const query = queryString.parse(window.location.search);

        super(props)
        this.state = {
            itemInfo: [],
            cateNo: query.cateNo,
            thisCateNo: query.thisCateNo,
            pdNo: query.pdNo,
            reviews: [],  //리뷰목록
            reviewResult: []  //리뷰키워드그래프 데이터타입 아직모름.
        }
    }

    componentDidMount(){
        ItemService.getCertainItem(this.state.pdNo, this.state.cateNo, this.state.thisCateNo).then( res => {
            this.setState({itemInfo: res.data});
        })
    }


    render(){
     
        return (
            <div className="main-content"> 
            <div className="row row-inline-block small-spacing">
            <div className="col-xs-12">                   
            <div className="box-content">
            <div className="clearfix"><h4 className="box-title pull-left"></h4>
            
            
            <div>
                {this.state.itemInfo.map(
                    item=>
                    <div key={item.pdNo, item.cateNo, item.thisCateNo}>
                        <div style={{display:'inline', height:'400px'}}>
                            <img src={item.pdImg} style={{display:'inline-block', width:'30%', height:'400px', alignItems:'flex-start', justifyContent:'space-around'}}/>

                            <div style={{ display:'inline-block',margin:'0px 40px',width:'30%',height:'400px'}}>
                                <div style={{ fontWeight:'bolder', fontSize:'23px'}}>{item.pdTitle}</div>
                                <br/>
                                <div style={{ fontWeight:'bolder', fontSize:'20px',color:'#ea4335'}}>{item.pdPrice}</div>
                                    <button className="btn btn-primary waves-effect waves-light" style={{marginTop:'130px'}}>BUY NOW</button>
                                    <button className="btn btn-primary waves-effect waves-light"style={{marginLeft:"10px",marginTop:'130px'}}>CART</button>
                            </div>  
                            <div style={{ display:'inline-block',margin:'0px 40px',width:'25%',height:'400px'}}>
                                <div style={{ fontWeight:'bolder', fontSize:'23px'}}>리뷰 분석 결과</div>
                            </div>
                        </div>
                  </div>
                )}
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
                        
                            <tr>
                                <td>0</td>
                                <td>5</td>
                                <td>10000say</td>
                                <td>ㄷㅈㅂㅈ</td>
                                <td>21.04.19.</td>
                               
                        </tr>
                    </tbody>
                </table>
            </div>

                {/* <div className ="row">
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
            </div> */}
               
            

            </div>
            </div>
            </div>
            </div>
            </div>	
        );
    }

}

export default ItemComponent;