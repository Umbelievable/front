import axios from 'axios'; 
import authHeader from './auth-header';

const HASHTAG_API_BASE_URL = "http://localhost:8080/api/hashtag"; 

class HashtagService{
    getNounlistByProduct(pdNo,subcateNo,cateNo){
        return axios.get(HASHTAG_API_BASE_URL+"/noun?pdNo="+pdNo+"&subcateNo="+subcateNo+"&cateNo="+cateNo, { headers:authHeader() } );
    }
    getAdjlistByProduct(pdNo,subcateNo,cateNo){
        return axios.get(HASHTAG_API_BASE_URL+"/adj?pdNo="+pdNo+"&subcateNo="+subcateNo+"&cateNo="+cateNo, { headers:authHeader() } );
    }
    //명사는 10개정도로 수정예정
    getNounTop5(pdNo,subcateNo,cateNo){
        return axios.get(HASHTAG_API_BASE_URL+"/topNoun?pdNo="+pdNo+"&subcateNo="+subcateNo+"&cateNo="+cateNo, { headers:authHeader() } );
    }
    getAdjTop5(pdNo,subcateNo,cateNo){
        return axios.get(HASHTAG_API_BASE_URL+"/topAdj?pdNo="+pdNo+"&subcateNo="+subcateNo+"&cateNo="+cateNo, { headers:authHeader() } );
    }
    //해시태그로 상품찾기
    getProductByNoun(tag){
        return axios.get(HASHTAG_API_BASE_URL+"/nounP?tag="+tag, { headers:authHeader() } );
    }
    getProductByAdj(tag){
        return axios.get(HASHTAG_API_BASE_URL+"/adjP?tag="+tag, { headers:authHeader() } );
    }
}

export default new HashtagService();