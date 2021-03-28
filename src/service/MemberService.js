import axios from 'axios'; 

const MEMBER_API_BASE_URL = "http://localhost:8080/api/auth/"; 

class MemberService{
    login(username, password) {
        return axios
          .post(MEMBER_API_BASE_URL + "signin", {
            username,
            password
          })
          .then(response => {
            if (response.data.accessToken) {
              localStorage.setItem("user", JSON.stringify(response.data));
            }
    
            return response.data;
          });
      }
    
      logout() {
        localStorage.removeItem("user");
      }
    
      register(username, email, password) {
        return axios.post(MEMBER_API_BASE_URL + "signup", {
          username,
          email,
          password
        });
      }
    
      getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
      }
}

export default new MemberService();