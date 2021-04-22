import React, { Component } from 'react';
import BoardService from '../service/BoardService';
import CommentService from '../service/CommentService';
import MemberService from '../service/MemberService';
import FileService from '../service/FileService';


class ReadBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            qboardNo: this.props.match.params.qboardNo,
            board: {},
            qcommentContent: '',
            qcommentWriter: '',
            comments: [],
            isModify: false,
            newComment: '',
            file: null, // 게시글에 이미지파일 첨부되어있다면 img 가져와서 담을 변수
            currentUser: { username: "" }
        }

        this.changeContentHandler = this.changeContentHandler.bind(this);
        this.changeCommentContentHandler = this.changeCommentContentHandler.bind(this);

        this.createComment = this.createComment.bind(this);
    }

    changeContentHandler = (event) => {
      this.setState({qcommentContent: event.target.value});
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
         qcommentContent: this.state.qcommentContent,
         qcommentWriter: this.state.currentUser.username,
      };
      console.log("comment => "+ JSON.stringify(comment));

      CommentService.createComment(this.state.qboardNo, comment).then(res => {
         window.location.replace(`/read-board/${this.state.qboardNo}`);
      });
      
    }

    updateComment = async function (qcommentNo) {
      let comment = {
         qcommentContent: this.state.newComment,
         qcommentWriter: this.state.currentUser.username,
      };
      console.log("comment => "+ JSON.stringify(comment));

      CommentService.updateComment(this.state.qboardNo, qcommentNo, comment).then(res => {
         window.location.replace(`/read-board/${this.state.qboardNo}`);
      });
      
    }

    componentDidMount() {
      
      const currentUser = MemberService.getCurrentUser();
      this.setState({ currentUser: currentUser, userReady: true });
        BoardService.getOneBoard(this.state.qboardNo).then( res => { // 게시글 가져오기
            this.setState({board: res.data});
        });
        CommentService.getComments(this.state.qboardNo).then(res => {
            this.setState({comments: res.data});
        });
        FileService.getOneFile(this.state.qboardNo).then(res => {
            const base64 = btoa(
            new Uint8Array(res.data).reduce(
             (data, byte) => data + String.fromCharCode(byte),
             '',
           ),
         );
         this.setState({ file: "data:;base64," + base64 });
      });

      // 네비바에 현재 위치 표시하기 
      var header = document.getElementById("navbar");
      var qnabtn = document.getElementById("qnabtn");
      var btns = header.getElementsByClassName("mybtn");
      for (var i = 0; i < btns.length; i++) {
          btns[i].className = "mybtn"
      }
      qnabtn.className += " active";
      
    }

    goToList() { // qna로 가는 함수
        this.props.history.push('/qna-board');
    }

    goToUpdate = (event) => { //게시글 업데이트
        event.preventDefault();
        this.props.history.push(`/create-board/${this.state.qboardNo}`);
    }


   deleteView = async function () {
        if(window.confirm(this.state.qboardNo+"번 게시글을 삭제할까요?\n")) {
            BoardService.deleteBoard(this.state.qboardNo).then( res => {
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


    deleteComment = async function (qboardNo, qcommentNo) {
        if(window.confirm("댓글을 삭제할까요?\n")) {
            CommentService.deleteComment(qboardNo, qcommentNo).then( res => {
                console.log("delete result => "+ JSON.stringify(res));
                if (res.status == 200) {
               window.confirm("댓글 삭제가 완료되었습니다.\n");
                  window.location.replace(`/read-board/${this.state.qboardNo}`);
                } 
                else {
                    alert("댓글 삭제가 실패했습니다.");
                }
            });
        }
    }


    render() {
      const ColoredLine = ({ color }) => (
         <hr
             style={{
                 color: color,
                 backgroundColor: color,
                 height: '0.6px'
             }}
         />
     );
        return (
            <div className="main-content">
               <div className="row row-inline-block small-spacing">
               <div className="col-xs-12">
               <div className="box-content">
               <div className="clearfix"><h4 className="box-title pull-left"></h4></div>
                  <div className="card-content">

                  <ColoredLine color="black"/>
                  <h3 style={{fontSize:'18px', display:'inline', padding:'0px 50px 0px 10px'}}>{this.state.board.qboardTitle}</h3>
                  <h4 style={{fontSize:'14px', display:'inline', padding:'0px 50px 0px 0px'}}>{this.state.board.qboardWriter}</h4>
                  
                  <span style={{fontSize:'13px', color:'gray', display:'inline', float:'right'}}>{this.state.board.qboardInsertTime}</span>

                  <ColoredLine color="lightgray"/>
                  {this.state.board.qboardFileUrl &&( //파일이 등록된 게시글이면 이미지도 함께 출력하기
                     <img src={this.state.file}/>
                  )}

                  <div style={{padding:'50px 100px 80px 30px'}}>
                     {this.state.board.qboardContent}
                  </div>






                     







                     <div className="btn_wrap text-center">
                        <button className="btn btn-default waves-effect waves-light" onClick={this.goToList.bind(this)} style={{marginLeft:"10px"}}>뒤로가기</button>
                        <button className="btn btn-primary waves-effect waves-light" onClick={this.goToUpdate} style={{marginLeft:"10px"}}>글 수정</button>
                        <button className="btn btn-danger waves-effect waves-light" onClick={() => this.deleteView()} style={{marginLeft:"10px"}}>삭제하기</button>            
                     </div>
                  </div>
               </div>

               <div className="box-content">
                  <div className="card-content">
                     <div className="clearfix"><h4 className="box-title pull-left">Comment</h4></div>
                     <form className="form-horizontal form-view">
                        <div className="input-group margin-bottom-20">
                           <input type="text" className="form-control" value={this.state.qcommentContent} onChange={this.changeContentHandler} placeholder="댓글을 입력해 주세요."/>
                           <div className="input-group-btn">
                              <button type="button" className="btn waves-effect waves-light" onClick={this.createComment}><i className="fa fa-commenting" aria-hidden="true"></i></button>
                           </div>
                        </div>
                        <ul className="notice-list">
                           { 
                           this.state.comments.map(
                              comment =>
                              <li key = {comment.qcommentNo}>  
                                 <span className="name">{comment.qcommentWriter}</span>

                                 {!this.state.isModify && ( //수정 안하면 원래 댓글 내용 보여주고
                                    <span className="desc">{comment.qcommentContent}</span>
                                 )}

                                 {this.state.isModify && ( //수정 중이면 플레이스 홀더로 원래 댓글 내용 띄워주고 입력 받기
                                    <input type="text" className="form-control" style={{width:"1000px"}} onChange={this.changeCommentContentHandler} placeholder={comment.qcommentContent}/>
                                 )}

                                 <span className="time">{comment.qcommentInsertTime}</span>

                                 {!this.state.isModify &&(this.state.currentUser.username == comment.qcommentWriter) &&( // 삭제 버튼은 현재 로그인한 사람과 댓글 작성자가 같을 때
                                    <button type="button" className="btn btn-xs btn-circle" onClick={() => this.deleteComment(this.state.qboardNo, comment.qcommentNo)} ><i className="glyphicon glyphicon-trash" aria-hidden="true"></i></button>
                                 )}
                                                               
                                 {!this.state.isModify && (this.state.currentUser.username == comment.qcommentWriter) && ( // 수정 중 아니면 수정 버튼 띄우고
                                 <button type="button" className="btn btn-xs btn-circle" onClick={this.changeModalHandler} style={{right: "55px"}}><i className="glyphicon glyphicon-pencil" aria-hidden="true"></i></button>
                                 )}

                                 {this.state.isModify && ( // 수정 중이면 수정 완료 버튼 띄우기
                                 <button type="button" className="btn btn-xs btn-circle" onClick={() => this.updateComment(comment.qcommentNo)} style={{right: "55px"}}><i className="glyphicon glyphicon-ok" aria-hidden="true"></i></button>
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