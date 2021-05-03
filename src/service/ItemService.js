import axios from 'axios'; 
import authHeader from './auth-header';


const ITEM_API_BASE_URL = "http://localhost:8080/api/items"; 

class ItemService {
    getAllItems(cateNo){
        if(cateNo=="거실가구"){
            return axios.get(ITEM_API_BASE_URL + "/list/allLivingroom", { headers: authHeader() });
        }
        else if(cateNo=="침실가구"){
            return axios.get(ITEM_API_BASE_URL + "/list/all Bedroom", { headers: authHeader() });
        }
        else if(cateNo=="서재/사무용가구"){
            return axios.get(ITEM_API_BASE_URL + "/list/allLibrary", { headers: authHeader() });
        }
        else if(cateNo=="수납가구"){
            return axios.get(ITEM_API_BASE_URL + "/list/allStorage", { headers: authHeader() });
        }
        else { // 주방가구
            return axios.get(ITEM_API_BASE_URL + "/list/allKitchen", { headers: authHeader() });
        }
    }

    getCertainItems(subcateNo,category){
       return axios.get(ITEM_API_BASE_URL+"/list/"+category+"?subcateNo="+subcateNo, { headers: authHeader() });

    }

    getCertainItem(pdNo,cateNo,subcateNo){
        return axios.get(ITEM_API_BASE_URL + "/getItem?pdNo="+pdNo+"&cateNo="+cateNo+"&subcateNo="+subcateNo, { headers: authHeader() });
    }

    // //카테고리 상관 x
    // searchItems(searchKeyword){
    //     return axios.get(ITEM_API_BASE_URL+"/searchAll?keyword="+searchKeyword, { headers:authHeader()});
    // }

    // //카테고리 별 검색
    // searchCateItems(searchKeyword,cateNo,thisCateNo){
    //     return axios.get(ITEM_API_BASE_URL+"/search?keyword="+searchKeyword+"&category="+cateNo+"&thisCate="+thisCateNo,{headers:authHeader()});
    // }

}

export default new ItemService();