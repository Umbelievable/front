import axios from 'axios'; 
import authHeader from './auth-header';

const PURCHASE_API_BASE_URL = "http://localhost:8080/api/purchase"; 

class PurchaseService{
    addPurchase(pur){ // 주문목록 추가
        return axios.post(PURCHASE_API_BASE_URL, pur, { headers: authHeader() });
    }
}

export default new PurchaseService();