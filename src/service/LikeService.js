import axios from 'axios'; 
import authHeader from './auth-header';

const LIKE_API_BASE_URL = "http://localhost:8080/api/like"; 

class LikeService{
    getLikelist(user) {
        return axios.get(LIKE_API_BASE_URL + "?user_id=" + user, { headers: authHeader() });
    }
    
}

export default new LikeService();