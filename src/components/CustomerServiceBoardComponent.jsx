import React, { Component } from 'react';


class CustomerServiceBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
           
        }

    }

    componentDidMount() {
        // DZBZ 통합 검색
        var searchBar = document.getElementById("searchBar");
        searchBar.placeholder="DZBZ 통합 검색";

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
        <div className="main-content">
            <div className="row row-inline-block small-spacing">
            <div className="col-xs-12">
            <div className="box-content">
            <div className="clearfix"><h4 className="box-title pull-left"></h4></div>

        
            </div>
            </div>
            </div>
        </div>

        );
    }
}

export default CustomerServiceBoardComponent;