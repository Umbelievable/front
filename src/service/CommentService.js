import axios from 'axios'; 

const COMMENT_API_BASE_URL = "http://localhost:8080/api/comment"; 

class CommentService{
    getComments(qboardNo) {
        return axios.get(COMMENT_API_BASE_URL + "/" + qboardNo);
    }

    createComment(qboardNo, comment) {
        return axios.post(COMMENT_API_BASE_URL + "/" + qboardNo, comment);
    }

    updateComment(qboardNo, qcommentNo, comment) {
        return axios.put(COMMENT_API_BASE_URL + "/" + qboardNo + "/" + qcommentNo, comment);
    }

    deleteComment(qboardNo, qcommentNo) {
        return axios.delete(COMMENT_API_BASE_URL + "/" + qboardNo + "/" + qcommentNo);
    }
}

export default new CommentService();