import axios from 'axios'; 

const COMMENT_API_BASE_URL = "http://localhost:8080/api/photo_cmt"; 

class PhotoCommentService{
    getComments(pboardNo) {
        return axios.get(COMMENT_API_BASE_URL + "/" + pboardNo);
    }
    createComment(comment) {
        return axios.post(COMMENT_API_BASE_URL, comment);
    }

    updateComment(pboardNo, pcommentNo, comment) {
        return axios.put(COMMENT_API_BASE_URL + "/" + pboardNo + "/" + pcommentNo, comment);
    }

    deleteComment(pboardNo, pcommentNo) {
        return axios.delete(COMMENT_API_BASE_URL + "/" + pboardNo + "/" + pcommentNo);
    }

}

export default new PhotoCommentService();