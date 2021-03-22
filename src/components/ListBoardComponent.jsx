import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class ListBoardComponent extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            p_num: 1,
            paging: {},
            boards: []
        }
        this.createBoard = this.createBoard.bind(this);
    }

    componentDidMount() {
        BoardService.getBoards(this.state.p_num).then((res) => {
            this.setState({ 
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                boards: res.data.list});
        });
    }

    createBoard() {
        this.props.history.push('/create-board/_create');
    }

    readBoard(idx) {
        this.props.history.push(`/read-board/${idx}`);
    }

    goToUpdate = (event) => {
        event.preventDefault();
        this.props.history.push(`/create-board/${this.state.idx}`);
    }

    listBoard(p_num) {
        console.log("pageNum : "+ p_num);
        BoardService.getBoards(p_num).then((res) => {
            console.log(res.data);
            this.setState({ 
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                boards: res.data.list});
        });
    }

    viewPaging() {
        const pageNums = [];

        for (let i = this.state.paging.pageNumStart; i <= this.state.paging.pageNumEnd; i++ ) {
            pageNums.push(i);
        }

        return (pageNums.map((page) => 
        <li className="page-item" key={page.toString()} >
            <a className="page-link" onClick = {() => this.listBoard(page)}>{page}</a>
        </li>
        ));
        
    }

    isPagingPrev(){
        if (this.state.paging.prev) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listBoard( (this.state.paging.currentPageNum - 1) )} tabindex="-1">Previous</a>
                </li>
            );
        }
    }

    isPagingNext(){
        if (this.state.paging.next) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listBoard( (this.state.paging.currentPageNum + 1) )} tabIndex="-1">Next</a>
                </li>
            );
        }
    }

    isMoveToFirstPage() {
        if (this.state.p_num != 1) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listBoard(1)} tabIndex="-1">Move to First Page</a>
                </li>
            );
        }
    }

    isMoveToLastPage() {
        if (this.state.p_num != this.state.paging.pageNumCountTotal) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listBoard( (this.state.paging.pageNumCountTotal) )} tabIndex="-1">LastPage({this.state.paging.pageNumCountTotal})</a>
                </li>
            );
        }
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

            <div className ="row">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">

                            {
                                this.isMoveToFirstPage()
                            }
                            {
                                this.isPagingPrev()
                            }
                            {
                                this.viewPaging()
                            }
                            {
                                this.isPagingNext()
                            }
                            {
                                this.isMoveToLastPage()
                            }
                        </ul>
                    </nav>
                </div>







				</div>
				</div>
				</div>
			</div>
        );
    }
}

export default ListBoardComponent;