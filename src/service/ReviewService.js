import axios from 'axios'; 
import authHeader from './auth-header';

const REVIEW_API_BASE_URL = "http://localhost:8080/api/reviews"; 

class ReviewService {

    

    getReviews(p_num, category, subcate, pdNo) {
        return axios.get(REVIEW_API_BASE_URL + "?p_num=" + p_num + "&category=" +category + "&subcate=" + subcate + "&pdNo=" + pdNo,{ headers: authHeader() });
    }


    
}

export default new ReviewService();