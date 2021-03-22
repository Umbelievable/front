import React, { Component } from 'react';


class MainBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
           
        }

    }


    render() {
        return (
        <div class="main-content">
            <div class="row row-inline-block small-spacing">
            <div class="col-xs-12">
            <div class="box-content">
            <div class="clearfix"><h4 class="box-title pull-left"></h4></div>

            <div class="album py-5 bg-light">
            <div class="container">

            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

                <div class="col">
                    <div class="card shadow-sm">
                    <div width="300px" height="300px" style={{overflow: 'hidden'},{display: 'flex'},{alignItems: 'center'},{justifyContent: 'center'}}>
                        <img width="400px" height="400px" src="https://shopping-phinf.pstatic.net/main_2592100/25921002522.20210208193230.jpg?type=f640"/>
                    </div>
                    <div class="card-body">
                        <p class="card-text">추천 아이템1</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">9 mins</small>
                    </div>
                    </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card shadow-sm">
                    <div width="300px" height="300px" style={{overflow: 'hidden'},{display: 'flex'},{alignItems: 'center'},{justifyContent: 'center'}}>
                        <img width="400px" height="400px" src="https://shopping-phinf.pstatic.net/main_1414725/14147251300.20210305110358.jpg?type=f640"/>
                    </div>
                    <div class="card-body">
                        <p class="card-text">추천 아이템2</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">9 mins</small>
                    </div>
                    </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card shadow-sm">
                    <div width="300px" height="300px" style={{overflow: 'hidden'},{display: 'flex'},{alignItems: 'center'},{justifyContent: 'center'}}>
                        <img width="400px" height="400px" src="http://cdn.011st.com/11dims/resize/600x600/quality/75/11src/pd/17/8/4/3/3/2/4/XaCvd/10843324_B.jpg"/>
                    </div>
                    <div class="card-body">
                        <p class="card-text">추천 아이템3</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">9 mins</small>
                    </div>
                    </div>
                    </div>
                </div>

        
            </div>
            </div>
            </div>      
            </div>
            </div>
            </div>
        </div>

        );
    }
}

export default MainBoardComponent;