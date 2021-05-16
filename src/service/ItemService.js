<<<<<<< HEAD
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

=======
import axios from 'axios'; 
import authHeader from './auth-header';


const ITEM_API_BASE_URL = "http://localhost:8080/api/items"; 

class ItemService {
    getAllItems(cateNo){
        if(cateNo=="거실가구"){
            return axios.get(ITEM_API_BASE_URL + "/list/allLivingroom", { headers: authHeader() });
        }
        else if(cateNo=="침실가구"){
            return axios.get(ITEM_API_BASE_URL + "/list/allBedroom", { headers: authHeader() });
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

    getCertainItems(cateNo, subcateNo){
        if(cateNo=="거실가구"){
            if(subcateNo=="TV거실장"){
                return axios.get(ITEM_API_BASE_URL + "/list/livingroom?subcateNo=TV거실장", { headers: authHeader() });               
            }
            else if(subcateNo=="소파"){
                return axios.get(ITEM_API_BASE_URL + "/list/livingroom?subcateNo=소파", { headers: authHeader() });
            }
            else if(subcateNo=="장식장"){
                return axios.get(ITEM_API_BASE_URL + "/list/livingroom?subcateNo=장식장", { headers: authHeader() });               
            }
            else { // 테이블
                return axios.get(ITEM_API_BASE_URL + "/list/livingroom?subcateNo=테이블", { headers: authHeader() });
            }
        }
        else if(cateNo=="침실가구"){
            if(subcateNo=="거울"){
                return axios.get(ITEM_API_BASE_URL + "/list/bedroom?subcateNo=거울", { headers: authHeader() });
            }
            else if(subcateNo=="매트리스"){
                return axios.get(ITEM_API_BASE_URL + "/list/bedroom?subcateNo=매트리스", { headers: authHeader() });
            }
            else if(subcateNo=="부부테이블"){
                return axios.get(ITEM_API_BASE_URL + "/list/bedroom?subcateNo=부부테이블", { headers: authHeader() });               
            }
            else if(subcateNo=="서랍장"){
                return axios.get(ITEM_API_BASE_URL + "/list/bedroom?subcateNo=서랍장", { headers: authHeader() });
            }
            else if(subcateNo=="장롱/붙박이장"){
                return axios.get(ITEM_API_BASE_URL + "/list/bedroom?subcateNo=장롱/붙박이장", { headers: authHeader() });
            }
            else if(subcateNo=="침대"){
                return axios.get(ITEM_API_BASE_URL + "/list/bedroom?subcateNo=침대", { headers: authHeader() });
            }
            else if(subcateNo=="침실세트"){
                return axios.get(ITEM_API_BASE_URL + "/list/bedroom?subcateNo=침실세트", { headers: authHeader() });
            }
            else if(subcateNo=="협탁"){
                return axios.get(ITEM_API_BASE_URL + "/list/bedroom?subcateNo=협탁", { headers: authHeader() });
            }
            else { // 화장대
                return axios.get(ITEM_API_BASE_URL + "/list/bedroom?subcateNo=화장대", { headers: authHeader() });
            }
           
        }
        else if(cateNo=="서재/사무용가구"){
            if(subcateNo=="사무/교구용가구"){
                return axios.get(ITEM_API_BASE_URL + "/list/library?subcateNo=사무/교구용가구", { headers: authHeader() });
            }
            else if(subcateNo=="의자"){
                return axios.get(ITEM_API_BASE_URL + "/list/library?subcateNo=의자", { headers: authHeader() });
            }
            else if(subcateNo=="책꽂이"){
                return axios.get(ITEM_API_BASE_URL + "/list/library?subcateNo=책꽂이", { headers: authHeader() });              
            }
            else if(subcateNo=="책상"){
                return axios.get(ITEM_API_BASE_URL + "/list/library?subcateNo=책상", { headers: authHeader() });                
            }
            else { // 책장
                return axios.get(ITEM_API_BASE_URL + "/list/library?subcateNo=책장", { headers: authHeader() });                
            }

            
        }
        else if(cateNo=="수납가구"){
            if(subcateNo=="CD/DVD장"){
                return axios.get(ITEM_API_BASE_URL + "/list/storage?subcateNo=CD/DVD장", { headers: authHeader() });              
            }
            else if(subcateNo=="고가구"){
                return axios.get(ITEM_API_BASE_URL + "/list/storage?subcateNo=고가구", { headers: authHeader() });
            }
            else if(subcateNo=="공간박스"){
                return axios.get(ITEM_API_BASE_URL + "/list/storage?subcateNo=공간박스", { headers: authHeader() });               
            }
            else if(subcateNo=="나비장"){
                return axios.get(ITEM_API_BASE_URL + "/list/storage?subcateNo=나비장", { headers: authHeader() });
            }
            else if(subcateNo=="선반"){
                return axios.get(ITEM_API_BASE_URL + "/list/storage?subcateNo=선반", { headers: authHeader() }); 
            }
            else if(subcateNo=="소품수납함"){
                return axios.get(ITEM_API_BASE_URL + "/list/storage?subcateNo=소품수납함", { headers: authHeader() });
            }
            else if(subcateNo=="수납장"){
                return axios.get(ITEM_API_BASE_URL + "/list/storage?subcateNo=수납장", { headers: authHeader() });
            }
            else if(subcateNo=="신발장"){
                return axios.get(ITEM_API_BASE_URL + "/list/storage?subcateNo=신발장", { headers: authHeader() });
            }
            else if(subcateNo=="우산꽂이"){
                return axios.get(ITEM_API_BASE_URL + "/list/storage?subcateNo=우산꽂이", { headers: authHeader() });
            }
            else if(subcateNo=="잡지꽂이"){
                return axios.get(ITEM_API_BASE_URL + "/list/storage?subcateNo=잡지꽂이", { headers: authHeader() });
            }
            else if(subcateNo=="코너장"){
                return axios.get(ITEM_API_BASE_URL + "/list/storage?subcateNo=코너장", { headers: authHeader() });
            }
            else { // 행거
                return axios.get(ITEM_API_BASE_URL + "/list/storage?subcateNo=행거", { headers: authHeader() });
            }

            
        }
        else { // 주방가구
            if(subcateNo=="그릇장/컵보드"){
                return axios.get(ITEM_API_BASE_URL + "/list/kitchen?subcateNo=그릇장/컵보드", { headers: authHeader() });
            }
            else if(subcateNo=="기타주방가구"){
                return axios.get(ITEM_API_BASE_URL + "/list/kitchen?subcateNo=기타주방가구", { headers: authHeader() });
            }
            else if(subcateNo=="레인지대"){
                return axios.get(ITEM_API_BASE_URL + "/list/kitchen?subcateNo=레인지대", { headers: authHeader() });               
            }
            else if(subcateNo=="식탁/의자"){
                return axios.get(ITEM_API_BASE_URL + "/list/kitchen?subcateNo=식탁/의자", { headers: authHeader() });                
            }
            else if(subcateNo=="와인용품"){
                return axios.get(ITEM_API_BASE_URL + "/list/kitchen?subcateNo=와인용품", { headers: authHeader() });                
            }
            else if(subcateNo=="왜건/카트"){
                return axios.get(ITEM_API_BASE_URL + "/list/kitchen?subcateNo=왜건/카트", { headers: authHeader() });                
            }
            else { // 주방수납장
                return axios.get(ITEM_API_BASE_URL + "/list/kitchen?subcateNo=주방수납장", { headers: authHeader() });                
            }
            
        }

    }

    getCertainItem(pdNo, cateNo, subcateNo){
        return axios.get(ITEM_API_BASE_URL + "/getItem?pdNo="+pdNo+"&cateNo="+cateNo+"&subcateNo="+subcateNo, { headers: authHeader() });
        
    }
    searchAllItems(searchKeyword){
        return axios.get(ITEM_API_BASE_URL + "/searchAll?keyword=" + searchKeyword, { headers: authHeader() });
    }
    searchCateItems(searchKeyword, cateNo, subcateNo){
        return axios.get(ITEM_API_BASE_URL + "/search?keyword="+searchKeyword+"&category="+cateNo+"&subcateNo="+subcateNo, { headers: authHeader() });
    }
    
}

>>>>>>> 8c4fad14df0e9bbeb576640f19a25503ec180052
export default new ItemService();