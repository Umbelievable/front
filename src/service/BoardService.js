import axios from 'axios'; 
import authHeader from './auth-header';

const BOARD_API_BASE_URL = "http://localhost:8080/api/board"; 

class BoardService {

    getBoards(p_num) {
        return axios.get(BOARD_API_BASE_URL + "?p_num=" + p_num, { headers: authHeader() });
    }

    createBoard(board) {
        return axios.post(BOARD_API_BASE_URL, board, { headers: authHeader() });
    }

    getOneBoard(qboardNo) {
        return axios.get(BOARD_API_BASE_URL + "/" + qboardNo, { headers: authHeader() });
    }

    updateBoard(qboardNo, board) {
        return axios.put(BOARD_API_BASE_URL + "/" + qboardNo, board, { headers: authHeader() });
    }

    deleteBoard(qboardNo) {
        return axios.delete(BOARD_API_BASE_URL + "/" + qboardNo, { headers: authHeader() });
    }
    
    searchBoards(searchKeyword){
        return axios.get(BOARD_API_BASE_URL + "/search?keyword=" + searchKeyword, { headers: authHeader() });

    }
}

export default new BoardService();