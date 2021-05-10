import React, { Component } from 'react';
import MemberService from '../service/MemberService';

class CartBoardComponent extends Component {
    constructor(props) {
        
        super(props)
        this.state = {
            currentUser: { id: "" }
        }
    }

    componentDidMount() {
        const currentUser = MemberService.getCurrentUser();
        if (!currentUser){
            this.setState({ currentUser: "guest", userReady: false });
        }
        else{
            this.setState({ currentUser: currentUser, userReady: true });
        } 
     
    }

    
    render() {
        const { currentUser } = this.state;
        const ColoredLine = ({ color }) => (
            <hr
                style={{
                    color: color,
                    backgroundColor: color,
                    height: 0.5
                }}
            />
        );

        return (
            <div className="main-content"> 
                <div className="row row-inline-block small-spacing">
				<div className="col-xs-12">                   
				<div className="box-content">
                    

                <div className="col-sm-12">
                    <p style={{padding:'1em 0em 0em 3em', fontSize:'large'}}><b>{currentUser.id}</b>님의 장바구니</p>
                    <div className="col-sm-2" style={{padding:'1em 0em 1em 4em'}}>
                        <div style={{display:'inline', verticalAlign: 'top'}}><input type="checkbox" name="color" value="blue"/></div>
                        <p style={{display:'inline', paddingLeft:'1em'}}>모두 선택</p>
                    </div>
                    <br/>
                    <div className="col-sm-15" style={{paddingTop:'1em'}}>
                        <ColoredLine color="lightgray" />
                    </div>
                </div>

                
                <div className="row row-cols-1 row-cols-sm-2 g-2">
                    <div style={{overflowY:'scroll', height:'340px', width:'100%'}}>
                        <div className="col-sm-12">
                            <div className="col-sm-4" style={{padding:'1em 0em 1em 5em'}}>
                                <div style={{display:'inline', verticalAlign: 'top'}}><input type="checkbox" name="color" value="blue"/></div>
                                <img className="cartcropping" src="http://cdn.011st.com/11dims/resize/600x600/quality/75/11src/pd/17/8/4/3/3/2/4/XaCvd/10843324_B.jpg"/>
                            </div>
                            <div className="col-sm-6" style={{padding:'1em 0em'}}>
                                <div style={{ fontWeight:'bolder', fontSize:'small', color:'gray'}}>회사이름</div>
                                <div style={{ paddingTop:'5px', paddingBottom:'10px', fontSize:'large', color:'black'}}>가구이름</div>
                                <div style={{ fontWeight:'bolder', paddingTop:'10px', paddingBottom:'3px', fontSize:'20px', color:'black'}}>100,000원</div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="col-sm-4" style={{padding:'1em 0em 1em 5em'}}>
                                <div style={{display:'inline', verticalAlign: 'top'}}><input type="checkbox" name="color" value="blue"/></div>
                                <img className="cartcropping" src="https://shopping-phinf.pstatic.net/main_1414725/14147251300.20210305110358.jpg?type=f640"/>
                            </div>
                            <div className="col-sm-6" style={{padding:'1em 0em'}}>
                                <div style={{ fontWeight:'bolder', fontSize:'small', color:'gray'}}>회사이름</div>
                                <div style={{ paddingTop:'5px', paddingBottom:'10px', fontSize:'large', color:'black'}}>가구이름</div>
                                <div style={{ fontWeight:'bolder', paddingTop:'10px', paddingBottom:'3px', fontSize:'20px', color:'black'}}>100,000원</div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="col-sm-4" style={{padding:'1em 0em 1em 5em'}}>
                                <div style={{display:'inline', verticalAlign: 'top'}}><input type="checkbox" name="color" value="blue"/></div>
                                <img className="cartcropping" src="https://shopping-phinf.pstatic.net/main_2592100/25921002522.20210208193230.jpg?type=f640"/>
                            </div>
                            <div className="col-sm-6" style={{padding:'1em 0em'}}>
                                <div style={{ fontWeight:'bolder', fontSize:'small', color:'gray'}}>회사이름</div>
                                <div style={{ paddingTop:'5px', paddingBottom:'10px', fontSize:'large', color:'black'}}>가구이름</div>
                                <div style={{ fontWeight:'bolder', paddingTop:'10px', paddingBottom:'3px', fontSize:'20px', color:'black'}}>100,000원</div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="col-sm-4" style={{padding:'1em 0em 1em 5em'}}>
                                <div style={{display:'inline', verticalAlign: 'top'}}><input type="checkbox" name="color" value="blue"/></div>
                                <img className="cartcropping" src="https://shopping-phinf.pstatic.net/main_2592100/25921002522.20210208193230.jpg?type=f640"/>
                            </div>
                            <div className="col-sm-6" style={{padding:'1em 0em'}}>
                                <div style={{ fontWeight:'bolder', fontSize:'small', color:'gray'}}>회사이름</div>
                                <div style={{ paddingTop:'5px', paddingBottom:'10px', fontSize:'large', color:'black'}}>가구이름</div>
                                <div style={{ fontWeight:'bolder', paddingTop:'10px', paddingBottom:'3px', fontSize:'20px', color:'black'}}>100,000원</div>
                            </div>
                        </div>
                    </div>

                    <div style={{padding:'14px', borderLeft:'1px solid lightgray'}}>
                        총 상품금액<br/>
                        총 배송비<br/>
                        총 할인금액<br/><br/>

                        결제금액
                    </div>

                </div>

                
                

				</div>
				</div>
				</div>
			</div>
        );
    }
}

export default CartBoardComponent;