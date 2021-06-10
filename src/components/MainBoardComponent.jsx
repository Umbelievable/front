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
            arr2: [],
            itemList: []
        }
    }

    readItem(pdNo, cateNo, subcateNo) {
        this.props.history.push(`/read-item?pdNo=${pdNo}&cateNo=${cateNo}&subcateNo=${subcateNo}`);
    }

    shuffleArray (array) { // 배열 shuffle 함수
        let i = array.length - 1;
        for (; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
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
    
                for(i=0; i<3; i++){
                    const item = this.state.recommend[i].split('_');
                    ItemService.getCertainItem(item[0], item[2], item[1]).then( resul => {
                        this.setState({itemInfo: this.state.itemInfo.concat(resul.data)});
                        this.setState({arr: this.state.arr.concat(
                            <div style={{paddingBottom: '2em'}} className="col" onClick={()=>this.readItem(resul.data.pdNo, resul.data.cateNo, resul.data.subcateNo)}>
                                <div style={{paddingBottom: '2em'}}>
                                <div className="maincropping">
                                    <img src={resul.data.pdImg}/>
                                </div>
                                <div className="card-body">
                                    <small className="card-text" style={{fontSize:'12px', fontWeight:'bold', color:'rgb(178, 178, 178)'}}>{resul.data.pdMall}</small>
                                    <small className="card-text" style={{display:'block', fontWeight:'bold', color:'rgb(73,117,104)', fontSize:'13px', height:'62px'}}>{resul.data.pdTitle}</small>
                                </div>
                                </div>
                            </div>
                        )});
                    });
                }
    
                for(i=3; i<this.state.recommend.length; i++){
                    const item = this.state.recommend[i].split('_');
                    ItemService.getCertainItem(item[0], item[2], item[1]).then( resul => {
                        this.setState({itemInfo: this.state.itemInfo.concat(resul.data)});
                        this.setState({arr2: this.state.arr2.concat(
                            <div style={{paddingBottom: '2em'}} className="col" onClick={()=>this.readItem(resul.data.pdNo, resul.data.cateNo, resul.data.subcateNo)}>
                                <div style={{paddingBottom: '2em'}}>
                                <div className="maincropping">
                                    <img src={resul.data.pdImg}/>
                                </div>
                                <div className="card-body">
                                    <small className="card-text" style={{fontSize:'12px', fontWeight:'bold', color:'rgb(178, 178, 178)'}}>{resul.data.pdMall}</small>
                                    <small className="card-text" style={{display:'block', fontWeight:'bold', color:'rgb(73,117,104)', fontSize:'13px', height:'62px'}}>{resul.data.pdTitle}</small>
                                </div>
                                </div>
                            </div>
                        )});
                    });
                }
            });

        }

        else{ // 로그인 했으면
            // 유저 좋아요 목록 가져오기 -> 좋아요 목록에 있는건 칠한 하트로 뽑아야하고 다시 눌렀을때 삭제도 할 수 있게
            LikeService.getLikelist(MemberService.getCurrentUser().id).then((res) => { // 좋아요 목록 가져와서
                const r = this.shuffleArray(res.data); // 셔플링
                ItemService.getCertainItem(r[0].pdNo, r[0].categoryNo, r[0].subcateNo).then( res1 => { // 디폴트로 출력할 0번째 아이템
                    this.setState({itemList: this.state.itemList.concat(res1.data)}); // 먼저 넣고
                    let item ={ // post로 보내려고
                        pdNo: r[0].pdNo,
                        categoryNo: r[0].categoryNo,
                        subcateNo: r[0].subcateNo  
                    };
                    for(var i=1; i<5; i++){ // 그리고 1~4번째 가져오기
                        ItemService.getCertainItem(r[i].pdNo, r[i].categoryNo, r[i].subcateNo).then( res2 => {
                            this.setState({itemList: this.state.itemList.concat(res2.data)}); // 나머지 네개 넣고
                        });
                    }

                    var first = document.getElementById("cirId_"+r[0].pdNo+"_"+r[0].categoryNo+"_"+r[0].subcateNo); // 첫번째 상품 클릭
                    first.style.border = "5px solid rgb(255, 230, 159)";

                    RecommendService.getRecommendProductById(item).then((res3) => { // 추천상품 받기
                        for (var x in res3.data) {
                            this.setState({recommend: this.state.recommend.concat(x).sort(function(a, b){ // 8개 딕셔너리 받아오면 
                                return a == b ? 0 : (a > b ? 1 : -1)
                            })});
                        }
            
                        for(i=0; i<3; i++){
                            const item = this.state.recommend[i].split('_');
                            ItemService.getCertainItem(item[0], item[2], item[1]).then( res4 => {
                                this.setState({itemInfo: this.state.itemInfo.concat(res4.data)});
                                this.setState({arr: this.state.arr.concat(
                                    <div style={{paddingBottom: '2em'}} className="col" onClick={()=>this.readItem(res4.data.pdNo, res4.data.cateNo, res4.data.subcateNo)}>
                                        <div style={{paddingBottom: '2em'}}>
                                        <div className="maincropping">
                                            <img src={res4.data.pdImg}/>
                                        </div>
                                        <div className="card-body">
                                            <small className="card-text" style={{fontSize:'12px', fontWeight:'bold', color:'rgb(178, 178, 178)'}}>{res4.data.pdMall}</small>
                                            <small className="card-text" style={{display:'block', fontWeight:'bold', color:'rgb(73,117,104)', fontSize:'13px', height:'62px'}}>{res4.data.pdTitle}</small>
                                        </div>
                                        </div>
                                    </div>
                                )});
                            });
                        }
            
                        for(i=3; i<this.state.recommend.length; i++){
                            const item = this.state.recommend[i].split('_');
                            ItemService.getCertainItem(item[0], item[2], item[1]).then( res5 => {
                                this.setState({itemInfo: this.state.itemInfo.concat(res5.data)});
                                this.setState({arr2: this.state.arr2.concat(
                                    <div style={{paddingBottom: '2em'}} className="col" onClick={()=>this.readItem(res5.data.pdNo, res5.data.cateNo, res5.data.subcateNo)}>
                                        <div style={{paddingBottom: '2em'}}>
                                        <div className="maincropping">
                                            <img src={res5.data.pdImg}/>
                                        </div>
                                        <div className="card-body">
                                            <small className="card-text" style={{fontSize:'12px', fontWeight:'bold', color:'rgb(178, 178, 178)'}}>{res5.data.pdMall}</small>
                                            <small className="card-text" style={{display:'block', fontWeight:'bold', color:'rgb(73,117,104)', fontSize:'13px', height:'62px'}}>{res5.data.pdTitle}</small>
                                        </div>
                                        </div>
                                    </div>
                                )});
                            });
                        }
                    });
                });
            });
        }
    }

    viewItem(){
        var forArray = [];
        forArray.push(
            <Carousel.Item style={{textAlign:'right'}} interval={3000}><div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">{this.state.arr}</div></Carousel.Item> );
        forArray.push(
            <Carousel.Item style={{textAlign:'right'}} interval={3000}><div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">{this.state.arr2}</div></Carousel.Item> );
        return forArray;
    }

    changeRecommend(pdNo, cateNo, subcateNo){ // pdNo, cateNo, subcateNo 받아서 
        // 누른거 표시하기
        var i = 0;
        var cirs = document.getElementsByClassName("cirImg"); // 다 비우고
        for (i = 0; i < cirs.length; i++) {
            cirs[i].style.border = "none";
        }
        var tar = document.getElementById("cirId_"+pdNo+"_"+cateNo+"_"+subcateNo); 
        tar.style.border = "5px solid rgb(255, 230, 159)"; // 누른애만

        this.setState({recommend: [], 
                        arr: [], 
                        arr2: [], 
                        itemInfo: []}); // 초기화 하고 

        let item ={ // 다시 post로 보낼 준비
            pdNo: pdNo,
            categoryNo: cateNo,
            subcateNo: subcateNo  
        };
        
        RecommendService.getRecommendProductById(item).then((res) => { // 추천상품 받기
            for (var x in res.data) {
                this.setState({recommend: this.state.recommend.concat(x).sort(function(a, b){ // 8개 딕셔너리 받아오면 
                    return a == b ? 0 : (a > b ? 1 : -1)
                })});
            }

            for(i=0; i<4; i++){
                const item = this.state.recommend[i].split('_');
                ItemService.getCertainItem(item[0], item[2], item[1]).then( res1 => {
                    this.setState({itemInfo: this.state.itemInfo.concat(res1.data)});
                    this.setState({arr: this.state.arr.concat(
                        <div style={{paddingBottom: '2em'}} className="col" onClick={()=>this.readItem(res1.data.pdNo, res1.data.cateNo, res1.data.subcateNo)}>
                            <div style={{paddingBottom: '2em'}}>
                            <div className="maincropping">
                                <img src={res1.data.pdImg}/>
                            </div>
                            <div className="card-body">
                                <small className="card-text" style={{fontSize:'12px', fontWeight:'bold', color:'rgb(178, 178, 178)'}}>{res1.data.pdMall}</small>
                                <small className="card-text" style={{display:'block', fontWeight:'bold', color:'rgb(73,117,104)', fontSize:'13px', height:'62px'}}>{res1.data.pdTitle}</small>
                            </div>
                            </div>
                        </div>
                        
                    )});
                });
            }

            for(i=4; i<this.state.recommend.length; i++){
                const item = this.state.recommend[i].split('_');
                ItemService.getCertainItem(item[0], item[2], item[1]).then( res2 => {
                    this.setState({itemInfo: this.state.itemInfo.concat(res2.data)});
                    this.setState({arr2: this.state.arr2.concat(
                        <div style={{paddingBottom: '2em'}} className="col" onClick={()=>this.readItem(res2.data.pdNo, res2.data.cateNo, res2.data.subcateNo)}>
                            <div style={{paddingBottom: '2em'}}>
                            <div className="maincropping">
                                <img src={res2.data.pdImg}/>
                            </div>
                            <div className="card-body">
                                <small className="card-text" style={{fontSize:'12px', fontWeight:'bold', color:'rgb(178, 178, 178)'}}>{res2.data.pdMall}</small>
                                <small className="card-text" style={{display:'block', fontWeight:'bold', color:'rgb(73,117,104)', fontSize:'13px', height:'62px'}}>{res2.data.pdTitle}</small>
                            </div>
                            </div>
                        </div>
                    )});
                });
            }
        });
    }

    render() {
        return (
        <div className="main-content">
            <div className="row row-inline-block small-spacing">
            <div className="col-xs-12">
            <div className="box-content">
            
            {
                (MemberService.getCurrentUser()) ? (
                    <div>
                        <div style={{textAlign: 'center', fontSize:'25px', fontFamily:'NanumSquareB', color:'rgb(87,81,76)'}}>{MemberService.getCurrentUser().id}님의 관심 상품</div>
                        <div style={{textAlign: 'center', padding:'5px 0em 2em 0em', color:'rgb(142,133,126)'}}>상품을 눌러보세요! 하단에 관련 상품들을 추천해드립니다.</div>
                        
                        <div style={{float:'auto', textAlign: 'center', alignContent:'center', border:'3px solid rgb(59,95,85)', borderRadius:'30px', padding:'2em 0em 2em 0em', margin:'0em 15em 5em 15em'}}>
                        {
                            this.state.itemList.map(
                                item =>
                                <div onClick={()=>this.changeRecommend(item.pdNo, item.cateNo, item.subcateNo)} className="mainCir">
                                    <img id={"cirId_"+item.pdNo+"_"+item.cateNo+"_"+item.subcateNo} src={item.pdImg} className="cirImg"/>
                                </div>
                            )
                        }
                        </div>
                    </div>
                ) : (
                    <div>
                        <div style={{textAlign: 'center', fontSize:'25px', fontFamily:'NanumSquareB', color:'rgb(87,81,76)'}}>뒤집어집 인기 상품</div>
                        <div style={{textAlign: 'center', padding:'1em 0em 2em 0em', color:'rgb(142,133,126)'}}>로그인 하시면 <b style={{color:'rgb(73,117,104)'}}>뒤집어집</b>에서 고객님께 딱! 맞는 제품을 추천해드립니다.</div>
                    </div>
                )
            }
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