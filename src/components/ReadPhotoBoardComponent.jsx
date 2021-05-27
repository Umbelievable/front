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
            pcommentContent: '',
            pcommentWriter: '',
            comments: [],
            newComment: '',
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
  
    changeModalHandler(qcommentNo) {
        var commentLi = document.getElementById("liId"+qcommentNo);
        var commentSpan = document.getElementById("spanId"+qcommentNo); 
        var commentdelBtn = document.getElementById("delBtnId"+qcommentNo); // 삭제 버튼
        var commentmodiBtn = document.getElementById("modiBtnId"+qcommentNo); // 수정 버튼

        commentLi.removeChild(commentSpan);
        commentLi.removeChild(commentdelBtn);
        commentLi.removeChild(commentmodiBtn); // 원래 있던 span, delBtn, modiBtn 지우고

        var newINPUT = document.createElement("input"); // input 태그 새로 만들고
        var newButton = document.createElement("button"); // 수정 완료 버튼 새로 만들고
        var newI = document.createElement("i"); // 버튼 안에 들어갈 체크 아이콘
        newI.setAttribute("class", "glyphicon glyphicon-ok");
        newI.setAttribute("aria-hidden", "true");

        newINPUT.setAttribute("class", "form-control");
        newINPUT.style.width = "1200px";
        newINPUT.style.height = "30px";
        newINPUT.style.display = "inline";
        newINPUT.value = commentSpan.innerHTML;
        newINPUT.onchange = this.changeCommentContentHandler;

        newButton.setAttribute("class", "btn btn-xs btn-circle");
        newButton.style.display = "inline";
        newButton.style.width = "32px";
        newButton.style.height = "31.6px";
        newButton.onclick = () => this.updateComment(qcommentNo);
        

        commentLi.appendChild(newINPUT); // 새 input 태그 붙이기
        newButton.appendChild(newI);
        commentLi.appendChild(newButton);

    }

    createComment = (event) => {
        event.preventDefault();
        let comment = {
           pcommentContent: this.state.pcommentContent,
           pcommentWriter: this.state.currentUser.username,
        };
        console.log("comment => "+ JSON.stringify(comment));
  
        PhotoCommentService.createComment(this.state.pboardNo, comment).then(res => {
           this.props.history.push(`/read-photoboard/${this.state.pboardNo}`);
        });
        
    }

    updateComment = async function (pcommentNo) {
        let comment = {
           pcommentContent: this.state.newComment,
           pcommentWriter: this.state.currentUser.username,
        };
        console.log("comment => "+ JSON.stringify(comment));
  
        PhotoCommentService.updateComment(this.state.pboardNo, pcommentNo, comment).then(res => {
            this.props.history.push(`/read-photoboard/${this.state.pboardNo}`);
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
            const base64 = btoa( new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '', ),);
        this.setState({ file: "data:;base64," + base64 });
        });

        // 네비바에 현재 위치 표시하기 
        var header = document.getElementById("navbar");
        var photobtn = document.getElementById("photobtn");
        var btns = header.getElementsByClassName("mybtn");
        for (var i = 0; i < btns.length; i++) {
            btns[i].className = "mybtn"
        }
        photobtn.className += " active";
    }

    goToList() { // photo로 가는 함수
        this.props.history.push('/photo-board');
    }

    goToUpdate = (event) => { // 게시글 업데이트
        event.preventDefault();
        this.props.history.push(`/create-photoboard/${this.state.pboardNo}`);
    }


    deleteView = async function () {
        if(window.confirm(this.state.pboardNo+"번 게시글을 삭제할까요?\n")) {
            PhotoBoardService.deleteBoard(this.state.pboardNo).then( res => {
                console.log("delete result => "+ JSON.stringify(res));
                if (res.status == 200) {
                    window.confirm("게시글 삭제가 완료되었습니다.\n");
                    this.props.history.push('/photo-board');
                } 
                else {
                    alert("글 삭제가 실패했습니다.");
                }
            });
        }
    }


    deleteComment = async function (pboardNo, pcommentNo) {
        if(window.confirm("댓글을 삭제할까요?\n")) {
            PhotoCommentService.deleteComment(pboardNo, pcommentNo).then( res => {
                console.log("delete result => "+ JSON.stringify(res));
                if (res.status == 200) {
                    window.confirm("댓글 삭제가 완료되었습니다.\n");
                    this.props.history.push(`/read-photoboard/${this.state.pboardNo}`);
                } 
                else {
                    alert("댓글 삭제가 실패했습니다.");
                }
            });
        }
    }

    render() {
        const ColoredLine = ({ color }) => ( <hr style={{ color: color, backgroundColor: color, height: '0.6px' }}/>);
        return (
            <div style={{padding:'2em 3em'}} className="main-content">
                <div className="row row-inline-block small-spacing">
                <div className="col-xs-12">
                <div className="box-content">
                <div className="clearfix"><h4 className="box-title pull-left"></h4></div>
                    <div className="card-content">
                        <ColoredLine color="black"/>
                        <h3 style={{fontSize:'18px', display:'inline', padding:'0px 50px 0px 10px'}}>{this.state.board.pboardTitle}</h3>
                        <h4 style={{fontSize:'14px', display:'inline', padding:'0px 50px 0px 0px'}}>{this.state.board.pboardWriter}</h4>
                        
                        <span style={{fontSize:'13px', color:'gray', display:'inline', float:'right'}}>{this.state.board.pboardInsertTime}</span>

                        <ColoredLine color="lightgray"/>
                        <img className="postcropping" src={this.state.file}/>
               
                        <div style={{padding:'50px 100px 80px 30px'}}>
                            {this.state.board.pboardContent}
                        </div>

                        <div className="btn_wrap text-center">
                            <button className="btn btn-default waves-effect waves-light" onClick={this.goToList.bind(this)} style={{marginLeft:"10px"}}>뒤로가기</button>
                            {(this.state.currentUser.username == this.state.board.pboardWriter) && (
                                <button className="btn btn-primary waves-effect waves-light" onClick={this.goToUpdate} style={{marginLeft:"10px"}}>글 수정</button>
                            )}
                            {(this.state.currentUser.username == this.state.board.pboardWriter) && (
                                <button className="btn btn-danger waves-effect waves-light" onClick={() => this.deleteView()} style={{marginLeft:"10px"}}>삭제하기</button>            
                            )}
                        </div>
                    </div>
                </div>

                <div className="box-content">
                    <div className="card-content">
                    <div className="clearfix"><h4 className="box-title pull-left">Comment</h4></div>
                    <form className="form-horizontal form-view">
                        <div className="input-group margin-bottom-20">
                            <input type="text" className="form-control" value={this.state.pcommentContent} style={{height:'45px'}} onChange={this.changeContentHandler} placeholder="댓글을 입력해 주세요."/>
                            <div className="input-group-btn">
                            <button style={{height:'45px'}} type="button" className="btn waves-effect waves-light" onClick={this.createComment}><i className="glyphicon glyphicon-edit" aria-hidden="true"></i></button>
                            </div>
                        </div>
                        <ul className="notice-list">
                            { 
                            this.state.comments.map(
                            comment =>
                            <li id={"liId"+comment.pcommentNo} key = {comment.pcommentNo}> 
                                <span className="name">{comment.pcommentWriter}</span>
                                <span id={"spanId"+comment.pcommentNo} className="desc">{comment.pcommentContent}</span>
                                <span className="time">{comment.pcommentInsertTime}</span>

                                {(this.state.currentUser.username == comment.pcommentWriter) && ( // 삭제 버튼은 현재 로그인한 사람과 댓글 작성자가 같을 때
                                    <button id={"delBtnId"+comment.pcommentNo} type="button" className="btn btn-xs btn-circle" onClick={() => this.deleteComment(this.state.pboardNo, comment.pcommentNo)} ><i className="glyphicon glyphicon-trash" aria-hidden="true"></i></button>
                                )}
                                                                
                                {(this.state.currentUser.username == comment.pcommentWriter) && ( // 수정 중 아니면 수정 버튼 띄우고
                                <button id={"modiBtnId"+comment.pcommentNo} type="button" className="btn btn-xs btn-circle" onClick={() => this.changeModalHandler(comment.pcommentNo)} style={{right: "55px"}}><i className="glyphicon glyphicon-pencil" aria-hidden="true"></i></button>
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