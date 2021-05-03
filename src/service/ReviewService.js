import axios from 'axios'; 
import authHeader from './auth-header';

const REVIEW_API_BASE_URL = "http://localhost:8080/api/reviews"; 

<<<<<<< HEAD
class ReviewService{
=======
class ReviewService {
>>>>>>> 8c4fad14df0e9bbeb576640f19a25503ec180052

    getReviews(p_num, category, subcate, pdNo) {
        return axios.get(REVIEW_API_BASE_URL + "?p_num=" + p_num + "&category=" + category + "&subcate=" + subcate + "&pdNo=" + pdNo, { headers: authHeader() });
    }
<<<<<<< HEAD
    
    // createReview(category,subcate,pdNo,review ){
    //     return axios.get(REVIEW_API_BASE_URL+"?category="+category+"&subcate="+subcate+"&pdNo="+pdNo,review,{headers:authHeader()});
    // }
    
}
=======


    
}

>>>>>>> 8c4fad14df0e9bbeb576640f19a25503ec180052
export default new ReviewService();