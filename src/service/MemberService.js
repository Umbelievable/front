import axios from 'axios'; 

const MEMBER_API_BASE_URL = "http://localhost:8080/api/auth/"; 

class MemberService{
    login(id, password) {
        return axios
          .post(MEMBER_API_BASE_URL + "signin", {
            id,
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
    
      register(id, email, password, username, birthDate, phone, sex) {
        return axios.post(MEMBER_API_BASE_URL + "signup", {
          id,
          username,
          email,
          password,
          birthDate,
          phone,
          sex
        });
      }
    
      getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
      }
}

export default new MemberService();