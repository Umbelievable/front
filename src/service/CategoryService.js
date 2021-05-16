import axios from 'axios'; 
import authHeader from './auth-header';

const CATEGORY_API_BASE_URL = "http://localhost:8080/api/category"; 

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
<<<<<<< HEAD

    }

    getLivingroomCategory(){
        return axios.get(CATEGORY_API_BASE_URL + "/small/livingroom");

=======
    }

    getLivingroomCategory(){
        return axios.get(CATEGORY_API_BASE_URL + "/small/livingroom", { headers: authHeader() });
>>>>>>> 8c4fad14df0e9bbeb576640f19a25503ec180052
    }
    

}

export default new CategoryService();