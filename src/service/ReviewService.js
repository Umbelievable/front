import axios from 'axios'; 
import authHeader from './auth-header';

const REVIEW_API_BASE_URL = "http://localhost:8080/api/reviews"; 

class ReviewService {

    getReviews(p_num, category, subcate, pdNo) {
        return axios.get(REVIEW_API_BASE_URL + "?p_num=" + p_num + "&category=" + category + "&subcate=" + subcate + "&pdNo=" + pdNo, { headers: authHeader() });
    }

    getReviewsByHashtag(pdNo, subcate, category, hashtag) {
        return axios.get(REVIEW_API_BASE_URL + "/hashtag?pdNo=" + pdNo + "&subcate=" + subcate + "&category=" + category + "&hashtag=" + hashtag, { headers: authHeader() });
    }

    createReview(cateNo, subcateNo, pdNo, review){
        return axios.post(REVIEW_API_BASE_URL + "?category=" + cateNo + "&subcate=" + subcateNo + "&pdNo=" + pdNo, review, { headers: authHeader() });
    }

}

export default new ReviewService();