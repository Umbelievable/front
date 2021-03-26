import axios from 'axios'; 

const MEMBER_API_BASE_URL = "http://localhost:8080/api/member"; 

class MemberService{
    

    createMember(member) { //회원가입
        return axios.post("http://localhost:8080/api/join", member);
    }

    getOneMember(userid) { //로그인 id 가져오기
        return axios.post(MEMBER_API_BASE_URL + "/" + userid);
    }

    
}

export default new MemberService();