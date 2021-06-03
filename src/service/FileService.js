import axios from 'axios'; 
import authHeader from './auth-header';

const File_API_BASE_URL = "/api/file"; 

class FileService {

    uploadFile(formData, config) {
        return axios.post(File_API_BASE_URL, formData, config,  { headers: authHeader() });
    }

    getOneFile(qboardNo) {
        return axios.get(File_API_BASE_URL + "/" + qboardNo, { responseType: 'arraybuffer' }, { headers: authHeader() });
    }

    getOneFilePhoto(pboardNo) {
        return axios.get(File_API_BASE_URL + "/photo/" + pboardNo, { responseType: 'arraybuffer' }, { headers: authHeader() });
    }
    
}

export default new FileService();