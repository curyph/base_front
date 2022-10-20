import axios from "axios";

export default {
    get(state_id, city_id) {
        return axios.get(`/api/farms/states/${state_id}/cities/${city_id}`)
    }
}