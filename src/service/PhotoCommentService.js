import axios from 'axios'; 
import authHeader from './auth-header';

const COMMENT_API_BASE_URL = "/api/photo_cmt"; 

class PhotoCommentService{
    getComments(pboardNo) {
        return axios.get(COMMENT_API_BASE_URL + "/" + pboardNo, { headers: authHeader() });
    }
    createComment(pboardNo, comment) {
        return axios.post(COMMENT_API_BASE_URL + "/" + pboardNo, comment, { headers: authHeader() });
    }

    updateComment(pboardNo, pcommentNo, comment) {
        return axios.put(COMMENT_API_BASE_URL + "/" + pboardNo + "/" + pcommentNo, comment, { headers: authHeader() });
    }

    deleteComment(pboardNo, pcommentNo) {
        return axios.delete(COMMENT_API_BASE_URL + "/" + pboardNo + "/" + pcommentNo, { headers: authHeader() });
    }

    getUserComment(user){
        return axios.get(COMMENT_API_BASE_URL + "/writer?writer=" + user, { headers: authHeader() });
    }
}

export default new PhotoCommentService();