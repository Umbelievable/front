import React, { Component } from 'react';
import MemberService from '../service/MemberService';
import BoardService from '../service/BoardService';
import CommentService from '../service/CommentService';
import PhotoCommentService from '../service/PhotoCommentService';
import PhotoBoardService from '../service/PhotoBoardService';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


class MyCommentBoardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myqcomments: [],
            mypcomments: [],
            qnaBoards: [],
            photoBoards: []
        }
    }

    componentDidMount() { 
        // placeholder 설정하기
        var searchBar = document.getElementById("searchBar");
        searchBar.placeholder="DZBZ 통합 검색";

        // 내 댓글 qna
        CommentService.getUserComment(MemberService.getCurrentUser().id).then((res) => {
            this.setState({ myqcomments: res.data});
        });

        // 내 댓글 photo
        PhotoCommentService.getUserComment(MemberService.getCurrentUser().id).then((res) => {
            this.setState({ mypcomments: res.data});
        });
    }

    readBoard(qboardNo) {
        this.props.history.push(`/read-board/${qboardNo}`);
    }

    readPhotoBoard(pboardNo) {
        this.props.history.push(`/read-photoboard/${pboardNo}`);
    }

    findQNo(no){
        for(var i=0; i<this.state.myqcomments.length; i++){
            const com = this.state.myqcomments[i];
            if(com.qboardNo['@id'] == no){
                return com.qboardNo.qboardNo;
            }
        }
    }

    findQTitle(no){
        for(var i=0; i<this.state.myqcomments.length; i++){
            const com = this.state.myqcomments[i];
            if(com.qboardNo['@id'] == no){
                return com.qboardNo.qboardTitle;
            }
        }
    }

    findPNo(no){
        for(var i=0; i<this.state.mypcomments.length; i++){
            const com = this.state.mypcomments[i];
            if(com.pboardNo['@id'] == no){
                return com.pboardNo.pboardNo;
            }
        }
    }

    findPTitle(no){
        for(var i=0; i<this.state.mypcomments.length; i++){
            const com = this.state.mypcomments[i];
            if(com.pboardNo['@id'] == no){
                return com.pboardNo.pboardTitle;
            }
        }
    }


    render() {
        return (
        <div className="main-content">
            <div className="row row-inline-block small-spacing">
            <div className="col-xs-12" style={{padding: '1em 4em'}}>
            <div className="box-content">

            <Tabs>
                <TabList>
                    <Tab>&nbsp;&nbsp;&nbsp;&nbsp;Q&amp;A&nbsp;Community&nbsp;&nbsp;&nbsp;&nbsp;</Tab>
                    <Tab>&nbsp;&nbsp;&nbsp;&nbsp;Photo&nbsp;Community&nbsp;&nbsp;&nbsp;&nbsp;</Tab>
                        
                </TabList>
                <TabPanel>
                    <div className="table-responsive clearfix">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th style={{fontSize:'large', padding:'1em'}} colSpan='2'>내가 쓴 댓글</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                this.state.myqcomments.map(
                                    mycomment => 
                                    <tr key = {mycomment.qcommentNo} style={{padding:'2em 3em'}}>
                                        
                                        <td style={{textAlign:'left', padding:'2em'}}>
                                            <div style={{fontSize:'smaller', color:'gray'}}>{mycomment.qcommentInsertTime} </div> 
                                            <div style={{fontSize:'large', padding:'10px 0px'}}>{mycomment.qcommentContent} </div>
                                            { // 그 게시글에 내 댓글 하나밖에 없으면 // json 형식때문에 이렇게 나눔
                                                (mycomment.qboardNo.qboardNo) && <a style={{color: 'rgb(87,81,76)'}} href={'/read-board/'+mycomment.qboardNo.qboardNo}> 원문&nbsp;:&nbsp;{mycomment.qboardNo.qboardTitle} </a>
                                            }
                                            { // 한 게시글에 내 댓글 여러개면
                                                !(mycomment.qboardNo.qboardNo) && <a style={{color: 'rgb(87,81,76)'}} href={'/read-board/'+this.findQNo(mycomment.qboardNo)}> 원문&nbsp;:&nbsp;{this.findQTitle(mycomment.qboardNo)} </a>
                                            }

                                        </td>
                                    </tr>
                                )
                                }
                            </tbody>
                        </table>
                    </div>
                </TabPanel>
                        
                <TabPanel>
                    <div className="table-responsive clearfix">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th style={{fontSize:'large', padding:'1em'}} colSpan='2'>내가 쓴 댓글</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                this.state.mypcomments.map(
                                    mycomment => 
                                    <tr key = {mycomment.pcommentNo} style={{padding:'2em 3em'}}>
                                        
                                        <td style={{textAlign:'left', padding:'2em'}}>
                                            <div style={{fontSize:'smaller', color:'gray'}}>{mycomment.pcommentInsertTime} </div> 
                                            <div style={{fontSize:'large', padding:'10px 0px'}}>{mycomment.pcommentContent} </div>
                                            { 
                                                (mycomment.pboardNo.pboardNo) && <a style={{color: 'rgb(87,81,76)'}} href={'/read-photoboard/'+mycomment.pboardNo.pboardNo}> 원문&nbsp;:&nbsp;{mycomment.pboardNo.pboardTitle} </a>
                                            }
                                            { 
                                                !(mycomment.pboardNo.pboardNo) && <a style={{color: 'rgb(87,81,76)'}} href={'/read-photoboard/'+this.findPNo(mycomment.pboardNo)}> 원문&nbsp;:&nbsp;{this.findPTitle(mycomment.pboardNo)} </a>
                                            }
                                        </td>
                                    </tr>
                                )
                                }
                            </tbody>
                        </table>
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

export default MyCommentBoardComponent;