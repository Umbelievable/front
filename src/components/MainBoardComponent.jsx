import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import MemberService from '../service/MemberService';
import RecommendService from '../service/RecommendService';
import ItemService from '../service/ItemService';


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
        this.props.history.push(`/read-item?pdNo=${pdNo}&cateNo=${cateNo}&subcateNo=${subcateNo}`);
    }

    componentDidMount() {
        var i=0;
        if(MemberService.getCurrentUser().id){ // 로그인 안했으면 인기상품 8개 // 지금 테스트 중이니까 일단 반대로
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
                            <img onClick={()=>this.readItem(resul.data.pdNo, resul.data.cateNo, resul.data.subcateNo)} style={{padding:'15px', height:'380px'}} className="d-inline w-25" src={resul.data.pdImg}/>
                        )});
                    });
                }
    
                for(i=4; i<this.state.recommend.length; i++){
                    const item = this.state.recommend[i].split('_');
                    ItemService.getCertainItem(item[0], item[2], item[1]).then( resul => {
                        this.setState({itemInfo: this.state.itemInfo.concat(resul.data)});
                        this.setState({arr2: this.state.arr2.concat(
                            <img onClick={()=>this.readItem(resul.data.pdNo, resul.data.cateNo, resul.data.subcateNo)} style={{padding:'15px', height:'380px'}} className="d-inline w-25" src={resul.data.pdImg}/>
                        )});
                    });
                }
            });
        }
        else{ // 로그인했으면 
            // 다른거 뽑기

        }

       

    }

    viewItem(){
        var forArray = [];
        forArray.push(
            <Carousel.Item interval={2000}> {this.state.arr} </Carousel.Item> );
        forArray.push(
            <Carousel.Item interval={2000}> {this.state.arr2} </Carousel.Item> );
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