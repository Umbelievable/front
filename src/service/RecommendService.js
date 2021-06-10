import axios from 'axios'; 
import authHeader from './auth-header';

const RECOMMEND_API_BASE_URL = "/api"; 

class RecommendService {
    // nodata
    getRecommendProduct(){
        return axios.get(RECOMMEND_API_BASE_URL + "/noData", { headers: authHeader() });
    }

    // certainItem
    getRecommendProductById(item){
        return axios.post(RECOMMEND_API_BASE_URL + "/recommend", item, { headers: authHeader() });
    }


}

export default new RecommendService();