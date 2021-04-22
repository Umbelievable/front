import React, { Component } from 'react';


class CustomerServiceBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
           
        }

    }

    componentDidMount() {
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
        <div class="main-content">
            <div class="row row-inline-block small-spacing">
            <div class="col-xs-12">
            <div class="box-content">
            <div class="clearfix"><h4 class="box-title pull-left"></h4></div>

        
            </div>
            </div>
            </div>
        </div>

        );
    }
}

export default CustomerServiceBoardComponent;