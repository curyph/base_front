import axios from "axios";

export default {
    get() {
        return axios.get('/api/home')
    },
    post(data, state, city) {
        return axios.post(`/api/save-farm?state_id=${state}&city_id=${city}`, data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
    }
    
}