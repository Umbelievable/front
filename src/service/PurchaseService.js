import axios from 'axios'; 
import authHeader from './auth-header';

const PURCHASE_API_BASE_URL = "http://localhost:8080/api/purchase"; 

class PurchaseService{
    getPurchaselist(user) {
        return axios.get(PURCHASE_API_BASE_URL + "/user_id?user_id=" + user, { headers: authHeader() });
    }

    addPurchase(pur){ // 주문목록 추가
        return axios.post(PURCHASE_API_BASE_URL, pur, { headers: authHeader() });
    }
}

export default new PurchaseService();