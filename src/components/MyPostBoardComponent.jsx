import React, { Component } from 'react';
import MemberService from '../service/MemberService';
import BoardService from '../service/BoardService';
import FileService from '../service/FileService';
import PhotoBoardService from '../service/PhotoBoardService';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


class MyPostBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            qnaBoards: [],
            photoBoards: [],
            finalphotoBoards: []
        }

    }

    componentDidMount() { 
        // placeholder 설정하기
        var searchBar = document.getElementById("searchBar");
        searchBar.placeholder="DZBZ 통합 검색";

        // qna게시글 가져오기
        BoardService.searchBoards(MemberService.getCurrentUser().id).then((res) => {
            this.setState({ qnaBoards: res.data});
        });

        // photo게시글 가져오기
        PhotoBoardService.searchBoards(MemberService.getCurrentUser().id).then((res) => {
            this.setState({ 
                photoBoards: res.data}); // 원래대로 백에서 정보 받고

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
                        this.setState({finalphotoBoards: this.state.finalphotoBoards.concat(newarr).sort(function(a, b){ // 정렬까지 해서 렌더링에 사용할 배열 만들기
                            return b.pboardNo - a.pboardNo
                        })}); 
                    });
                }
        });
    }

    readBoard(qboardNo) {
        this.props.history.push(`/read-board/${qboardNo}`);
    }

    readPhotoBoard(pboardNo) {
        this.props.history.push(`/read-photoboard/${pboardNo}`);
    }


    render() {
        return (
        <div className="main-content">
            <div className="row row-inline-block small-spacing">
            <div className="col-xs-12">
            <div className="box-content">
            <Tabs>
                <TabList>
                    <Tab>&nbsp;&nbsp;&nbsp;&nbsp;Q&amp;A&nbsp;Community&nbsp;&nbsp;&nbsp;&nbsp;</Tab>
                    <Tab>&nbsp;&nbsp;&nbsp;&nbsp;Photo&nbsp;Community&nbsp;&nbsp;&nbsp;&nbsp;</Tab>
                </TabList>

                <TabPanel>
                    <div style={{padding:'3em'}} className="table-responsive clearfix">
                        <table className="table table-hover">
                            <thead>                                    <tr>
                                    <th>번호 </th>
                                    <th>제목 </th>
                                    <th>작성자 </th>
                                    <th>등록일 </th>
                                    <th>조회수 </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.qnaBoards.map(
                                    qnaboard => 
                                    <tr key = {qnaboard.qboardNo}>
                                        <td> {qnaboard.qboardNo} </td>
                                        <td> <a href={'/read-board/'+qnaboard.qboardNo}>{qnaboard.qboardTitle} </a> </td>
                                        <td> {qnaboard.qboardWriter} </td>
                                        <td> {qnaboard.qboardInsertTime} </td>
                                        <td> {qnaboard.qboardViews} </td>
                                    </tr>
                                )
                                }
                            </tbody>
                    </table>
                    </div>
                </TabPanel>
                        
                <TabPanel>
                    <div className="album py-5 bg-white">
                        <div className="container">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            {
                                this.state.finalphotoBoards.map(
                                    photoboard => 
                                    <div key = {photoboard.pboardNo} className="col" onClick = {() => this.readPhotoBoard(photoboard.pboardNo)} style={{padding:'20px 10px'}}>
                                        <div className="cropping">
                                            <img className="cropping-layerBottom" src={photoboard.pboardFileUrl}/>
                                            <div className="cropping-layerTop">
                                                <p className="cropping-text">{photoboard.pboardTitle}<br/><br/><small className="text-muted">{photoboard.pboardWriter}</small></p>
                                            </div>
                                        </div>
                                    </div>

                                )
                            }
                        </div>
                        </div>
                    </div>
                </TabPanel>
            </Tabs>

        
            </div>
            </div>
            </div>
        </div>

        );
    }
}

export default MyPostBoardComponent;