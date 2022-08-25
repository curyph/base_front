import axios from "axios";

export default {
    get() {
        return axios.get('/api/home')
    },
    post(file) {
        return axios.post('/api/save-farm', file, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
    }
    
}