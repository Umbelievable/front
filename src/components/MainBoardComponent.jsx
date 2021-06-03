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
            item: []
        }

    }

    componentDidMount() {
        RecommendService.getRecommendProduct().then((res) => {
            this.setState({ recommend: res.data }); // 8개 딕셔너리 받아오면 
            // for(var i=0; i<res.data.length; i++){

            // }
               
        });

        
    }

    viewItem(){
        var forArray = [];

        for(var i=0; i<2; i++){
            //const pNo = data[i].pboardNo; // 글 이동
            forArray.push(
                <Carousel.Item interval={2000}>
                    <img style={{padding:'15px'}} className="d-inline w-25" src="https://shopping-phinf.pstatic.net/main_2592100/25921002522.20210208193230.jpg?type=f640"/>
                    <img style={{padding:'15px'}} className="d-inline w-25" src="https://shopping-phinf.pstatic.net/main_2592100/25921002522.20210208193230.jpg?type=f640"/>
                    <img style={{padding:'15px'}} className="d-inline w-25" src="https://shopping-phinf.pstatic.net/main_2592100/25921002522.20210208193230.jpg?type=f640"/>
                    <img style={{padding:'15px'}} className="d-inline w-25" src="https://shopping-phinf.pstatic.net/main_2592100/25921002522.20210208193230.jpg?type=f640"/>
                </Carousel.Item>
            );
        }
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