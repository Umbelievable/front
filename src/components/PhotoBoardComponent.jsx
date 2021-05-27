import React, { Component } from 'react';
import PhotoBoardService from '../service/PhotoBoardService';
import FileService from '../service/FileService';

class PhotoBoardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: [],
            finalboards: []
        }
        this.createBoard = this.createBoard.bind(this);
    }
    
    componentDidMount() {
        PhotoBoardService.getBoards().then((res) => {
            this.setState({ boards: res.data }); // 원래대로 백에서 정보 받고

            for(var i=0; i<res.data.length; i++){ // 반복문 시작
                const pb = res.data[i]; // 리스트에서 하나씩 빼서

                FileService.getOneFilePhoto(res.data[i].pboardNo).then( resul => {
                    const base64 = btoa(
                        new Uint8Array(resul.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                        ),
                    ); // 파일 처리 하고
                        
                    const newarr = [{"pboardNo": pb.pboardNo,
                                    "pboardTitle": pb.pboardTitle,
                                    "pboardWriter": pb.pboardWriter,
                                    "pboardInsertTime": pb.pboardInsertTime,
                                    "pboardViews": pb.pboardViews,
                                    "pboardContent": pb.pboardContent,
                                    "pboardUpdateTime": pb.pboardUpdateTime,
                                    "pboardFileUrl": "data:;base64," + base64,
                                    "photoComments": pb.photoComments
                                    }]; // 새 배열 만들어서 다시 세팅
                    this.setState({finalboards: this.state.finalboards.concat(newarr).sort(function(a, b){ // 정렬까지 해서 렌더링에 사용할 배열 만들기
                        return b.pboardNo - a.pboardNo
                    })}); 
                });
            }
        });

        // photo 통합 검색
        var searchBar = document.getElementById("searchBar");
        searchBar.placeholder="DZBZ Photo 검색";

        // 네비바에 현재 위치 표시하기 
        var header = document.getElementById("navbar");
        var photobtn = document.getElementById("photobtn");
        var btns = header.getElementsByClassName("mybtn");
        for (var i = 0; i < btns.length; i++) {
            btns[i].className = "mybtn"
        }
        photobtn.className += " active";
    }

    createBoard() {
        this.props.history.push('/create-photoboard/_create');
    }

    readPhotoBoard(pboardNo) {
        this.props.history.push(`/read-photoboard/${pboardNo}`);
    }

    goToUpdate = (event) => {
        event.preventDefault();
        this.props.history.push(`/create-photoboard/${this.state.pboardNo}`);
    }

    render() {
        return (
        <div className="main-content">
            <div className="row row-inline-block small-spacing">
            <div className="col-xs-12">
            <div className="box-content">

            <div style={{paddingRight:'15em'}} className="btn_wrap text-right">
                <button className="btn btn-primary waves-effect waves-light" onClick={this.createBoard}>Write</button>
			</div>
        
            <div className="album py-5">
            <div className="container">

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {
                    this.state.finalboards.map(
                        board => 
                        <div key = {board.pboardNo} className="col" onClick = {() => this.readPhotoBoard(board.pboardNo)} style={{padding:'20px 10px'}}>
                            <div className="cropping">
                                <img className="cropping-layerBottom" src={board.pboardFileUrl}/>
                                <div className="cropping-layerTop">
                                    <p className="cropping-text">{board.pboardTitle}<br/><br/><small className="text-muted">{board.pboardWriter}</small></p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            </div>
            </div>

             

            </div>
            </div>
            </div>
        </div>

        );
    }
}

export default PhotoBoardComponent;