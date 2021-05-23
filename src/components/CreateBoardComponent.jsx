import React, { Component } from 'react';
import BoardService from '../service/BoardService';
import FileService from '../service/FileService';
import MemberService from '../service/MemberService';

class CreateBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            qboardNo: this.props.match.params.qboardNo, 
            qboardTitle: '',
            qboardWriter: MemberService.getCurrentUser().username,
            qboardContent: '',
            qboardFileUrl: '',
            file: null
        }

        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentHandler = this.changeContentHandler.bind(this);
        this.createBoard = this.createBoard.bind(this);
        
    }

    changeTitleHandler = (event) => {
        this.setState({qboardTitle: event.target.value});
    }

    changeContentHandler = (event) => {
        this.setState({qboardContent: event.target.value});
    }

    //--file upload--//
    changeFileHandler = (event) => {
        this.setState({ file: event.target.files[0]}); //파일 데이터 넣고
        this.setState({ qboardFileUrl: event.target.files[0].name}); // Board 객체에 fileUrl 값 넣기
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
            qboardTitle: this.state.qboardTitle,
            qboardWriter: this.state.qboardWriter,
            qboardContent: this.state.qboardContent,
            qboardFileUrl: this.state.qboardFileUrl
        };
        console.log("board => "+ JSON.stringify(board));

        //--file upload--//
        let file = {
            file: this.state.file
        };
        console.log("file => "+ JSON.stringify(file));
        
        this.fileUpload(this.state.file);
        //--file upload--//


        if (this.state.qboardNo === '_create') { // 새로 만들면
            BoardService.createBoard(board).then(res => {
                window.location.replace('/qna-board');
            });

        } else { 
            BoardService.updateBoard(this.state.qboardNo, board).then(res => {
                window.location.replace(`/read-board/${this.state.qboardNo}`);
            });
        }
    }

    cancel() {
        this.props.history.push('/qna-board');
    }

    componentDidMount() {
        if (this.state.qboardNo === '_create') {
            return

        } else { // 있던 게시글 업데이트면
            // 파일 Url 글번호로 가져와서
            // qboardFileUrl 값 다시 주기

            BoardService.getOneBoard(this.state.qboardNo).then( (res) => {
                let board = res.data;
                console.log("board => "+ JSON.stringify(board));
                
                this.setState({
                    qboardTitle: board.qboardTitle,
                    qboardWriter: board.qboardWriter,

                    qboardContent: board.qboardContent,
                    qboardFileUrl: board.qboardFileUrl

                });
            });
        }
    }
    render() {
        return (
            <div className="main-content">
				<div className="row row-inline-block small-spacing">
				<div className="col-xs-12">
				<div className="box-content">

            <div className="card-content">
			    <form className="form-horizontal">
                    

				    <div className="form-group">
					    <label for="title" className="col-sm-2 control-label">제목</label>
					        <div className="col-sm-10">
						        <input type="text" className="form-control" placeholder="제목을 입력해 주세요." value={this.state.qboardTitle} onChange={this.changeTitleHandler}/>
					        </div>
				    </div>

				    <div className="form-group">
					    <label for="content" className="col-sm-2 control-label">내용</label>
					        <div className="col-sm-10">
						        <textarea style={{height:'200px'}} className="form-control" placeholder="내용을 입력해 주세요." value={this.state.qboardContent} onChange={this.changeContentHandler}></textarea>
					        </div>
                    </div>
                
                    <div className="form-group">        
                        <label for="file_0" className="col-sm-2 control-label">파일</label>
                            <div className="col-sm-10">
                                <input type="file" onChange={this.changeFileHandler} name="file" />
                            </div>    
                    </div>

				   
				    <div className="btn_wrap text-center">
                        <button type="submit" className="btn btn-primary waves-effect waves-light" onClick={this.createBoard}>저장하기</button>
                        <button className="btn btn-default waves-effect waves-light" style={{marginLeft:"10px"}} onClick={this.cancel.bind(this)}>뒤로가기</button>
					    
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