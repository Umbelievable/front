import axios from 'axios'; 
import authHeader from './auth-header';


const ITEM_API_BASE_URL = "/api/items"; 

class ItemService {
    getAllItems(cateNo){
        if(cateNo=="거실가구"){
            document.body.style.height = "66260px";
            return axios.get(ITEM_API_BASE_URL + "/list/allLivingroom", { headers: authHeader() });
        }
        else if(cateNo=="침실가구"){
            document.body.style.height = "122660px";
            return axios.get(ITEM_API_BASE_URL + "/list/allBedroom", { headers: authHeader() });
        }
        else if(cateNo=="서재/사무용가구"){
            document.body.style.height = "77960px";
            return axios.get(ITEM_API_BASE_URL + "/list/allLibrary", { headers: authHeader() });
        }
        else if(cateNo=="수납가구"){
            document.body.style.height = "62100px";
            return axios.get(ITEM_API_BASE_URL + "/list/allStorage", { headers: authHeader() });
        }
        else { // 주방가구
            document.body.style.height = "84640px";
            return axios.get(ITEM_API_BASE_URL + "/list/allKitchen", { headers: authHeader() });
        }
    }

    getCertainItems(cateNo, subcateNo){
        if(cateNo=="거실가구"){
            document.body.style.height = "16940px";
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
            document.body.style.height = "16940px";
            if(subcateNo=="거울"){
                return axios.get(ITEM_API_BASE_URL + "/list/bedroom?subcateNo=거울", { headers: authHeader() });
            }
            else if(subcateNo=="매트리스"){
                return axios.get(ITEM_API_BASE_URL + "/list/bedroom?subcateNo=매트리스", { headers: authHeader() });
            }
            else if(subcateNo=="부부테이블"){
                document.body.style.height = "3570px";
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
                document.body.style.height = "3160px";
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
            document.body.style.height = "16940px";
            if(subcateNo=="사무/교구용가구"){
                document.body.style.height = "16521px";
                return axios.get(ITEM_API_BASE_URL + "/list/library?subcateNo=사무/교구용가구", { headers: authHeader() });
            }
            else if(subcateNo=="의자"){
                return axios.get(ITEM_API_BASE_URL + "/list/library?subcateNo=의자", { headers: authHeader() });
            }
            else if(subcateNo=="책꽂이"){
                document.body.style.height = "12350px";
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
            document.body.style.height = "4410px";
            if(subcateNo=="CD/DVD장"){
                document.body.style.height = "1062px";
                return axios.get(ITEM_API_BASE_URL + "/list/storage?subcateNo=CD/DVD장", { headers: authHeader() });              
            }
            else if(subcateNo=="고가구"){
                document.body.style.height = "1062px";
                return axios.get(ITEM_API_BASE_URL + "/list/storage?subcateNo=고가구", { headers: authHeader() });
            }
            else if(subcateNo=="공간박스"){
                return axios.get(ITEM_API_BASE_URL + "/list/storage?subcateNo=공간박스", { headers: authHeader() });               
            }
            else if(subcateNo=="나비장"){
                document.body.style.height = "644px";
                return axios.get(ITEM_API_BASE_URL + "/list/storage?subcateNo=나비장", { headers: authHeader() });
            }
            else if(subcateNo=="선반"){
                return axios.get(ITEM_API_BASE_URL + "/list/storage?subcateNo=선반", { headers: authHeader() }); 
            }
            else if(subcateNo=="소품수납함"){
                document.body.style.height = "16521px";
                return axios.get(ITEM_API_BASE_URL + "/list/storage?subcateNo=소품수납함", { headers: authHeader() });
            }
            else if(subcateNo=="수납장"){
                return axios.get(ITEM_API_BASE_URL + "/list/storage?subcateNo=수납장", { headers: authHeader() });
            }
            else if(subcateNo=="신발장"){
                document.body.style.height = "3569px";
                return axios.get(ITEM_API_BASE_URL + "/list/storage?subcateNo=신발장", { headers: authHeader() });
            }
            else if(subcateNo=="우산꽂이"){
                document.body.style.height = "7750px";
                return axios.get(ITEM_API_BASE_URL + "/list/storage?subcateNo=우산꽂이", { headers: authHeader() });
            }
            else if(subcateNo=="잡지꽂이"){
                document.body.style.height = "15690px";
                return axios.get(ITEM_API_BASE_URL + "/list/storage?subcateNo=잡지꽂이", { headers: authHeader() });
            }
            else if(subcateNo=="코너장"){
                document.body.style.height = "2320px";
                return axios.get(ITEM_API_BASE_URL + "/list/storage?subcateNo=코너장", { headers: authHeader() });
            }
            else { // 행거
                return axios.get(ITEM_API_BASE_URL + "/list/storage?subcateNo=행거", { headers: authHeader() });
            } 
        }
        else { // 주방가구
            document.body.style.height = "16940px";
            if(subcateNo=="그릇장/컵보드"){
                return axios.get(ITEM_API_BASE_URL + "/list/kitchen?subcateNo=그릇장/컵보드", { headers: authHeader() });
            }
            else if(subcateNo=="기타주방가구"){
                document.body.style.height = "6495px";
                return axios.get(ITEM_API_BASE_URL + "/list/kitchen?subcateNo=기타주방가구", { headers: authHeader() });
            }
            else if(subcateNo=="레인지대"){
                document.body.style.height = "12350px";
                return axios.get(ITEM_API_BASE_URL + "/list/kitchen?subcateNo=레인지대", { headers: authHeader() });               
            }
            else if(subcateNo=="식탁/의자"){
                return axios.get(ITEM_API_BASE_URL + "/list/kitchen?subcateNo=식탁/의자", { headers: authHeader() });                
            }
            else if(subcateNo=="와인용품"){
                document.body.style.height = "11090px";
                return axios.get(ITEM_API_BASE_URL + "/list/kitchen?subcateNo=와인용품", { headers: authHeader() });                
            }
            else if(subcateNo=="왜건/카트"){
                document.body.style.height = "6080px";
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

export default new ItemService();