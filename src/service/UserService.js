import axios from 'axios'; 
import authHeader from './auth-header';

const USER_API_BASE_URL = "http://localhost:8080/api/user"; 

class UserService{

    getUserInfo(userid) {
        return axios.get(USER_API_BASE_URL + "?id=" + userid, { headers: authHeader() });
    }

    updateUserInfo(userid, user) {
        return axios.put(USER_API_BASE_URL + "/" + userid, user, { headers: authHeader() });
    }

}

export default new UserService();