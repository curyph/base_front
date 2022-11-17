import axios from "axios";

export default {
    get(state_id, city_id, pedologies) {
        return axios.get(`/api/farms/search?state_id=${state_id}&city_id=${city_id}&fpr_id=5&pedology=${pedologies}`)
    }
}