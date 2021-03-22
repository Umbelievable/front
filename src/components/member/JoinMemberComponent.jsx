import React, { Component } from 'react';



class JoinMemberComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            password: '',
            
        }

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
					        <div class="col-sm-10">
						        <input type="text" class="form-control" placeholder="이름"/>
					        </div>
				    </div>

                    <div class="form-group">
					    <label for="title" class="col-sm-2 control-label">아이디</label>
					        <div class="col-sm-10">
						        <input type="text" class="form-control" placeholder="아이디"/>
					        </div>
				    </div>

                    <div class="form-group">
					    <label for="title" class="col-sm-2 control-label">비밀번호</label>
					        <div class="col-sm-10">
						        <input type="text" class="form-control" placeholder="비밀번호"/>
					        </div>
				    </div>

                    <div class="form-group">
					    <label for="title" class="col-sm-2 control-label">주소</label>
					        <div class="col-sm-10">
						        <input type="text" class="form-control" placeholder="주소"/>
					        </div>
				    </div>
			    
				   

				    <div class="btn_wrap text-center">
                        <button type="submit" class="btn btn-primary waves-effect waves-light" >회원가입</button>
                       					    
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