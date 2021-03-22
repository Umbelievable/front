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
            <div class="main-content">
                <div class="row row-inline-block small-spacing">
				<div class="col-xs-12">
				<div class="box-content">
				<div class="clearfix"><h4 class="box-title pull-left"></h4></div>

            

            <div class="table-responsive clearfix">
			    <table class="table table-hover">
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
                            <tr key = {board.idx}>
                                <td> {board.idx} </td>
                                <td> <a href={'/read-board/'+board.idx}>{board.title} </a> </td>
                                <td> {board.writer} </td>
                                <td> {board.insertTime} </td>
                                <td> {board.viewCnt} </td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
                <div class="btn_wrap text-right">
                    <button class="btn btn-primary waves-effect waves-light" onClick={this.createBoard}>Write</button>
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