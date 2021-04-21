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

    getCertainItems(cateNo, thisCateNo){
        if(cateNo=="거실가구"){
            if(thisCateNo=="TV거실장"){
                return axios.get(ITEM_API_BASE_URL + "/list/livingroom?thisCateNo=TV거실장", { headers: authHeader() });               
            }
            else if(thisCateNo=="소파"){
                return axios.get(ITEM_API_BASE_URL + "/list/livingroom?thisCateNo=소파", { headers: authHeader() });
            }
            else if(thisCateNo=="장식장"){
                return axios.get(ITEM_API_BASE_URL + "/list/livingroom?thisCateNo=장식장", { headers: authHeader() });               
            }
            else { // 테이블
                return axios.get(ITEM_API_BASE_URL + "/list/livingroom?thisCateNo=테이블", { headers: authHeader() });
            }
        }
        else if(cateNo=="침실가구"){
            if(thisCateNo=="거울"){
                return axios.get(ITEM_API_BASE_URL + "/list/bedroom?thisCateNo=거울", { headers: authHeader() });
            }
            else if(thisCateNo=="매트리스"){
                return axios.get(ITEM_API_BASE_URL + "/list/bedroom?thisCateNo=매트리스", { headers: authHeader() });
            }
            else if(thisCateNo=="부부테이블"){
                return axios.get(ITEM_API_BASE_URL + "/list/bedroom?thisCateNo=부부테이블", { headers: authHeader() });               
            }
            else if(thisCateNo=="서랍장"){
                return axios.get(ITEM_API_BASE_URL + "/list/bedroom?thisCateNo=서랍장", { headers: authHeader() });
            }
            else if(thisCateNo=="장롱/붙박이장"){
                return axios.get(ITEM_API_BASE_URL + "/list/bedroom?thisCateNo=장롱/붙박이장", { headers: authHeader() });
            }
            else if(thisCateNo=="침대"){
                return axios.get(ITEM_API_BASE_URL + "/list/bedroom?thisCateNo=침대", { headers: authHeader() });
            }
            else if(thisCateNo=="침실세트"){
                return axios.get(ITEM_API_BASE_URL + "/list/bedroom?thisCateNo=침실세트", { headers: authHeader() });
            }
            else if(thisCateNo=="협탁"){
                return axios.get(ITEM_API_BASE_URL + "/list/bedroom?thisCateNo=협탁", { headers: authHeader() });
            }
            else { // 화장대
                return axios.get(ITEM_API_BASE_URL + "/list/bedroom?thisCateNo=화장대", { headers: authHeader() });
            }
           
        }
        else if(cateNo=="서재/사무용가구"){
            if(thisCateNo=="사무/교구용가구"){
                return axios.get(ITEM_API_BASE_URL + "/list/library?thisCateNo=사무/교구용가구", { headers: authHeader() });
            }
            else if(thisCateNo=="의자"){
                return axios.get(ITEM_API_BASE_URL + "/list/library?thisCateNo=의자", { headers: authHeader() });
            }
            else if(thisCateNo=="책꽂이"){
                return axios.get(ITEM_API_BASE_URL + "/list/library?thisCateNo=책꽂이", { headers: authHeader() });              
            }
            else if(thisCateNo=="책상"){
                return axios.get(ITEM_API_BASE_URL + "/list/library?thisCateNo=책상", { headers: authHeader() });                
            }
            else { // 책장
                return axios.get(ITEM_API_BASE_URL + "/list/library?thisCateNo=책장", { headers: authHeader() });                
            }

            
        }
        else if(cateNo=="수납가구"){
            if(thisCateNo=="CD/DVD장"){
                return axios.get(ITEM_API_BASE_URL + "/list/storage?thisCateNo=CD/DVD장", { headers: authHeader() });              
            }
            else if(thisCateNo=="고가구"){
                return axios.get(ITEM_API_BASE_URL + "/list/storage?thisCateNo=고가구", { headers: authHeader() });
            }
            else if(thisCateNo=="공간박스"){
                return axios.get(ITEM_API_BASE_URL + "/list/storage?thisCateNo=공간박스", { headers: authHeader() });               
            }
            else if(thisCateNo=="나비장"){
                return axios.get(ITEM_API_BASE_URL + "/list/storage?thisCateNo=나비장", { headers: authHeader() });
            }
            else if(thisCateNo=="선반"){
                return axios.get(ITEM_API_BASE_URL + "/list/storage?thisCateNo=선반", { headers: authHeader() }); 
            }
            else if(thisCateNo=="소품수납함"){
                return axios.get(ITEM_API_BASE_URL + "/list/storage?thisCateNo=소품수납함", { headers: authHeader() });
            }
            else if(thisCateNo=="수납장"){
                return axios.get(ITEM_API_BASE_URL + "/list/storage?thisCateNo=수납장", { headers: authHeader() });
            }
            else if(thisCateNo=="신발장"){
                return axios.get(ITEM_API_BASE_URL + "/list/storage?thisCateNo=신발장", { headers: authHeader() });
            }
            else if(thisCateNo=="우산꽂이"){
                return axios.get(ITEM_API_BASE_URL + "/list/storage?thisCateNo=우산꽂이", { headers: authHeader() });
            }
            else if(thisCateNo=="잡지꽂이"){
                return axios.get(ITEM_API_BASE_URL + "/list/storage?thisCateNo=잡지꽂이", { headers: authHeader() });
            }
            else if(thisCateNo=="코너장"){
                return axios.get(ITEM_API_BASE_URL + "/list/storage?thisCateNo=코너장", { headers: authHeader() });
            }
            else { // 행거
                return axios.get(ITEM_API_BASE_URL + "/list/storage?thisCateNo=행거", { headers: authHeader() });
            }

            
        }
        else { // 주방가구
            if(thisCateNo=="그릇장/컵보드"){
                return axios.get(ITEM_API_BASE_URL + "/list/kitchen?thisCateNo=그릇장/컵보드", { headers: authHeader() });
            }
            else if(thisCateNo=="기타주방가구"){
                return axios.get(ITEM_API_BASE_URL + "/list/kitchen?thisCateNo=기타주방가구", { headers: authHeader() });
            }
            else if(thisCateNo=="레인지대"){
                return axios.get(ITEM_API_BASE_URL + "/list/kitchen?thisCateNo=레인지대", { headers: authHeader() });               
            }
            else if(thisCateNo=="식탁/의자"){
                return axios.get(ITEM_API_BASE_URL + "/list/kitchen?thisCateNo=식탁/의자", { headers: authHeader() });                
            }
            else if(thisCateNo=="와인용품"){
                return axios.get(ITEM_API_BASE_URL + "/list/kitchen?thisCateNo=와인용품", { headers: authHeader() });                
            }
            else if(thisCateNo=="왜건/카트"){
                return axios.get(ITEM_API_BASE_URL + "/list/kitchen?thisCateNo=왜건/카트", { headers: authHeader() });                
            }
            else { // 주방수납장
                return axios.get(ITEM_API_BASE_URL + "/list/kitchen?thisCateNo=주방수납장", { headers: authHeader() });                
            }
            
        }

    }
    
}

export default new ItemService();