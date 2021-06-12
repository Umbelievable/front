import React, { Component } from 'react';
import BoardService from '../service/BoardService';
import CommentService from '../service/CommentService';
import MemberService from '../service/MemberService';
import SignIn from "./SignIn";

class ListBoardComponent extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            isModalOpen: false,
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

    openModal = (event) => {
        this.setState({ isModalOpen: true });
    }
    closeModal = (event) => {
        this.setState({ isModalOpen: false });
    }

    createBoard() {
        if(!MemberService.getCurrentUser()){
            alert('로그인 후 이용 가능합니다.');
            this.openModal();
        }
        else{
            this.props.history.push('/create-board/_create');
        }
        
    }

    readBoard(qboardNo) {
        if(!MemberService.getCurrentUser()){
            alert('로그인 후 이용 가능합니다.');
            this.openModal();
        }
        else{
            this.props.history.push(`/read-board/${qboardNo}`);
        }
        
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
            {
                (this.state.p_num == page) ? (<a style={{backgroundColor:"rgb(213, 224, 220)"}} className="page-link" onClick = {() => this.listBoard(page)}>{page}</a>)
                : (<a className="page-link" onClick = {() => this.listBoard(page)}>{page}</a>)
            }
        </li>
        ));
    }

    isPagingPrev(){
        if (this.state.paging.prev) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listBoard( (this.state.paging.currentPageNum - 1) )} tabindex="-1">&lt;</a>
                </li>
            );
        }
    }

    isPagingNext(){
        if (this.state.paging.next) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listBoard( (this.state.paging.currentPageNum + 1) )} tabIndex="-1">&gt;</a>
                </li>
            );
        }
    }

    isMoveToFirstPage() {
        if (this.state.p_num != 1) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listBoard(1)} tabIndex="-1">&lt;&lt;</a>
                </li>
            );
        }
    }

    isMoveToLastPage() {
        if (this.state.p_num != this.state.paging.pageNumCountTotal) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listBoard( (this.state.paging.pageNumCountTotal) )} tabIndex="-1">&gt;&gt;</a>
                </li>
            );
        }
    }

    showDate(date){
        return (date).replace('T', " ");
    }


  
    render() {
        return (
            <div className="main-content"> 
                <div className="row row-inline-block small-spacing">
				<div className="col-xs-12">                   
				<div className="box-content">
                <SignIn isOpen={this.state.isModalOpen} close={this.closeModal} />   

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
                                    <td onClick={()=>this.readBoard(board.qboardNo)} style={{textAlign:'left', paddingLeft:'3em', color: 'rgb(87,81,76)'}}>{board.qboardTitle}&nbsp;
                                    {
                                        (board.qboardFileUrl) && (<span style={{color: "gray"}} className="glyphicon glyphicon-picture" aria-hidden="true"></span>)
                                    }
                                    &nbsp;[{board.comment}]&nbsp;
                                    </td>
                                    <td> {board.qboardWriter} </td>
                                    <td> {this.showDate(board.qboardInsertTime)} </td>
                                    <td> {board.qboardViews} </td>
                                </tr>
                            )
                            }
                        </tbody>
                    </table>
                    <div className="btn_wrap text-right">
                        <button className="btn-main" onClick={this.createBoard}>Write</button>
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