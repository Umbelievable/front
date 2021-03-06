import axios from 'axios'; 
import authHeader from './auth-header';

const COMMENT_API_BASE_URL = "/api/comment"; 

class CommentService{
    getComments(qboardNo) {
        return axios.get(COMMENT_API_BASE_URL + "/" + qboardNo, { headers: authHeader() });
    }

    createComment(qboardNo, comment) {
        return axios.post(COMMENT_API_BASE_URL + "/" + qboardNo, comment, { headers: authHeader() });
    }

    updateComment(qboardNo, qcommentNo, comment) {
        return axios.put(COMMENT_API_BASE_URL + "/" + qboardNo + "/" + qcommentNo, comment, { headers: authHeader() });
    }

    deleteComment(qboardNo, qcommentNo) {
        return axios.delete(COMMENT_API_BASE_URL + "/" + qboardNo + "/" + qcommentNo, { headers: authHeader() });
    }
    
    getUserComment(user){
        return axios.get(COMMENT_API_BASE_URL + "/writer?writer=" + user, { headers: authHeader() });
    }
}

export default new CommentService();