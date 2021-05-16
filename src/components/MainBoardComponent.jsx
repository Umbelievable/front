import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'

class MainBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

    }

    componentDidMount() {
        

    }

    viewItem(){
        var forArray = [];
        //var data = this.state.finalboards;

        for(var i=0; i<3; i++){
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