import React, { Component } from 'react';
import PhotoBoardService from '../service/PhotoBoardService';
import queryString from 'query-string';


class SearchPhotoBoardComponent extends Component {
    
    constructor(props) {
        const query = queryString.parse(window.location.search);

        super(props)
        this.state = { 
            boards: [],
            searchKeyword: query.searchKeyword
        }
        this.getImgSrc=this.getImgSrc.bind(this);
        this.changeKeywordHandler = this.changeKeywordHandler.bind(this);	
    }

    changeKeywordHandler = (event) => {
        this.setState({searchKeyword: event.target.value});
    }
   
    componentDidMount() { 
        PhotoBoardService.searchBoards(this.state.searchKeyword).then((res) => {
            this.setState({ boards: res.data});
        });
    }

    getImgSrc(url){
        var file = "data:;base64," + url;
        return file;
    }

    readPhotoBoard(pboardNo) {
        this.props.history.push(`/read-photoboard/${pboardNo}`);
    }

    searchBoard(searchKeyword){
        this.props.history.push(`/search-photoboard?searchKeyword=${searchKeyword}`);
        
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


				</div>
				</div>
				</div>
			</div>
        );
    }
}

export default SearchPhotoBoardComponent;