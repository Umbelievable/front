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
<<<<<<< HEAD
=======
            searchBoard: query.searchBoard,
            searchType: query.searchType,
>>>>>>> 8c4fad14df0e9bbeb576640f19a25503ec180052
            searchKeyword: query.searchKeyword
        }

        this.createBoard = this.createBoard.bind(this);
<<<<<<< HEAD
        this.changeKeywordHandler = this.changeKeywordHandler.bind(this);	
    }

=======

        this.changeBoardHandler = this.changeBoardHandler.bind(this);
        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.changeKeywordHandler = this.changeKeywordHandler.bind(this);	
    }


    changeBoardHandler = (event) => {
        this.setState({searchBoard:event.target.value});
    }

    changeTypeHandler = (event) => {
        this.setState({searchType: event.target.value});
    }
>>>>>>> 8c4fad14df0e9bbeb576640f19a25503ec180052

    changeKeywordHandler = (event) => {
        this.setState({searchKeyword: event.target.value});
    }
   
    componentDidMount() { 
        //백 수정하고 서비스 수정하고 이부분 다시수정! searchBoard
<<<<<<< HEAD
        BoardService.searchBoards(this.state.searchKeyword).then((res) => {
=======
        BoardService.searchBoards(this.state.searchType, this.state.searchKeyword).then((res) => {
>>>>>>> 8c4fad14df0e9bbeb576640f19a25503ec180052
            this.setState({ boards: res.data});
        });
    }

    createBoard() {
        this.props.history.push('/create-board/_create');
    }

    readBoard(idx) {
        this.props.history.push(`/read-board/${idx}`);
    }

<<<<<<< HEAD
    searchBoard(searchKeyword){
        this.props.history.push(`/search-board?searchKeyword=${searchKeyword}`);
=======
    searchBoard(searchBoard, searchType, searchKeyword){
        this.props.history.push(`/search-board?searchBoard=${searchBoard}&searchType=${searchType}&searchKeyword=${searchKeyword}`);
>>>>>>> 8c4fad14df0e9bbeb576640f19a25503ec180052
        
    }

    render() {
        return (
            <div className="main-content">
                <div className="row row-inline-block small-spacing">
				<div className="col-xs-12">
				<div className="box-content">
<<<<<<< HEAD
				<div className="clearfix"><h4 className="box-title pull-left"></h4></div>

=======


>>>>>>> 8c4fad14df0e9bbeb576640f19a25503ec180052
            
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
                            //백 수정하고 서비스 수정하고 이 부분 다시 수정!
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