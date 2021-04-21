import axios from 'axios'; 
import authHeader from './auth-header';

const BOARD_API_BASE_URL = "http://localhost:8080/api/photo"; 

class PhotoBoardService{
    getBoards(p_num) {
        return axios.get(BOARD_API_BASE_URL + "?p_num=" + p_num, { headers: authHeader() });
    }

    createBoard(photo) {
        return axios.post(BOARD_API_BASE_URL, photo, { headers: authHeader() });
    }

    getOneBoard(pboardNo) {
        return axios.get(BOARD_API_BASE_URL + "/" + pboardNo, { headers: authHeader() });
    }

    updateBoard(pboardNo, photo) {
        return axios.put(BOARD_API_BASE_URL + "/" + pboardNo, photo, { headers: authHeader() });
    }

    deleteBoard(pboardNo) {
        return axios.delete(BOARD_API_BASE_URL + "/" + pboardNo, { headers: authHeader() });
    }
    
    searchBoards(searchType, searchKeyword){
        return axios.get(BOARD_API_BASE_URL + "/search?type=" + searchType + "&keyword=" + searchKeyword, { headers: authHeader() });
    }
}

export default new PhotoBoardService();