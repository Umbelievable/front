import React, { Component } from 'react';
import BoardService from '../service/BoardService';
import CommentService from '../service/CommentService';
import queryString from 'query-string';


class SearchBoardComponent extends Component {
    constructor(props) {
        const query = queryString.parse(window.location.search);

        super(props)
        this.state = { 
            boards: [],
            finalboards: [],
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
            // 제목 옆에 댓글 수 표시하기 
            for(var j=0; j<res.data.length; j++){
                const board = res.data[j];
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
    }

    readBoard(qboardNo) {
        this.props.history.push(`/read-board/${qboardNo}`);
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
                            this.state.finalboards.map(
                                board => 
                                <tr key = {board.qboardNo}>
                                    <td> {board.qboardNo} </td>
                                    <td style={{textAlign:'left', paddingLeft:'3em'}}> <a style={{ color: 'rgb(87,81,76)' }} href={'/read-board/'+board.qboardNo}>{board.qboardTitle}&nbsp;
                                    {
                                        (board.qboardFileUrl) && (<span style={{color: "gray"}} className="glyphicon glyphicon-picture" aria-hidden="true"></span>)
                                    }
                                    &nbsp;[{board.comment}]&nbsp;</a>
                                    </td>
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