import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'

class MainBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
           
        }

    }

    componentDidMount() {
        var searchBar = document.getElementById("searchBar");
        searchBar.placeholder="DZBZ 통합 검색";

        var header = document.getElementById("navbar");
        var homebtn = document.getElementById("homebtn");
        var btns = header.getElementsByClassName("mybtn");
        for (var i = 0; i < btns.length; i++) {
            btns[i].className = "mybtn"
        }
        homebtn.className += " active";

    }


    render() {
        return (
        <div className="main-content">
            <div className="row row-inline-block small-spacing">
            <div className="col-xs-12">
            <div className="box-content">
            <div className="clearfix"><h4 className="box-title pull-left"></h4></div>

            
            <Carousel>
                <Carousel.Item interval={2000}>
    
                    <img style={{padding:'15px'}} className="d-inline w-25" src="https://shopping-phinf.pstatic.net/main_2592100/25921002522.20210208193230.jpg?type=f640"/>
                    <img style={{padding:'15px'}} className="d-inline w-25" src="https://shopping-phinf.pstatic.net/main_2592100/25921002522.20210208193230.jpg?type=f640"/>
                    <img style={{padding:'15px'}} className="d-inline w-25" src="https://shopping-phinf.pstatic.net/main_2592100/25921002522.20210208193230.jpg?type=f640"/>
                    <img style={{padding:'15px'}} className="d-inline w-25" src="https://shopping-phinf.pstatic.net/main_2592100/25921002522.20210208193230.jpg?type=f640"/>
                    
                    <Carousel.Caption>
                    <h3> </h3>
                    <p> </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img style={{padding:'15px'}} className="d-inline w-25" src="https://shopping-phinf.pstatic.net/main_1414725/14147251300.20210305110358.jpg?type=f640"/>
                    <img style={{padding:'15px'}} className="d-inline w-25" src="https://shopping-phinf.pstatic.net/main_1414725/14147251300.20210305110358.jpg?type=f640"/>
                    <img style={{padding:'15px'}} className="d-inline w-25" src="https://shopping-phinf.pstatic.net/main_1414725/14147251300.20210305110358.jpg?type=f640"/>
                    <img style={{padding:'15px'}} className="d-inline w-25" src="https://shopping-phinf.pstatic.net/main_1414725/14147251300.20210305110358.jpg?type=f640"/>
                   
                    <Carousel.Caption>
                    <h3> </h3>
                    <p> </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img style={{padding:'15px'}} className="d-inline w-25" src="http://cdn.011st.com/11dims/resize/600x600/quality/75/11src/pd/17/8/4/3/3/2/4/XaCvd/10843324_B.jpg"/>
                    <img style={{padding:'15px'}} className="d-inline w-25" src="http://cdn.011st.com/11dims/resize/600x600/quality/75/11src/pd/17/8/4/3/3/2/4/XaCvd/10843324_B.jpg"/>
                    <img style={{padding:'15px'}} className="d-inline w-25" src="http://cdn.011st.com/11dims/resize/600x600/quality/75/11src/pd/17/8/4/3/3/2/4/XaCvd/10843324_B.jpg"/>
                    <img style={{padding:'15px'}} className="d-inline w-25" src="http://cdn.011st.com/11dims/resize/600x600/quality/75/11src/pd/17/8/4/3/3/2/4/XaCvd/10843324_B.jpg"/>
                    
                    <Carousel.Caption>
                    <h3> </h3>
                    <p> </p>
                    </Carousel.Caption>
                </Carousel.Item>
                </Carousel>

                

            </div>
            </div>
            </div>
        </div>

        );
    }
}

export default MainBoardComponent;