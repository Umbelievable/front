import React, { Component } from 'react';
import PhotoBoardService from '../service/PhotoBoardService';
import PhotoCommentService from '../service/PhotoCommentService';
import MemberService from '../service/MemberService';
import FileService from '../service/FileService';


class ReadPhotoBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            pboardNo: this.props.match.params.pboardNo,
            board: {},
            pcommentContent:'',
            pcommentWriter:'',
            comments: [],
            isModify:false,
            newComment:'',
            file: null, 
            currentUser: { username: "" }
            
        }

        this.changeContentHandler = this.changeContentHandler.bind(this);
        this.changeCommentContentHandler = this.changeCommentContentHandler.bind(this);

        this.createComment = this.createComment.bind(this);

    }

    changeContentHandler = (event) => {
        this.setState({pcommentContent: event.target.value});
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
           pboardNo: this.state.pboardNo,
           pcommentContent: this.state.pcommentContent,
           pcommentWriter: this.state.currentUser.username,
        };
        console.log("comment => "+ JSON.stringify(comment));
  
        PhotoCommentService.createComment(comment).then(res => {
           window.location.replace(`/read-photoboard/${this.state.pboardNo}`);
        });
        
    }

    updateComment = async function (pcommentNo) {
        let comment = {
           pboardNo: this.state.pboardNo,
           pcommentContent: this.state.newComment,
           pcommentWriter: this.state.currentUser.username,
        };
        console.log("comment => "+ JSON.stringify(comment));
  
        PhotoCommentService.updateComment(this.state.pboardNo, pcommentNo, comment).then(res => {
           window.location.replace(`/read-photoboard/${this.state.pboardNo}`);
        });
        
    }



    

    componentDidMount() {
        const currentUser = MemberService.getCurrentUser();
        this.setState({ currentUser: currentUser, userReady: true });
        PhotoBoardService.getOneBoard(this.state.pboardNo).then( res => { // 게시글 가져오기
            this.setState({board: res.data});
        });

        PhotoCommentService.getComments(this.state.pboardNo).then(res => {
            this.setState({comments: res.data});
        });

        FileService.getOneFilePhoto(this.state.pboardNo).then(res => {
            const base64 = btoa(
            new Uint8Array(res.data).reduce(
             (data, byte) => data + String.fromCharCode(byte),
             '',
           ),
         );
         this.setState({ file: "data:;base64," + base64 });
      });
      
      
    }

    goToList() { // qna로 가는 함수
        this.props.history.push('/photo-board');
    }

    goToUpdate = (event) => { //게시글 업데이트
        // event.preventDefault();
        // this.props.history.push(`/create-board/${this.state.qboardNo}`);
    }


   deleteView = async function () {
        // if(window.confirm(this.state.qboardNo+"번 게시글을 삭제할까요?\n")) {
        //     BoardService.deleteBoard(this.state.qboardNo).then( res => {
        //         console.log("delete result => "+ JSON.stringify(res));
        //         if (res.status == 200) {
        //        window.confirm("게시글 삭제가 완료되었습니다.\n");
        //             this.props.history.push('/qna-board');
        //         } 
        //         else {
        //             alert("글 삭제가 실패했습니다.");
        //         }
        //     });
        // }
    }


    deleteComment = async function (pboardNo, pcommentNo) {
        // if(window.confirm("댓글을 삭제할까요?\n")) {
        //     CommentService.deleteComment(qboardNo, qcommentNo).then( res => {
        //         console.log("delete result => "+ JSON.stringify(res));
        //         if (res.status == 200) {
        //        window.confirm("댓글 삭제가 완료되었습니다.\n");
        //           window.location.replace(`/read-board/${this.state.qboardNo}`);
        //         } 
        //         else {
        //             alert("댓글 삭제가 실패했습니다.");
        //         }
        //     });
        // }
    }

   

    render() {
        return (
            <div className="main-content">
               <div className="row row-inline-block small-spacing">
               <div className="col-xs-12">
               <div className="box-content">
               <div className="clearfix"><h4 className="box-title pull-left"></h4></div>

               <div className="card-content">
                     <form className="form-horizontal form-view">
                        <div className="form-group">
                           <label for="inp-type-1" className="col-sm-2 control-label">제목</label>
                           <div className="col-sm-10">
                              <p className="form-control" > {this.state.board.pboardTitle} </p>
                           </div>
                        </div>

                        <div className="form-group">
                           <label for="inp-type-2" className="col-sm-2 control-label">이름</label>
                           <div className="col-sm-10">
                              <p className="form-control"> {this.state.board.pboardWriter} </p>
                           </div>
                        </div>

                        <div className="form-group">
                           <label for="inp-type-5" className="col-sm-2 control-label">내용</label>
                           <div className="col-sm-10">
                              <p className="form-control"> {this.state.board.pboardContent} </p>
                           </div>
                        </div>

                        {
                           this.state.board.pboardFileUrl &&( //파일이 등록된 게시글이면 이미지도 함께 출력하기
                              <div className="form-group">
                                 <label for="inp-type-5" className="col-sm-2 control-label">사진</label>
                                 <div className="col-sm-10">
                                    <img src={this.state.file}/>
                                 </div>
                              </div>
                           )
                        }

                        
                       
                        <div className="form-group">
                           <label for="inp-type-5" className="col-sm-2 control-label">등록일</label>
                           <div className="col-sm-10">
                              <p className="form-control">{this.state.board.pboardInsertTime}</p>
                           </div>
                        </div>

                        <div className="form-group">
                           <label for="inp-type-5" className="col-sm-2 control-label">조회 수</label>
                           <div className="col-sm-10">
                              <p className="form-control">{this.state.board.pboardViews}</p>
                           </div>
                        </div>
                     </form>

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
                           <input type="text" className="form-control" value={this.state.pcommentContent} onChange={this.changeContentHandler} placeholder="댓글을 입력해 주세요."/>
                           <div className="input-group-btn">
                              <button type="button" className="btn waves-effect waves-light" onClick={this.createComment} ><i className="fa fa-commenting" aria-hidden="true"></i></button>
                           </div>
                        </div>
                        <ul className="notice-list">
                           { 
                           this.state.comments.map(
                              comment =>
                              <li key = {comment.pcommentNo}>  
                                 <span className="name">{comment.pcommentWriter}</span>

                                 {!this.state.isModify && ( //수정 안하면 원래 댓글 내용 보여주고
                                    <span className="desc">{comment.pcommentContent}</span>
                                 )}

                                 {this.state.isModify && ( //수정 중이면 플레이스 홀더로 원래 댓글 내용 띄워주고 입력 받기
                                    <input type="text" className="form-control" style={{width:"1000px"}} onChange={this.changeCommentContentHandler} placeholder={comment.pcommentContent}/>
                                 )}

                                 <span className="time">{comment.pcommentInsertTime}</span>

                                 {(this.state.currentUser.username == comment.pcommentWriter) &&( // 삭제 버튼은 현재 로그인한 사람과 댓글 작성자가 같을 때
                                    <button type="button" className="btn btn-xs btn-circle" onClick={() => this.deleteComment(this.state.pboardNo, comment.pcommentNo)} ><i className="glyphicon glyphicon-trash" aria-hidden="true"></i></button>
                                 )}
                                                               
                                 {!this.state.isModify && (this.state.currentUser.username == comment.pcommentWriter) && ( // 수정 중 아니면 수정 버튼 띄우고
                                 <button type="button" className="btn btn-xs btn-circle" onClick={this.changeModalHandler} style={{right: "55px"}}><i className="glyphicon glyphicon-pencil" aria-hidden="true"></i></button>
                                 )}

                                 {this.state.isModify && ( // 수정 중이면 수정 완료 버튼 띄우기
                                 <button type="button" className="btn btn-xs btn-circle" onClick={() => this.updateComment(comment.pcommentNo)} style={{right: "55px"}}><i className="glyphicon glyphicon-ok" aria-hidden="true"></i></button>
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

export default ReadPhotoBoardComponent;