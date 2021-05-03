import axios from 'axios'; 
import authHeader from './auth-header';


const MAIN_API_BASE_URL = "http://localhost:8080/api/main"; 

class MainBoardService{
    searchItems(searchKeyword){
        return axios.get(MAIN_API_BASE_URL+"/search/items?keyword="+searchKeyword,{ headers: authHeader() });
    }
    searchPhotos(searchKeyword){
        return axios.get(MAIN_API_BASE_URL+"/search/photos?keyword="+searchKeyword,{ headers: authHeader() });
    }
    searchQna(searchKeyword){
        return axios.get(MAIN_API_BASE_URL+"/search/qna?keyword="+searchKeyword,{ headers: authHeader() });
    }

}
export default new MainBoardService();