import axios from 'axios'; 
import authHeader from './auth-header';

const RECOMMEND_API_BASE_URL = "/rec"; 

class RecommendService {
    // nodata
    getRecommendProduct(){
        return axios.get(RECOMMEND_API_BASE_URL + "/nodata", { headers: authHeader() });
    }

    // certainItem
    getRecommendProductById(){
        return axios.post(RECOMMEND_API_BASE_URL + "/recommend", { headers: authHeader() });
    }
    

}

export default new RecommendService();