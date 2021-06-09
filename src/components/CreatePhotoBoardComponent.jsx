import React, { Component } from 'react';
import PhotoBoardService from '../service/PhotoBoardService';
import FileService from '../service/FileService';
import MemberService from '../service/MemberService';

class CreatePhotoBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pboardNo: this.props.match.params.pboardNo, 
            pboardTitle: '',
            pboardWriter: MemberService.getCurrentUser().username,
            pboardContent: '',
            pboardFileUrl: '',
            file: null

        }

        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentHandler = this.changeContentHandler.bind(this);
        this.createBoard = this.createBoard.bind(this);

        
    }

    changeTitleHandler = (event) => {
        this.setState({pboardTitle: event.target.value});
    }

    changeContentHandler = (event) => {
        this.setState({pboardContent: event.target.value});
    }

    //--file upload--//
    changeFileHandler = (event) => {
        this.setState({ file: event.target.files[0]}); //파일 데이터 넣고
        this.setState({ pboardFileUrl: event.target.files[0].name}); // Board 객체에 fileUrl 값 넣기

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
            this.props.history.push('/photo-board');
        });
        
    }
    //--file upload--//

    createBoard = (event) => {
        event.preventDefault();
    
        let board = {
            pboardTitle: this.state.pboardTitle,
            pboardWriter: this.state.pboardWriter,
            pboardContent: this.state.pboardContent,
            pboardFileUrl: this.state.pboardFileUrl
        };
        console.log("board => "+ JSON.stringify(board));

        if(this.state.file){
            //--file upload--//
            let file = {
                file: this.state.file
            };
            console.log("file => "+ JSON.stringify(file));
            
            this.fileUpload(this.state.file);
            //--file upload--//
        }
        


        if (this.state.pboardNo === '_create') { // 새로 만들면
            PhotoBoardService.createBoard(board).then(res => {
                this.props.history.push('/photo-board');
            });
        } else { // 있던 게시글 업데이트면
            // 파일 Url 글번호로 가져와서
            // qboardFileUrl 값 다시 주기
            PhotoBoardService.updateBoard(this.state.pboardNo, board).then(res => {
                this.props.history.push(`/read-photoboard/${this.state.pboardNo}`);
            });
        }
    }

    cancel() {
        this.props.history.push('/photo-board');
    }

 
    
    componentDidMount() {
        if (this.state.pboardNo === '_create') {
            return
        } else {
            PhotoBoardService.getOneBoard(this.state.pboardNo).then( (res) => {
                let board = res.data;
                console.log("board => "+ JSON.stringify(board));
                
                this.setState({
                    pboardTitle: board.pboardTitle,
                    pboardWriter: board.pboardWriter,
                    pboardContent: board.pboardContent,
                    pboardFileUrl: board.pboardFileUrl
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
			    <form className="form-horizontal" style={{paddingRight:'12em'}}>
				    <div className="form-group">
					    <label style={{fontSize:'14px'}} for="title" className="col-sm-2 control-label">제목</label>
					        <div className="col-sm-10">
						        <input style={{fontSize:'14px', height:'30px'}} type="text" className="form-control" placeholder="제목을 입력해 주세요." value={this.state.pboardTitle} onChange={this.changeTitleHandler}/>
					        </div>
				    </div>

				    <div className="form-group">
					    <label style={{fontSize:'14px'}} for="content" className="col-sm-2 control-label">내용</label>
					        <div className="col-sm-10">
						        <textarea style={{height:'200px', fontSize:'14px'}} className="form-control" placeholder="내용을 입력해 주세요." value={this.state.pboardContent} onChange={this.changeContentHandler}></textarea>
					        </div>
                    </div>
                
                    <div className="form-group">        
                        <label style={{fontSize:'14px'}} for="file_0" className="col-sm-2 control-label">파일</label>
                            <div className="col-sm-10">
                                <input style={{fontSize:'14px', paddingTop:'5px'}} type="file" onChange={this.changeFileHandler} name="file" />
                            </div>    
                    </div>
                </form>
                <div className="btn_wrap text-center">
                    <button type="submit" className="btn-main" style={{fontSize:'larger', backgroundColor:'rgb(73,117,104)', padding:'7px 30px'}} onClick={this.createBoard}>저장하기</button>    
                </div>
            </div>
                   
            </div>
            </div>
            </div>
        </div> 
        );
    }
}

export default CreatePhotoBoardComponent;
