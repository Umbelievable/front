import React, { Component } from 'react';
import BoardService from '../service/BoardService';
import FileService from '../service/FileService';

class CreateBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idx: this.props.match.params.idx, 
            noticeYn: false,
            secretYn: false,
            title: '',
            writer: '',
            content: '',
            file: null
        }

        this.changeNoticeHandler = this.changeNoticeHandler.bind(this);
        this.changeSecretHandler = this.changeSecretHandler.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeWriterHandler = this.changeWriterHandler.bind(this);
        this.changeContentHandler = this.changeContentHandler.bind(this);
        this.createBoard = this.createBoard.bind(this);
        
    }

    changeNoticeHandler = (event) => {
        const target = event.target;
        const value = target.name === 'noticeYn' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    changeSecretHandler = (event) => {
        const target = event.target;
        const value = target.name === 'secretYn' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
    }

    changeWriterHandler = (event) => {
        this.setState({writer: event.target.value});
    }

    changeContentHandler = (event) => {
        this.setState({content: event.target.value});
    }

    //--file upload--//
    changeFileHandler = (event) => {
        this.setState({ file: event.target.files[0]});
    }

    fileUpload = async function (file) {
        const formData = new FormData();
        formData.append('file', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        FileService.uploadFile(formData, config).then(res => {
            this.props.history.push('/qna-board');
        });
        
    }
    //--file upload--//



    createBoard = (event) => {
        event.preventDefault();
    
        let board = {
            noticeYn: this.state.noticeYn,
            secretYn: this.state.secretYn,
            title: this.state.title,
            writer: this.state.writer,
            content: this.state.content
        };
        console.log("board => "+ JSON.stringify(board));

        //--file upload--//
        let file = {
            file: this.state.file
        };
        console.log("file => "+ JSON.stringify(file));
        
        this.fileUpload(this.state.file);
        //--file upload--//


        if (this.state.idx === '_create') {
            BoardService.createBoard(board).then(res => {
                window.location.replace('/qna-board');
            });
        } else {
            BoardService.updateBoard(this.state.idx, board).then(res => {
                this.props.history.push(`/read-board/${this.state.idx}`);
            });
        }
    }

    cancel() {
        this.props.history.push('/qna-board');
    }

    componentDidMount() {
        if (this.state.idx === '_create') {
            return
        } else {
            BoardService.getOneBoard(this.state.idx).then( (res) => {
                let board = res.data;
                console.log("board => "+ JSON.stringify(board));
                
                this.setState({
                        noticeYn: board.noticeYn,
                        secretYn: board.secretYn,
                        title: board.title,
                        writer: board.writer,
                        content: board.content
                });
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
			    <form class="form-horizontal">
                    <div class="form-group">
					    <label for="noticeYn" class="col-sm-2 control-label">공지글 설정</label>
					        <div class="col-sm-10" style={{marginTop:"10px"}}> 
						        <input type="checkbox" id="noticeYn" name="noticeYn" checked={this.state.noticeYn} onChange={this.changeNoticeHandler} />
					        </div>
				    </div>

				    <div class="form-group">
					    <label for="secretYn" class="col-sm-2 control-label">비밀글 설정</label>
					        <div class="col-sm-10" style={{marginTop:"10px"}}>
						        <input type="checkbox" id="secretYn" name="secretYn" checked={this.state.secretYn} onChange={this.changeSecretHandler} />
					        </div>
				    </div>

				    <div class="form-group">
					    <label for="title" class="col-sm-2 control-label">제목</label>
					        <div class="col-sm-10">
						        <input type="text" class="form-control" placeholder="제목을 입력해 주세요." value={this.state.title} onChange={this.changeTitleHandler}/>
					        </div>
				    </div>

				    <div class="form-group">
					    <label for="writer" class="col-sm-2 control-label">이름</label>
					        <div class="col-sm-10">
						        <input type="text" class="form-control" placeholder="이름을 입력해 주세요." value={this.state.writer} onChange={this.changeWriterHandler}/>
					        </div>
				    </div>

				    <div class="form-group">
					    <label for="content" class="col-sm-2 control-label">내용</label>
					        <div class="col-sm-10">
						        <textarea class="form-control" placeholder="내용을 입력해 주세요." value={this.state.content} onChange={this.changeContentHandler}></textarea>
					        </div>
                    </div>
                
                    <div class="form-group">        
                        <label for="file_0" class="col-sm-2 control-label">파일</label>
                            <div class="col-sm-10">
                                <input type="file" onChange={this.changeFileHandler} name="file" />
                            </div>    
                    </div>

				   
				    <div class="btn_wrap text-center">
                        <button type="submit" class="btn btn-primary waves-effect waves-light" onClick={this.createBoard}>저장하기</button>
                        <button class="btn btn-default waves-effect waves-light" style={{marginLeft:"10px"}} onClick={this.cancel.bind(this)}>뒤로가기</button>
					    
                    </div>

                </form>
            </div>                                
            </div>
            </div>
            </div>
        </div> 
        );
    }
}

export default CreateBoardComponent;
