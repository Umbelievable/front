import React, { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import MemberService from '../../service/MemberService';
import UserService from '../../service/UserService';

const required = value => {
    if (!value) {
        return (
        <div className="alert alert-danger" role="alert"> This field is required!</div>
        );
    }
};
  
const email = value => {
    if (!isEmail(value)) {
        return (
        <div className="alert alert-danger" role="alert"> This is not a valid email.</div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
        <div className="alert alert-danger" role="alert"> The password must be between 6 and 40 characters.</div>
        );
    }
};
  
class UpdateMemberComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            email: "",
            password: "",
            username: "",
            birY: "",
            birM: "",
            birD: "",
            birthDate: "",
            phone: "",
            sex: "", 
            successful: false,
            message: ""
        }

        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeBirY = this.onChangeBirY.bind(this);
        this.onChangeBirM = this.onChangeBirM.bind(this);
        this.onChangeBirD = this.onChangeBirD.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeSex = this.onChangeSex.bind(this);

    }

    componentDidMount() {
        UserService.getUserInfo(MemberService.getCurrentUser().id).then((res) => {
            this.setState({id: res.data.id,
                        email: res.data.email,
                        username: res.data.username,
                        phone: res.data.phone,
                        sex: res.data.sex,
                        birthDate: res.data.birthDate
            });
            var bir = res.data.birthDate.split("-");
            this.setState({birY: bir[0], birM: bir[1], birD: bir[2]});
        }); 
    }

    onChangeEmail(e) {
        this.setState({ email: e.target.value });
    }
    
    onChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    onChangeUsername(e) {
        this.setState({username: e.target.value});
    }
    
    onChangeBirY(e) {
        this.setState({birY: e.target.value});
    }

    onChangeBirM(e) {
        this.setState({birM: e.target.value});
    }

    onChangeBirD(e) {
        this.setState({birD: e.target.value});
    }
    
    onChangePhone(e) {
        this.setState({phone: e.target.value});
    }

    onChangeSex(e) {
        this.setState({ sex: e.target.value });
    }


    handleRegister(e) {
        e.preventDefault();
        this.setState({ message: "", successful: false });
        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            let user = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                phone: this.state.phone,
                sex: this.state.sex,
                birthDate: this.state.birthDate
            };
            UserService.updateUserInfo(this.state.id,user).then( response => {
                this.setState({ message: response.data.message, successful: true});
                alert('???????????? ????????????');
                this.props.history.push('/main-board');
            }, 
            error =>{
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                this.setState({ successful: false, message: resMessage });}
            );
        }
    }


    render() {
        return (
        <div class="main-content">
            <div class="row row-inline-block small-spacing">
            <div class="col-xs-12">
            <div class="box-content">

            <div style={{width:'600px', margin:'auto'}}  class="card-content" >

            <Form onSubmit={this.handleRegister} ref={c => {this.form = c;}}>
                {!this.state.successful && (
                <div>
                    <div className="form-group">
                        <label style={{fontSize:'16px'}} htmlFor="id">?????????</label>
                        <input style={{height:'40px', fontSize:'16px'}} type="text" className="form-control" name="id" value={this.state.id} disabled/>
                    </div>

                    <div className="form-group">
                        <label style={{fontSize:'16px'}} htmlFor="password">????????????</label>
                        <input style={{height:'40px', fontSize:'16px'}} type="password" className="form-control" name="password" placeholder="??? ??????????????? ??????????????????" value={this.state.password} onChange={this.onChangePassword} validations={[required, vpassword]}/>
                    </div>

                    <div className="form-group">
                        <label style={{fontSize:'16px'}} htmlFor="email">?????????</label>
                        <Input style={{height:'40px', fontSize:'16px'}} type="text" className="form-control" name="email" value={this.state.email} onChange={this.onChangeEmail} validations={[required, email]}/>
                    </div>

                    <div className="form-group">
                        <label style={{fontSize:'16px'}} htmlFor="username">??????</label>
                        <Input style={{height:'40px', fontSize:'16px'}} type="text" className="form-control" name="username" value={this.state.username} onChange={this.onChangeUsername}/>
                    </div>

                    <div className="form-group">
                        <label style={{fontSize:'16px'}} htmlFor="phone">????????????</label>
                        <Input style={{height:'40px', fontSize:'16px'}} type="text" className="form-control" name="phone" value={this.state.phone} onChange={this.onChangePhone}/>
                    </div>

                    <div className="form-group">
                        <label style={{fontSize:'16px'}} htmlFor="birthDate">????????????</label>
                        <br/>
                        <div style={{display:'inline'}}>
                            <input style={{height:'40px', fontSize:'16px', display: 'inline-block', width: '180px',margin:'0px 30px 0px 0px'}} class="form-control" type="text" name="birY" placeholder="???(4???)"
                            aria-label="???(4???)" maxLength="4" value={this.state.birY} onChange={this.onChangeBirY}/>
                        </div>
                        <div style={{display:'inline'}}>
                            <select style={{height:'40px', fontSize:'16px', display: 'inline-block', width: '180px',margin:'0px 0px 0px 0px'}} aial-label="???" name="birM" class="form-control" placeholder="???(4???)"
                            defaultValue={this.state.birM} onChange={this.onChangeBirM}>
                                <option value>???</option>
                                <option value="01">1</option>
                                <option value="02">2</option>
                                <option value="03">3</option>
                                <option value="04">4</option>
                                <option value="05">5</option>
                                <option value="06">6</option>
                                <option value="07">7</option>
                                <option value="08">8</option>
                                <option value="09">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                        </div>
                        <div style={{display:'inline'}}>
                            <input type="text" style={{height:'40px', fontSize:'16px', display: 'inline-block', width: '180px',margin:'0px 0px 0px 30px'}} class="form-control" name="birD" placeholder="???" 
                            aria-label="???" maxLength="2" value={this.state.birD} onChange={this.onChangeBirD}/>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label style={{fontSize:'16px'}} htmlFor="sex">??????</label>
                        <select style={{height:'40px', fontSize:'16px'}} className="form-control" name="sex" aria-label="??????" value={this.state.sex} onChange={this.onChangeSex}>
                            <option value selected>??????</option>
                            <option value="Y">??????</option>
                            <option value="X">??????</option>
                            <option value="N">?????????</option>
                        </select>    
                    </div>

                    <div className="form-group">
                        <button className="btn-main" style={{width:'100%', height:'45px', fontFamily:'NanumSquareR'}}>???????????? ??????</button>
                    </div>
                </div>
                )}
                {this.state.message && (
                <div className="form-group">
                    <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">{this.state.message}</div>
                </div>)}
                <CheckButton style={{ display: "none" }} ref={c => {this.checkBtn = c;}}/>
            </Form>        
            </div>                                

            </div>
            </div>
            </div>
        </div>

        );
    }
}

export default UpdateMemberComponent;