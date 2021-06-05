import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import MemberService from '../service/MemberService';
import RecommendService from '../service/RecommendService';
import ItemService from '../service/ItemService';
import LikeService from '../service/LikeService';

class MainBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recommend: [],
            itemInfo: [],
            arr: [],
            arr2: []
        }
    }

    readItem(pdNo, cateNo, subcateNo) {
        var mem = MemberService.getCurrentUser();
        if(mem){ // 로그인 한 사람이면 
            sessionStorage.setItem("likePd", pdNo);
            sessionStorage.setItem("likeCt", cateNo);
            sessionStorage.setItem("likeSct", subcateNo);
        } 
        this.props.history.push(`/read-item?pdNo=${pdNo}&cateNo=${cateNo}&subcateNo=${subcateNo}`);
    }

    componentDidMount() {
        var i=0;
        var mem = MemberService.getCurrentUser();
        if(!mem){  // 로그인 안했으면
            RecommendService.getRecommendProduct().then((res) => {
                for (var x in res.data) {
                    this.setState({recommend: this.state.recommend.concat(x).sort(function(a, b){ // 8개 딕셔너리 받아오면 
                        return a == b ? 0 : (a > b ? 1 : -1)
                    })});
                }
    
                for(i=0; i<4; i++){
                    const item = this.state.recommend[i].split('_');
                    ItemService.getCertainItem(item[0], item[2], item[1]).then( resul => {
                        this.setState({itemInfo: this.state.itemInfo.concat(resul.data)});
                        this.setState({arr: this.state.arr.concat(
                            <div className="mainCrop" onClick={()=>this.readItem(resul.data.pdNo, resul.data.cateNo, resul.data.subcateNo)}>
                                <img src={resul.data.pdImg}/>
                            </div>
                        )});
                    });
                }
    
                for(i=4; i<this.state.recommend.length; i++){
                    const item = this.state.recommend[i].split('_');
                    ItemService.getCertainItem(item[0], item[2], item[1]).then( resul => {
                        this.setState({itemInfo: this.state.itemInfo.concat(resul.data)});
                        this.setState({arr2: this.state.arr2.concat(
                            <div className="mainCrop" onClick={()=>this.readItem(resul.data.pdNo, resul.data.cateNo, resul.data.subcateNo)}>
                                <img src={resul.data.pdImg}/>
                            </div>
                        )});
                    });
                }
            });

        }

        else{ // 로그인 했으면
            // 유저 좋아요 목록 가져오기 -> 좋아요 목록에 있는건 칠한 하트로 뽑아야하고 다시 눌렀을때 삭제도 할 수 있게
            LikeService.getLikelist(MemberService.getCurrentUser().id).then((res) => { // 좋아요 목록 가져와서
                // 아예 처음이면 
                var pdNo;
                var cateNo;
                var subcateNo; 

                if(sessionStorage.getItem("likePd")) { // 메인에서 다른거 하나 누르고 왔으면 그 상품으로
                    pdNo = sessionStorage.getItem("likePd");
                    cateNo = sessionStorage.getItem("likeCt");
                    subcateNo = sessionStorage.getItem("likeSct");
                }
                else { // 처음 누르는거면 // 사용자가 좋아하는 상품의 첫번째
                    pdNo = res.data[0].pdNo;
                    cateNo = res.data[0].categoryNo;
                    subcateNo = res.data[0].subcateNo;
                }

                let item ={ // post로 보내기
                    pdNo: pdNo,
                    categoryNo: cateNo,
                    subcateNo: subcateNo  
                };

                RecommendService.getRecommendProductById(item).then((resul) => {
                    for (var x in resul.data) {
                        this.setState({recommend: this.state.recommend.concat(x).sort(function(a, b){ // 8개 딕셔너리 받아오면 
                            return a == b ? 0 : (a > b ? 1 : -1)
                        })});
                    }
        
                    for(i=0; i<4; i++){
                        const item = this.state.recommend[i].split('_');
                        ItemService.getCertainItem(item[0], item[2], item[1]).then( result => {
                            this.setState({itemInfo: this.state.itemInfo.concat(result.data)});
                            this.setState({arr: this.state.arr.concat(
                                <div className="mainCrop" onClick={()=>this.readItem(result.data.pdNo, result.data.cateNo, result.data.subcateNo)}>
                                    <img src={result.data.pdImg}/>
                                </div>
                                
                            )});
                        });
                    }
        
                    for(i=4; i<this.state.recommend.length; i++){
                        const item = this.state.recommend[i].split('_');
                        ItemService.getCertainItem(item[0], item[2], item[1]).then( result => {
                            this.setState({itemInfo: this.state.itemInfo.concat(result.data)});
                            this.setState({arr2: this.state.arr2.concat(
                                <div className="mainCrop" onClick={()=>this.readItem(result.data.pdNo, result.data.cateNo, result.data.subcateNo)}>
                                    <img src={result.data.pdImg}/>
                                </div>
                            )});
                        });
                    }
                
                });
                    
            });
        }
    }

    viewItem(){
        var forArray = [];
        forArray.push(
            <Carousel.Item style={{textAlign: 'center'}} interval={3000}> {this.state.arr} </Carousel.Item> );
        forArray.push(
            <Carousel.Item style={{textAlign: 'center'}} interval={3000}> {this.state.arr2} </Carousel.Item> );
        return forArray;
    }

    render() {
        return (
        <div className="main-content">
            <div className="row row-inline-block small-spacing">
            <div className="col-xs-12">
            <div className="box-content">

            <Carousel>
            {
                this.viewItem()
            }
            </Carousel>
        
            </div>
            </div>
            </div>
        </div>

        );
    }
}

export default MainBoardComponent;