import React, { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import MemberService from '../../service/MemberService';

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  
  const email = value => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
  };
  
  const vusername = value => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The username must be between 3 and 20 characters.
        </div>
      );
    }
  };
  
  const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };
  
class JoinMemberComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            successful: false,
            message: ""
        }
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    

    }

    onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
      }
    
      onChangeEmail(e) {
        this.setState({
          email: e.target.value
        });
      }
    
      onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
      }

      handleRegister(e) {
        e.preventDefault();
    
        this.setState({
          message: "",
          successful: false
        });
    
        this.form.validateAll();
    
        if (this.checkBtn.context._errors.length === 0) {
          MemberService.register(
            this.state.username,
            this.state.email,
            this.state.password
          ).then(
            response => {
              this.setState({
                message: response.data.message,
                successful: true
              });
              this.props.history.push('/main-board');
            },
            error => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              this.setState({
                successful: false,
                message: resMessage
              });
            }
          );
        }
      }


    render() {
        return (
        <div class="main-content">
            <div class="row row-inline-block small-spacing">
            <div class="col-xs-12">
            <div class="box-content">
            <div class="clearfix"><h4 class="box-title pull-left"></h4></div>

            <div style={{width:'840px', margin:'auto'}}  class="card-content" >
            <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="ID">아이디</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}  // db되고 back되면 이게 userid임
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">비밀번호</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">이메일</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="name">이름</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    //추가
                  />
                  
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNo">전화번호</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    //추가
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="birthDate">생년월일</label>
                  <br/>

                  <div style={{display:'inline'}}>
                  <input
                    style={{display: 'inline-block', width: '260px',margin:'0px 30px 0px 0px'}}
                    class="form-control"
                    type="text"
                    name="name"
                    placeholder="년(4자)"
                    aria-label="년(4자)"
                    maxLength="4"
                    //추가
                  />
                  </div>
                  <div style={{display:'inline'}}>
                   <select style={{display: 'inline-block', width: '260px',margin:'0px 0px 0px 0px'}} 
                          aial-label="월"
                          class="form-control"
                   >
                   <option value>월</option>
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
                   <input type="text" 
                          style={{display: 'inline-block', width: '260px',margin:'0px 0px 0px 30px'}}
                          class="form-control"
                          placeholder="일" 
                          aria-label="일" 
                          maxLength="2"></input>
                          
                          </div>
                </div>
                

                <div className="form-group">
                  <label htmlFor="sex">성별</label>
                  <select
                    className="form-control"
                    name="sex"
                    aria-label="성별"
                    //추가
                    >
                      <option value selected>성별</option>
                      <option value="M">남자</option>
                      <option value="F">여자</option>
                    </select>    
                 
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">가입하기</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
             
            </div>                                

        
            </div>
            </div>
            </div>
        </div>

        );
    }
}

export default JoinMemberComponent;