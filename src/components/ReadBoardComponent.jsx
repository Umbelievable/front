import React, { Component } from 'react';
import BoardService from '../service/BoardService';
import CommentService from '../service/CommentService';
import MemberService from '../service/MemberService';

class ReadBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            idx: this.props.match.params.idx,
            board: {},
            boardIdx:'',
            content:'',
            writer:'',
            comments: [],
            isModify:false,
            newComment:'',
            currentUser: { username: "" }
        }

        this.changeContentHandler = this.changeContentHandler.bind(this);
        this.changeCommentContentHandler = this.changeCommentContentHandler.bind(this);

        this.createComment = this.createComment.bind(this);
    }

    changeContentHandler = (event) => {
      this.setState({content: event.target.value});
    }

    changeCommentContentHandler = (event) => {
      this.setState({newComment: event.target.value});
    }

    changeModalHandler = (event) => {
      this.setState({isModify: !this.state.isModify,});
    }

    createComment = (event) => {
      event.preventDefault();
      let comment = {
          boardIdx: this.state.idx,
          content: this.state.content,
          writer: this.state.currentUser.username,
      };
      console.log("comment => "+ JSON.stringify(comment));

      CommentService.createComment(comment).then(res => {
         window.location.replace(`/read-board/${this.state.idx}`);
      });
      
    }

    updateComment = async function (commentIdx) {
      let comment = {
          boardIdx: this.state.idx,
          content: this.state.newComment,
          writer: this.state.currentUser.username,
      };
      console.log("comment => "+ JSON.stringify(comment));

      CommentService.updateComment(this.state.idx, commentIdx, comment).then(res => {
         window.location.replace(`/read-board/${this.state.idx}`);
      });
      
    }

    componentDidMount() {
      const currentUser = MemberService.getCurrentUser();
      this.setState({ currentUser: currentUser, userReady: true });
        BoardService.getOneBoard(this.state.idx).then( res => {
            this.setState({board: res.data});
        });
        CommentService.getComments(this.state.idx).then(res => {
            this.setState({comments: res.data});
        });
    }

    goToList() { // qna로 가는 함수
        this.props.history.push('/qna-board');
    }

    goToUpdate = (event) => {
        event.preventDefault();
        this.props.history.push(`/create-board/${this.state.idx}`);
    }


   deleteView = async function () {
        if(window.confirm(this.state.idx+"번 게시글을 삭제할까요?\n")) {
            BoardService.deleteBoard(this.state.idx).then( res => {
                console.log("delete result => "+ JSON.stringify(res));
                if (res.status == 200) {
               window.confirm("게시글 삭제가 완료되었습니다.\n");
                    this.props.history.push('/qna-board');
                } 
                else {
                    alert("글 삭제가 실패했습니다.");
                }
            });
        }
    }


    deleteComment = async function (idx, commentIdx) {
        if(window.confirm("댓글을 삭제할까요?\n")) {
            CommentService.deleteComment(idx, commentIdx).then( res => {
                console.log("delete result => "+ JSON.stringify(res));
                if (res.status == 200) {
               window.confirm("댓글 삭제가 완료되었습니다.\n");
                  window.location.replace(`/read-board/${this.state.idx}`);
                } 
                else {
                    alert("댓글 삭제가 실패했습니다.");
                }
            });
        }
    }


    render() {
        return (
            <div class="main-content">
               <div class="row row-inline-block small-spacing">
               <div class="col-xs-12">
               <div class="box-content">
               <div class="clearfix"><h4 class="box-title pull-left"></h4></div>
                  <div class="card-content">
                     <form class="form-horizontal form-view">
                        <div class="form-group">
                           <label for="inp-type-1" class="col-sm-2 control-label">제목</label>
                           <div class="col-sm-10">
                              <p class="form-control" > {this.state.board.title} </p>
                           </div>
                        </div>

                        <div class="form-group">
                           <label for="inp-type-2" class="col-sm-2 control-label">이름</label>
                           <div class="col-sm-10">
                              <p class="form-control"> {this.state.board.writer} </p>
                           </div>
                        </div>

                        <div class="form-group">
                           <label for="inp-type-5" class="col-sm-2 control-label">내용</label>
                           <div class="col-sm-10">
                              <p class="form-control"> {this.state.board.content} </p>
                           </div>
                        </div>

                        <div class="form-group">
                           <label for="inp-type-5" class="col-sm-2 control-label">등록일</label>
                           <div class="col-sm-10">
                              <p class="form-control">{this.state.board.insertTime}</p>
                           </div>
                        </div>

                        <div class="form-group">
                           <label for="inp-type-5" class="col-sm-2 control-label">조회 수</label>
                           <div class="col-sm-10">
                              <p class="form-control">{this.state.board.viewCnt}</p>
                           </div>
                        </div>
                     </form>

                     <div class="btn_wrap text-center">
                        <button class="btn btn-default waves-effect waves-light" onClick={this.goToList.bind(this)} style={{marginLeft:"10px"}}>뒤로가기</button>
                        <button class="btn btn-primary waves-effect waves-light" onClick={this.goToUpdate} style={{marginLeft:"10px"}}>글 수정</button>
                        <button class="btn btn-danger waves-effect waves-light" onClick={() => this.deleteView()} style={{marginLeft:"10px"}}>삭제하기</button>            
                     </div>
                  </div>
               </div>

               <div class="box-content">
                  <div class="card-content">
                     <div class="clearfix"><h4 class="box-title pull-left">Comment</h4></div>
                     <form class="form-horizontal form-view">
                        <div class="input-group margin-bottom-20">
                           <input type="text" class="form-control" value={this.state.content} onChange={this.changeContentHandler} placeholder="댓글을 입력해 주세요."/>
                           <div class="input-group-btn">
                              <button type="button" class="btn waves-effect waves-light" onClick={this.createComment}><i class="fa fa-commenting" aria-hidden="true"></i></button>
                           </div>
                        </div>
                        <ul class="notice-list">
                           { 
                           this.state.comments.map(
                              comment =>
                              <li key = {comment.idx}>  
                                 <span class="name">{comment.writer}</span>

                                 {!this.state.isModify && ( //수정 안하면 원래 댓글 내용 보여주고
                                    <span class="desc">{comment.content}</span>
                                 )}

                                 {this.state.isModify && ( //수정 중이면 플레이스 홀더로 원래 댓글 내용 띄워주고 입력 받기
                                    <input type="text" class="form-control" style={{width:"1000px"}} onChange={this.changeCommentContentHandler} placeholder={comment.content}/>
                                 )}

                                 <span class="time">{comment.insertTime}</span>

                                 {(this.state.currentUser.username == comment.writer) &&( // 삭제 버튼은 현재 로그인한 사람과 댓글 작성자가 같을 때
                                    <button type="button" class="btn btn-xs btn-circle" onClick={() => this.deleteComment(this.state.idx, comment.idx)} ><i class="glyphicon glyphicon-trash" aria-hidden="true"></i></button>
                                 )}
                                                               
                                 {!this.state.isModify && (this.state.currentUser.username == comment.writer) && ( // 수정 중 아니면 수정 버튼 띄우고
                                 <button type="button" class="btn btn-xs btn-circle" onClick={this.changeModalHandler} style={{right: "55px"}}><i class="glyphicon glyphicon-pencil" aria-hidden="true"></i></button>
                                 )}

                                 {this.state.isModify && ( // 수정 중이면 수정 완료 버튼 띄우기
                                 <button type="button" class="btn btn-xs btn-circle" onClick={() => this.updateComment(comment.idx)} style={{right: "55px"}}><i class="glyphicon glyphicon-ok" aria-hidden="true"></i></button>
                                 )}

                              </li>
                           )}
                        </ul>
                     </form>   
                  </div>
               </div>
               </div>
               </div>
            </div>
        );
    }
}

export default ReadBoardComponent;