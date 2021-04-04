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

    getOneBoard(idx) {
        return axios.get(BOARD_API_BASE_URL + "/" + idx, { headers: authHeader() });
    }

    updateBoard(idx, board) {
        return axios.put(BOARD_API_BASE_URL + "/" + idx, board, { headers: authHeader() });
    }

    deleteBoard(idx) {
        return axios.delete(BOARD_API_BASE_URL + "/" + idx, { headers: authHeader() });
    }
    
    searchBoards(searchType, searchKeyword){
        return axios.get(BOARD_API_BASE_URL + "/search?type=" + searchType + "&keyword=" + searchKeyword, { headers: authHeader() });
    }
}

export default new BoardService();