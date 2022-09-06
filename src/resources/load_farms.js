import axios from "axios";

export default {
    get(farm_id) {
        return axios.get(`/api/farms/${farm_id}`)
    }
}