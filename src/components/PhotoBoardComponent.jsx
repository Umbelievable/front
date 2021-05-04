import React, { Component } from 'react';
import PhotoBoardService from '../service/PhotoBoardService';

class PhotoBoardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            p_num: 1,
            paging: {},
            boards: [],
        }
        this.getImgSrc=this.getImgSrc.bind(this);
        this.createBoard = this.createBoard.bind(this);
    }
    
    componentDidMount() {

        PhotoBoardService.getBoards(this.state.p_num).then((res) => {
            this.setState({ 
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                boards: res.data.list});
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

    getImgSrc(url){
        var file = "data:;base64," + url;
        return file;
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

    listBoard(p_num) {
        console.log("pageNum : "+ p_num);
        PhotoBoardService.getBoards(p_num).then((res) => {
            console.log(res.data);
            this.setState({ 
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                boards: res.data.list});
        });
    }

    viewPaging() {
        const pageNums = [];

        for (let i = this.state.paging.pageNumStart; i <= this.state.paging.pageNumEnd; i++ ) {
            pageNums.push(i);
        }

        return (pageNums.map((page) => 
        <li className="page-item" key={page.toString()} >
            <a className="page-link" onClick = {() => this.listBoard(page)}>{page}</a>
        </li>
        ));
        
    }

    isPagingPrev(){
        if (this.state.paging.prev) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listBoard( (this.state.paging.currentPageNum - 1) )} tabindex="-1">Previous</a>
                </li>
            );
        }
    }

    isPagingNext(){
        if (this.state.paging.next) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listBoard( (this.state.paging.currentPageNum + 1) )} tabIndex="-1">Next</a>
                </li>
            );
        }
    }

    isMoveToFirstPage() {
        if (this.state.p_num != 1) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listBoard(1)} tabIndex="-1">Move to First Page</a>
                </li>
            );
        }
    }

    isMoveToLastPage() {
        if (this.state.p_num != this.state.paging.pageNumCountTotal) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listBoard( (this.state.paging.pageNumCountTotal) )} tabIndex="-1">LastPage({this.state.paging.pageNumCountTotal})</a>
                </li>
            );
        }
    }




    render() {
        return (
        <div className="main-content">
            <div className="row row-inline-block small-spacing">
            <div className="col-xs-12">
            <div className="box-content">
        

            <div className="album py-5 bg-white">
            <div className="container">

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {
                    this.state.boards.map(
                        board => 
                        <div key = {board.pboardNo} className="col" onClick = {() => this.readPhotoBoard(board.pboardNo)} style={{padding:'20px 10px'}}>
                            <div className="cropping">
                                <img className="cropping-layerBottom" src={this.getImgSrc(board.pboardFileUrl)}/>
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

            <div className="btn_wrap text-right">
                    <button className="btn btn-primary waves-effect waves-light" onClick={this.createBoard}>Write</button>
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

export default PhotoBoardComponent;