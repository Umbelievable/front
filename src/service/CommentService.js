import axios from 'axios'; 

const COMMENT_API_BASE_URL = "http://localhost:8080/api/comment"; 

class CommentService{
    getComments(idx) {
        return axios.get(COMMENT_API_BASE_URL + "/" + idx);
    }

    createComment(comment) {
        return axios.post(COMMENT_API_BASE_URL, comment);
    }

    updateComment(idx, commentIdx, comment) {
        return axios.put(COMMENT_API_BASE_URL + "/" + idx + "/" + commentIdx, comment);
    }

    deleteComment(idx, commentIdx) {
        return axios.delete(COMMENT_API_BASE_URL + "/" + idx + "/" + commentIdx);
    }
}

export default new CommentService();