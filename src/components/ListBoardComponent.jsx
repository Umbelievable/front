import React, { Component } from 'react';
import BoardService from '../service/BoardService';
import CommentService from '../service/CommentService';

class ListBoardComponent extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            p_num: 1,
            paging: {},
            boards: [],
            finalboards: []
        }
        this.createBoard = this.createBoard.bind(this);
    }

    componentDidMount() {
        BoardService.getBoards(this.state.p_num).then((res) => {
            this.setState({ 
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                boards: res.data.list});
                for(var j=0; j<res.data.list.length; j++){
                    const board = res.data.list[j];
                    CommentService.getComments(board.qboardNo).then(resul => {
                        const qb = [{ "qboardNo": board.qboardNo, 
                                        "qboardTitle": board.qboardTitle, 
                                        "qboardWriter": board.qboardWriter, 
                                        "qboardInsertTime": board.qboardInsertTime, 
                                        "qboardViews": board.qboardViews,
                                        "qboardFileUrl": board.qboardFileUrl, 
                                        "comment": resul.data.length
                                    }];
                        this.setState({finalboards: this.state.finalboards.concat(qb).sort(function(a, b){ 
                            return b.qboardNo - a.qboardNo
                        })});
                    });
                }
        });

        
        //qna 통합 검색
        var searchBar = document.getElementById("searchBar");
        searchBar.placeholder="DZBZ QnA 검색";

        // 네비바에 현재 위치 표시하기 
        var header = document.getElementById("navbar");
        var qnabtn = document.getElementById("qnabtn");
        var btns = header.getElementsByClassName("mybtn");
        for (var i = 0; i < btns.length; i++) {
            btns[i].className = "mybtn";
        }
        qnabtn.className += " active";
    }

    createBoard() {
        this.props.history.push('/create-board/_create');
    }

    readBoard(qboardNo) {
        this.props.history.push(`/read-board/${qboardNo}`);
    }

    goToUpdate = (event) => {
        event.preventDefault();
        this.props.history.push(`/create-board/${this.state.qboardNo}`);
    }

    listBoard(p_num) {
        console.log("pageNum : "+ p_num);
        BoardService.getBoards(p_num).then((res) => {
            this.setState({ finalboards: [] });
            this.setState({ 
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                boards: res.data.list});
                for(var j=0; j<res.data.list.length; j++){
                    const board = res.data.list[j];
                    CommentService.getComments(board.qboardNo).then(resul => {
                        const qb = [{ "qboardNo": board.qboardNo, 
                                        "qboardTitle": board.qboardTitle, 
                                        "qboardWriter": board.qboardWriter, 
                                        "qboardInsertTime": board.qboardInsertTime, 
                                        "qboardViews": board.qboardViews,
                                        "qboardFileUrl": board.qboardFileUrl, 
                                        "comment": resul.data.length
                                    }];
                        this.setState({finalboards: this.state.finalboards.concat(qb).sort(function(a, b){ 
                            return b.qboardNo - a.qboardNo
                        })});
                    });
                }
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
            <div className="main-content"> 
                <div className="row row-inline-block small-spacing">
				<div className="col-xs-12">                   
				<div className="box-content">   

                <div style={{padding:'0em 3em'}} className="table-responsive clearfix">
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
                            this.state.finalboards.map(
                                board => 
                                <tr key = {board.qboardNo}>
                                    <td> {board.qboardNo} </td>
                                    <td style={{textAlign:'left', paddingLeft:'3em'}}> <a href={'/read-board/'+board.qboardNo}>{board.qboardTitle} &nbsp;[{board.comment}]&nbsp;</a>
                                    {
                                        (board.qboardFileUrl) && (<span style={{color: "gray"}} className="glyphicon glyphicon-picture" aria-hidden="true"></span>)
                                    }
                                    </td>
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

                <div style={{textAlign:'center'}}>
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