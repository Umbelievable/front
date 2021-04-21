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
            searchType: query.searchType,
            searchKeyword: query.searchKeyword
        }

        this.createBoard = this.createBoard.bind(this);

        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.changeKeywordHandler = this.changeKeywordHandler.bind(this);	
    }

    changeTypeHandler = (event) => {
        this.setState({searchType: event.target.value});
    }

    changeKeywordHandler = (event) => {
        this.setState({searchKeyword: event.target.value});
    }
   
    componentDidMount() { 
        BoardService.searchBoards(this.state.searchType, this.state.searchKeyword).then((res) => {
            this.setState({ boards: res.data});
        });
    }

    createBoard() {
        this.props.history.push('/create-board/_create');
    }

    readBoard(idx) {
        this.props.history.push(`/read-board/${idx}`);
    }

    searchBoard(searchType, searchKeyword){
        this.props.history.push(`/search-board?searchType=${searchType}&searchKeyword=${searchKeyword}`);
        
    }

    render() {
        return (
            <div className="main-content">
                <div className="row row-inline-block small-spacing">
				<div className="col-xs-12">
				<div className="box-content">
				<div className="clearfix"><h4 className="box-title pull-left"></h4></div>

            

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
                <div className="btn_wrap text-right">
                    <button className="btn btn-primary waves-effect waves-light" onClick={this.createBoard}>Write</button>
			    </div>
            </div>
				</div>
				</div>
				</div>
			</div>
        );
    }
}

export default SearchBoardComponent;