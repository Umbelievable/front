import { Dropdown } from 'bootstrap';
import React, { Component } from 'react';
import BoardService from '../service/BoardService';
import queryString from 'query-string';


class SearchBoardComponent extends Component {
    constructor(props) {
        const query = queryString.parse(window.location.search);

        super(props)
        this.state = { 
            boards: [],
            searchKeyword: query.searchKeyword
        }
        this.changeKeywordHandler = this.changeKeywordHandler.bind(this);	
    }

    changeKeywordHandler = (event) => {
        this.setState({searchKeyword: event.target.value});
    }
   
    componentDidMount() { 
        BoardService.searchBoards(this.state.searchKeyword).then((res) => {
            this.setState({ boards: res.data});
        });
        //qna 통합 검색
        var searchBar = document.getElementById("searchBar");
        searchBar.placeholder="DZBZ QnA 검색";
    }

    readBoard(qboardNo) {
        window.location.replace(`/read-board/${qboardNo}`);
    }

    render() {
        return (
            <div className="main-content">
                <div className="row row-inline-block small-spacing">
				<div className="col-xs-12">
				<div className="box-content">

                <div style={{textAlign:'center', fontSize:'larger'}}><span style={{color: 'black'}} className="glyphicon glyphicon-search" aria-hidden="true"></span><b>&nbsp;"{this.state.searchKeyword}"</b>&nbsp;검색 결과</div>
                <br/>
                <div className="table-responsive clearfix">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>번호 </th>
                                <th>제목 </th>
                                <th>작성자 </th>
                                <th>등록일 </th>
                                <th>조회수 </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            this.state.boards.map(
                                board => 
                                <tr key = {board.qboardNo}>
                                    <td> {board.qboardNo} </td>
                                    <td> <a href={'/read-board/'+board.qboardNo}>{board.qboardTitle} </a> </td>
                                    <td> {board.qboardWriter} </td>
                                    <td> {board.qboardInsertTime} </td>
                                    <td> {board.qboardViews} </td>
                                </tr>
                            )
                            }
                        </tbody>
                    </table>
                </div>


				</div>
				</div>
				</div>
			</div>
        );
    }
}

export default SearchBoardComponent;