import axios from 'axios'; 


const File_API_BASE_URL = "http://localhost:8080/api/file"; 

class FileService {

    uploadFile(formData, config) {
        return axios.post(File_API_BASE_URL, formData, config);
    }

    
}

export default new FileService();