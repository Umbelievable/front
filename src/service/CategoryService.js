import axios from 'axios'; 
import authHeader from './auth-header';

const CATEGORY_API_BASE_URL = "/api/category"; 

class CategoryService {

    getCategory() {
        return axios.get(CATEGORY_API_BASE_URL + "/big", { headers: authHeader() });
    }

    getBedCategory(){
        return axios.get(CATEGORY_API_BASE_URL + "/small/bedroom", { headers: authHeader() });
    }

    getKitchenCategory(){
        return axios.get(CATEGORY_API_BASE_URL + "/small/kitchen", { headers: authHeader() });
    }

    getLibraryCategory(){
        return axios.get(CATEGORY_API_BASE_URL + "/small/library", { headers: authHeader() });
    }

    getStorageCategory(){
        return axios.get(CATEGORY_API_BASE_URL + "/small/storage", { headers: authHeader() });

    }

    getLivingroomCategory(){
        return axios.get(CATEGORY_API_BASE_URL + "/small/livingroom");

    }
    

}

export default new CategoryService();