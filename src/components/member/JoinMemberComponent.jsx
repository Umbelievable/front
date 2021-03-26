import React, { Component } from 'react';
import MemberService from '../../service/MemberService';



class JoinMemberComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',
            name: '',
            p_number: '',
            postal_code: '',
            address: '',
            sex: '',
            birthday: '',
            nickname: ''

            
        }


        this.changeIdHandler = this.changeIdHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeNumberHandler = this.changeNumberHandler.bind(this);

        this.changeCodeHandler = this.changeCodeHandler.bind(this);
        this.changeAddHandler = this.changeAddHandler.bind(this);
        this.changeSexHandler = this.changeSexHandler.bind(this);
        this.changeBirHandler = this.changeBirHandler.bind(this);
        this.changeNickHandler = this.changeNickHandler.bind(this);

        this.createMember = this.createMember.bind(this);

    }

    changeIdHandler = (event) => {
        this.setState({id: event.target.value});
    }
    changePasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }
    changeNameHandler = (event) => {
        this.setState({name: event.target.value});
    }
    changeNumberHandler = (event) => {
        this.setState({p_number: event.target.value});
    }
    changeCodeHandler = (event) => {
        this.setState({postal_code: event.target.value});
    }
    changeAddHandler = (event) => {
        this.setState({address: event.target.value});
    }
    changeSexHandler = (event) => {
        this.setState({sex: event.target.value});
    }
    changeBirHandler = (event) => {
        this.setState({birthday: event.target.value});
    }
    changeNickHandler = (event) => {
        this.setState({nickname: event.target.value});
    }

    createMember = (event) => {
        event.preventDefault();
    
        let member = {
            id: this.state.id,
            password: this.state.password,
            name: this.state.name,
            p_number: this.state.p_number,
            postal_code: this.state.postal_code,
            address: this.state.address,
            sex: this.state.sex,
            birthday: this.state.birthday,
            nickname: this.state.nickname
        };
        console.log("member => "+ JSON.stringify(member));

        
        MemberService.createMember(member).then(res => {
            this.props.history.push('/main-board');
        });
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
					    <label for="title" class="col-sm-2 control-label">이름</label>
					        <div class="col-sm-3">
						        <input type="text" value={this.state.name} onChange={this.changeNameHandler} class="form-control" placeholder="이름"/>
					        </div>
				    </div>                    

                    <div class="form-group">
					    <label for="title" class="col-sm-2 control-label">닉네임</label>
					        <div class="col-sm-3">
						        <input type="text" value={this.state.nickname} onChange={this.changeNickHandler} class="form-control" placeholder="닉네임"/>
					        </div>
				    </div>

                    <div class="form-group">
					    <label for="title" class="col-sm-2 control-label">아이디</label>
					        <div class="col-sm-3">
						        <input type="text" value={this.state.id} onChange={this.changeIdHandler} class="form-control" placeholder="아이디"/>
					        </div>
				    </div>

                    <div class="form-group">
					    <label for="title" class="col-sm-2 control-label">비밀번호</label>
					        <div class="col-sm-3">
						        <input type="password" value={this.state.password} onChange={this.changePasswordHandler} class="form-control" placeholder="비밀번호"/>
					        </div>
				    </div>
                    
                    <div class="form-group">
					    <label for="title" class="col-sm-2 control-label">성별</label>
                            <div class="col-sm-10">
                                <input type="radio" name="sex" value="Y" onChange={this.changeSexHandler}/>남자
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="radio" name="sex" value="X" onChange={this.changeSexHandler}/>여자
                            </div>
				    </div>

                    <div class="form-group">
					    <label for="title" class="col-sm-2 control-label">전화번호</label>
					        <div class="col-sm-3">
						        <input type="text" value={this.state.p_number} onChange={this.changeNumberHandler} class="form-control" placeholder="전화번호"/>
					        </div>
				    </div>

                    <div class="form-group">
					    <label for="title" class="col-sm-2 control-label">우편번호</label>
					        <div class="col-sm-2">
						        <input type="text" value={this.state.postal_code} onChange={this.changeCodeHandler} class="form-control" placeholder="우편번호"/>
					        </div>
				    </div>

                    <div class="form-group">
					    <label for="title" class="col-sm-2 control-label">주소</label>
					        <div class="col-sm-5">
						        <input type="text" value={this.state.address} onChange={this.changeAddHandler} class="form-control" placeholder="주소"/>
					        </div>
				    </div>

                    <div class="form-group">
					    <label for="title" class="col-sm-2 control-label">생년월일</label>
					        <div class="col-sm-2">
						        <input type="date" value={this.state.birthday} onChange={this.changeBirHandler} class="form-control" placeholder="생년월일"/>
					        </div>
				    </div>

                
				    <div class="btn_wrap text-center">
                        <button type="submit" class="btn btn-primary waves-effect waves-light" onClick={this.createMember}>회원가입</button>
                       					    
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

export default JoinMemberComponent;