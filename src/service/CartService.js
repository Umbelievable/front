import axios from 'axios'; 
import authHeader from './auth-header';

const CART_API_BASE_URL = "http://localhost:8080/api/cart"; 

class CartService{
    getCartItems(user_id) {
        return axios.get(CART_API_BASE_URL + "?user_id=" + user_id, { headers: authHeader() });
    }

    addItem(item){
        return axios.post(CART_API_BASE_URL, item, { headers: authHeader() });
    }

    deleteItem(cartNo) {
        return axios.delete(CART_API_BASE_URL + "/" + cartNo, { headers: authHeader() });
    }

    updateItem(cartNo, volume){
        return axios.put(CART_API_BASE_URL + "/" + cartNo + "/" + volume, { headers: authHeader() });
    }
    
       
}

export default new CartService();